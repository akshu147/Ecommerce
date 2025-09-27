'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CheckIfLogin = () => {
  const nav = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    console.log(token, "access token from localStorage")

    if (!token) {
      nav.push('/pages/login')
    }
  }, [])

  return null
}

export default CheckIfLogin
