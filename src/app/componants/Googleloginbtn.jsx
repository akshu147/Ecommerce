'use client'
import { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { setuserdata } from '../redux/userdataslice/userdataslice'
import { useDispatch } from 'react-redux'

const GoogleLoginButton = () => {
  const dispatch = useDispatch() // corrected
  const nav = useRouter()

  const handleCallbackResponse = async response => {
    try {
      const res = await axios.post(
        'http://localhost:4000/api/user/auth/google',
        { token: response.credential },
        { withCredentials: true } // if your backend sets httpOnly cookies
      )

      if (res.status === 200) {
        // Redux me user store karna
        dispatch(setuserdata(res.data.user))

        // Cookie set karna
        if (res.data.accessToken) {
          localStorage.setItem('accessToken', res.data.accessToken)
        }

        // Redirect user
        nav.push('/pages/account')
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
