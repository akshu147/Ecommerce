'use client'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { setuserdata } from '../redux/userdataslice/userdataslice'
import { useDispatch } from 'react-redux'
import nookies from 'nookies'

const GoogleLoginButton = () => {
  const dispatch = useDispatch() // corrected
  const nav = useRouter()

  const handleCallbackResponse = async response => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/user/auth/google',
        { token: response.credential },
        { withCredentials: true }
      )

      dispatch(setuserdata(res.data.user)) // corrected
      console.log('Backend response:', res)
      if (res.status === 200) {
        nav.push('/pages/account')
      }
      if (res.status === 200 && res.data.accessToken) {
        nookies.set(null, 'accestoken', res.data.accessToken, {
          path: '/',
          maxAge: 7 * 24 * 60 * 60 // 7 days
        })
      }

      if (res.status === 200) {
        nav.push("/pages/account")
      }
    } catch (error) {
      console.error('Google login failed:', error)
      if (error.response) {
        console.error('Server error:', error.response.data)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id:
          '674308411765-vj989fsmncdbjfr75it5el6ctm8fkl4j.apps.googleusercontent.com',
        callback: handleCallbackResponse
      })

      window.google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'outline', size: 'large' }
      )
    }
  }, [])

  return <div id='google-btn' className='m-auto'></div>
}

export default GoogleLoginButton
