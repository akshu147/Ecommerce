const { connection } = require('../../config/db')
require('dotenv').config()
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { otpdata } = require('../otpstore/otp')
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
})
// JWT secrets should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'myrefreshsecret'

const sendotp = async (req, res) => {
  try {
    const { otp, password, email, name } = req.body
    const [existing] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already in use' })
    }
    const genotp = Math.floor(100000 + Math.random() * 900000)
    otpdata.set(email, genotp)
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${genotp}.`
    })
    setTimeout(() => {
      otpdata.delete(email)
    }, process.env.delete_time || 100000)

    res.status(200).json({ message: 'otp sent' })
    console.log('otpsent')
  } catch (err) {
    res.status(500).json({ message: 'server error' })
    console.log(err.message)
  }
}

const userragister = async (req, res) => {
  try {
    const { otp, password, email, name } = req.body

    // 1) Check OTP
    const preotp = otpdata.get(email)
    if (String(preotp) !== String(otp)) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    // remove OTP once used
    otpdata.delete(email)

    // 2) Check if email already exists
    const [existing] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    // 3) Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 4) Insert user
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    // 5) Create Access Token (short expiry)
    const accessToken = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET || 'mysecretkey',
      { expiresIn: '15m' } // short life
    )

    // 6) Create Refresh Token (long expiry)
    const refreshToken = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_REFRESH_SECRET || 'myrefreshsecret',
      { expiresIn: '7d' } // longer life
    )

    // 7) Optionally: Save refresh token in DB (or Redis)
    await connection.query('UPDATE users SET refresh_token = ? WHERE id = ?', [
      refreshToken,
      result.insertId
    ])

    // 8) Set cookies for frontend access
    // Access token cookie (short-lived, accessible by frontend)
    res.cookie('accestoken', accessToken, {
      httpOnly: false, // Allow frontend JavaScript to access
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax', // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days to match token expiry
    })

    // Refresh token cookie (long-lived, httpOnly for security)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false, // Prevent JavaScript access for security
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days to match token expiry
    })

    // 9) Send response
    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

const userlogin = async (req, res) => {
  try {
    console.log(req.headers, 'ilove you')
    console.log(req.cookies.sexy) // ✅ fixed

    const { email, password } = req.body

    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    const user = users[0]

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Create Access Token (short expiry)
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '15m' } // short life
    )

    // Create Refresh Token (long expiry)
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' } // longer life
    )

    // Update refresh token in DB
    await connection.query('UPDATE users SET refresh_token = ? WHERE id = ?', [
      refreshToken,
      user.id
    ])

    // Set cookies for frontend access
    // Access token cookie (short-lived, accessible by frontend)
    res.cookie('accessToken', accessToken, {
      httpOnly: false, // Allow frontend to access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 2 * 60 * 1000 // 2 minutes in milliseconds
    })
    // Refresh token cookie (long-lived, httpOnly for security)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Prevent JavaScript access for security
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, email: user.email },
      accessToken,
      refreshToken
    })
  } catch (error) {
    console.error('Login Error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const fetchtoken = (req, res) => {
  try {
    // Get token from header
    const token = req.headers.authorization.split(' ')
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    // Verify token
    const user = jwt.verify(token[1], process.env.JWT_SECRET)
    console.log('Decoded User:', user)
    res.status(200).json({ message: 'success', user })
  } catch (err) {
    console.error(err.message, 'data')
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}

const regerateaccestoken = (req, res) => {
  try {
    console.log('ilove yo madra chod')

    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token' })
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ message: 'Refresh token expired or invalid' })
      }

      const newAccessToken = generateAccessToken({
        id: user.id,
        email: user.email
      })

      return res.status(200).json({ accessToken: newAccessToken })
    })
  } catch (error) {
    console.error('Error in regenerateAccessToken:', error.message)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const signupwithgoogle = async (req, res) => {
  try {
    const { token } = req.body
    if (!token)
      return res.status(400).json({ message: 'Google token is required' })

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })

    const payload = ticket.getPayload()
    const { sub: google_id, email, name, picture } = payload

    // Check if user exists
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )
    let user

    if (rows.length === 0) {
      // Create user if not exists
      const [result] = await connection.query(
        'INSERT INTO users (google_id, email, name, avtar) VALUES (?, ?, ?, ?)',
        [google_id, email, name, picture]
      )

      user = {
        id: result.insertId,
        google_id,
        email,
        name,
        avatar: picture
      }
    } else {
      user = rows[0]

      // Update google_id if not set
      if (!user.google_id) {
        await connection.query('UPDATE users SET google_id = ? WHERE id = ?', [
          google_id,
          user.id
        ])
        user.google_id = google_id
      }
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    )

    // Set refresh token in cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.cookie('accestoken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({ accessToken, user })
  } catch (error) {
    console.error('Google login error:', error)
    res.status(500).json({ message: 'Authentication failed' })
  }
}

module.exports = {
  userlogin,
  userragister,
  sendotp,
  fetchtoken,
  regerateaccestoken,
  signupwithgoogle
}
