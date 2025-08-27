'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LogoutPage = () => {
  const router = useRouter()

  useEffect(() => {
    // Simulate logout process
    const logout = async () => {
      // Clear any user data from localStorage
      localStorage.removeItem('userToken')
      localStorage.removeItem('userData')
      
      // Wait a moment for the user to see the message
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirect to home page
      router.push('/')
    }

    logout()
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Logging out...</h1>
        <p className="text-gray-600">You are being signed out of your account.</p>
      </div>
    </div>
  )
}

export default LogoutPage
