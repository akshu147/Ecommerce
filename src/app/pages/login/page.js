'use client'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

const AuthPage = () => {
  const [ifsignup, setIfSignup] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(null)
  const [isPasswordValid, setIsPasswordValid] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const nav = useRouter()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validateEmail = e => {
    setEmail(e.target.value)
    setIsEmailValid(emailRegex.test(e.target.value))
  }

  const validatePassword = e => {
    setPassword(e.target.value)
    setIsPasswordValid(passwordRegex.test(e.target.value))
  }

  const userRegister = async e => {
    e.preventDefault()

    const { email, name, password } = e.target

    const data = {
      name: name.value,
      email: email.value,
      password: password.value
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/user/sign-up',
        data
      )
      console.log('Signup successful:', response.data.token)
      alert('Signup successful')
      // Reset form or redirect user after success
      e.target.reset()
      // nav.push("/")/
      Cookies.set('_token', response.data.token, {
        expires: 7, // 7 din baad expire
        secure: true, // https pe hi chalega
        sameSite: 'strict'
      })
      setIfSignup(true)
    } catch (err) {
      if (err.response) {
        console.log('Error:', err.response.data.message)
        alert(err.response.data.message)
      } else {
        console.log('Something went wrong:', err.message)
        alert('Something went wrong. Try again!')
      }
    }
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const data = {
        email:e.target.email.value,
        password:e.target.password.value
      }
      const responce = await axios.post("http://localhost:4000/api/user/login", data)
      console.log(responce)
    }
    catch(err) {
      console.log(err.message)
       alert(err.response.data.message)
  
    }
    
    // console.log({ email, password })
  }

  const handleGoogleSignIn = () => {
    // Implement Google sign in
    console.log('Google Sign In clicked')
  }

  const handleAppleSignIn = () => {
    // Implement Apple sign in
    console.log('Apple Sign In clicked')
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-gradient-to-r bg-[#030712] p-4'>
      <div className='text-white shadow-[2px_3px_10px_white] sm:mx-[50px] md:mx-[100px] lg:mx-[200px] rounded-2xl w-full grid md:grid-cols-2 overflow-hidden'>
        {/* Left side form */}
        <div className='p-8 flex flex-col gap-4'>
          <h2 className='text-2xl font-bold text-center mb-4'>
            {ifsignup ? 'Login' : 'Sign Up'}
          </h2>

          {/* Social Login */}
          <div className='flex gap-4 justify-center mb-4'>
            <button
              onClick={handleGoogleSignIn}
              className='flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100'
            >
              <FcGoogle />{' '}
              {ifsignup ? 'Sign Up with Google' : 'Login with Google'}
            </button>
            <button
              onClick={handleAppleSignIn}
              className='flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100'
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
                  value={email}
                  onChange={validateEmail}
                  placeholder='you@example.com'
                  name='email'
                  className='w-full outline-none px-2 py-1'
                  required
                />
              </fieldset>
              {isEmailValid === false && (
                <p className='text-red-500 text-sm'>Invalid email format</p>
              )}

              <fieldset className='border rounded-lg p-2 relative'>
                <legend className='px-1 text-sm'>Password</legend>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={validatePassword}
                  placeholder='********'
                  name='password'
                  className='w-full outline-none px-2 py-1'
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 top-3 cursor-pointer text-gray-500'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </fieldset>

              <button
                type='submit'
                className='mt-2 bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600'
              >
                Login
              </button>

              <p className='text-sm text-center'>
                New user?{' '}
                <span
                  className='text-blue-500 cursor-pointer underline'
                  onClick={() => setIfSignup(false)}
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
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='John Doe'
                  name='name'
                  className='w-full outline-none px-2 py-1'
                  required
                />
              </fieldset>

              <fieldset className='border rounded-lg p-2'>
                <legend className='px-1 text-sm'>Email</legend>
                <input
                  type='email'
                  value={email}
                  onChange={validateEmail}
                  placeholder='you@example.com'
                  name='email'
                  className='w-full outline-none px-2 py-1'
                  required
                />
              </fieldset>
              {isEmailValid === false && (
                <p className='text-red-500 text-sm'>Invalid email format</p>
              )}

              <fieldset className='border rounded-lg p-2 relative'>
                <legend className='px-1 text-sm'>Password</legend>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={validatePassword}
                  placeholder='********'
                  name='password'
                  className='w-full outline-none px-2 py-1'
                  required
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
                  Password must be 8+ chars with a number & special char
                </p>
              )}
              {isPasswordValid === true && (
                <p className='text-green-500 text-sm'>Password is strong</p>
              )}

              <button
                type='submit'
                className='mt-2 bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600'
              >
                Sign Up
              </button>

              <p className='text-sm text-center'>
                Already have an account?{' '}
                <span
                  className='text-blue-500 cursor-pointer underline'
                  onClick={() => setIfSignup(true)}
                >
                  Login
                </span>
              </p>
            </form>
          )}
        </div>

        {/* Right side illustration */}
        <div className='hidden md:flex justify-center items-center bg-purple-200'>
          <img
            src='/signup-illustration.png'
            alt='Illustration'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
    </div>
  )
}

export default AuthPage
