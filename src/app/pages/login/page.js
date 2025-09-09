'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const AuthPage = () => {
  const [ifsignup, setIfSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [ifsendotp, setIfSendOtp] = useState(false)
  const [otpvalue, setOtpValue] = useState('Send OTP')
  const [mounted, setMounted] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [otpMessage, setOtpMessage] = useState('')
  const timerRef = useRef(null) // holds the interval id
  const messageTimeoutRef = useRef(null) // holds the toast timeout id
  const [isSending, setIsSending] = useState(false)
  const nav = useRouter()

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const emailRegex =
    /^(?=.{1,254}$)(?=.{1,64}@)(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
  const isEmailValid = formdata.email ? emailRegex.test(formdata.email) : null
  const isPasswordValid = formdata.password
    ? passwordRegex.test(formdata.password)
    : null

  const userRegister = async e => {
    e.preventDefault()
    if (!isEmailValid) return alert('Invalid email format')
    if (!isPasswordValid)
      return alert(
        'Password must be 8+ chars, include uppercase, lowercase, number & special char'
      )

    try {
      const response = await axios.post(
        'http://localhost:4000/api/user/sign-up',
        formdata
      )
      console.log(response)

      if(response.status == 201) return nav.push("/")
      alert('Signup successful')
      Cookies.set('_token', response.data.token, { expires: 7 })
      setIfSignup(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong!')
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:4000/api/user/login',
        {
          email: formdata.email,
          password: formdata.password
        }
      )
      alert('Login successful')
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong!')
    }
  }

  const sendOtp = async () => {
    if (!formdata.email || !emailRegex.test(formdata.email)) {
      setOtpMessage('Please enter a valid email')
      if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current)
      messageTimeoutRef.current = setTimeout(() => setOtpMessage(''), 3000)
      return
    }

    if (isSending || otpTimer > 0) return
    setIsSending(true)

    // 👉 1) Show immediate "Sending..." feedback
    setOtpMessage('Sending OTP...')
    if (messageTimeoutRef.current) clearTimeout(messageTimeoutRef.current)

    try {
      // 👉 2) Optimistically play sound right away
      try {
        const audio = new Audio('/sounds/best-notification-1-286672.mp3')
        audio.play().catch(() => {})
      } catch (e) {}

      // 👉 3) Call backend
      const response = await axios.post(
        'http://localhost:4000/api/user/get-otp',
        { email: formdata.email }
      )

      // 👉 4) Update to success message
      setOtpMessage('OTP has been sent successfully ✅ valid for 100 second')
      messageTimeoutRef.current = setTimeout(() => setOtpMessage(''), 4000)

      // 👉 5) Start timer
      setIfSendOtp(true)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }

      let remaining = 100
      setOtpTimer(remaining)
      setOtpValue(`Regenerate OTP in ${remaining}s`)

      timerRef.current = setInterval(() => {
        remaining -= 1
        setOtpTimer(remaining)

        if (remaining > 0) {
          setOtpValue(`Regenerate OTP in ${remaining}s`)
        } else {
          clearInterval(timerRef.current)
          timerRef.current = null
          setOtpValue('Send OTP Again')
          setIfSendOtp(false)
          setFormdata(prev => ({ ...prev, otp: '' }))
        }
      }, 1000)
    } catch (err) {
      if (err.response?.status === 409) {
        setOtpMessage('Email is already in use')
      } else {
        const msg =
          err.response?.data?.message || err.message || 'Failed to send OTP'
        setOtpMessage(msg)
      }
      messageTimeoutRef.current = setTimeout(() => setOtpMessage(''), 4000)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
        setOtpValue('Send OTP')
        setOtpTimer(0)
        setIfSendOtp(false)
      }
    } finally {
      setIsSending(false)
    }
  }

  const handleGoogleSignIn = () => console.log('Google Sign In clicked')
  const handleAppleSignIn = () => console.log('Apple Sign In clicked')

  if (!mounted) return null

  return (
    <div className='min-h-screen flex justify-center items-center bg-[#030712] p-4'>
      <div className='text-white shadow-[2px_3px_10px_white] sm:mx-[50px] md:mx-[100px] lg:mx-[200px] rounded-2xl w-full grid md:grid-cols-2 overflow-hidden'>
        <div className='p-8 flex flex-col gap-4'>
          {otpMessage && (
            <div className='bg-green-100 text-green-800 text-sm px-4 py-2 rounded-lg mb-2 text-center'>
              {otpMessage}
            </div>
          )}

          <h2 className='text-2xl font-bold text-center mb-4'>
            {ifsignup ? 'Login' : 'Sign Up'}
          </h2>

          {/* Social login buttons */}
          <div className='flex gap-4 justify-center mb-4'>
            <button
              onClick={handleGoogleSignIn}
              className='flex text-[12px] items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100'
            >
              <FcGoogle />{' '}
              {ifsignup ? 'Sign Up with Google' : 'Login with Google'}
            </button>
            <button
              onClick={handleAppleSignIn}
              className='flex text-[15px] items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100'
            >
              <FaApple /> {ifsignup ? 'Sign Up with Apple' : 'Login with Apple'}
            </button>
          </div>

          {/* Form */}
          {ifsignup ? (
            <form onSubmit={handleLogin} className='flex flex-col gap-3'>
              <fieldset className='border rounded-lg p-2'>
                <legend className='px-1 text-sm'>Email</legend>
                <input
                  type='email'
                  value={formdata.email}
                  onChange={e =>
                    setFormdata({ ...formdata, email: e.target.value })
                  }
                  placeholder='you@example.com'
                  required
                  className='w-full outline-none px-2 py-1'
                />
              </fieldset>
              {isEmailValid === false && (
                <p className='text-red-500 text-sm'>Invalid email format</p>
              )}

              <fieldset className='border rounded-lg p-2 relative'>
                <legend className='px-1 text-sm'>Password</legend>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formdata.password}
                  onChange={e =>
                    setFormdata({ ...formdata, password: e.target.value })
                  }
                  placeholder='********'
                  required
                  className='w-full outline-none px-2 py-1'
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 top-3 cursor-pointer text-gray-500'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </fieldset>

              {isPasswordValid === false && (
                <p className='text-red-500 text-sm'>
                  Password must be 8+ chars, include uppercase, lowercase,
                  number & special char
                </p>
              )}

              <button
                type='submit'
                className='mt-2 bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600'
              >
                Login
              </button>

              <p className='text-sm text-center'>
                New user?{' '}
                <span
                  onClick={() => setIfSignup(false)}
                  className='text-blue-500 cursor-pointer underline'
                >
                  Sign Up
                </span>
              </p>
            </form>
          ) : (
            <form onSubmit={userRegister} className='flex flex-col gap-3'>
              <fieldset className='border rounded-lg p-2'>
                <legend className='px-1 text-sm'>Name</legend>
                <input
                  type='text'
                  value={formdata.name}
                  onChange={e =>
                    setFormdata({ ...formdata, name: e.target.value })
                  }
                  placeholder='John Doe'
                  required
                  className='w-full outline-none px-2'
                />
              </fieldset>

              <fieldset className='border rounded-lg p-2'>
                <legend className='px-1 text-sm'>Email</legend>
                <input
                  type='email'
                  value={formdata.email}
                  onChange={e =>
                    setFormdata({ ...formdata, email: e.target.value })
                  }
                  placeholder='you@example.com'
                  required
                  className='w-full outline-none px-2'
                />
              </fieldset>
              {isEmailValid === false && (
                <p className='text-red-500 text-sm'>Invalid email format</p>
              )}

              <fieldset className='border rounded-lg p-2 relative'>
                <legend className='px-1 text-sm'>Password</legend>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formdata.password}
                  onChange={e =>
                    setFormdata({ ...formdata, password: e.target.value })
                  }
                  placeholder='********'
                  required
                  className='w-full outline-none px-2 py-1'
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 top-3 cursor-pointer text-gray-500'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </fieldset>
              {isPasswordValid === false && (
                <p className='text-red-500 text-sm'>
                  Password must be 8+ chars, include uppercase, lowercase,
                  number & special char
                </p>
              )}

              {mounted && ifsendotp && (
                <fieldset className='border-[1px] border-green-400 rounded-lg px-2'>
                  <legend className='px-1 text-sm'>OTP</legend>
                  <input
                    type='text'
                    placeholder='Enter OTP to next'
                    maxLength={6}
                    required
                    value={formdata.otp}
                    onChange={e =>
                      setFormdata({ ...formdata, otp: e.target.value })
                    }
                    className='outline-none px-2 py-1 rounded'
                  />
                </fieldset>
              )}

              {mounted &&
                (formdata.otp.length >= 6 ? (
                  <button
                    type='submit'
                    className='mt-2 w-full text-center bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600'
                  >
                    Sign in
                  </button>
                ) : (
                  <button
                    type='button'
                    onClick={sendOtp}
                    disabled={otpTimer > 0 || isSending}
                    className='mt-2 w-full text-center bg-purple-500 text-white rounded-lg py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isSending ? 'Sending...' : otpvalue}
                  </button>
                ))}

              <p className='text-sm text-center'>
                Already have an account?{' '}
                <span
                  onClick={() => setIfSignup(true)}
                  className='text-blue-500 cursor-pointer underline'
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </div>

        <div className='hidden md:flex justify-center items-center bg-purple-200'>
          <Image
            src='/signup-illustration.png'
            alt='Illustration'
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
