"use client"
import { useEffect } from "react"
import axios from "axios"

const GoogleLoginButton = () => {
  // Callback jab Google JWT bhejta hai
  const handleCallbackResponse = async (response) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/auth/google",
        { token: response.credential },
        { withCredentials: true } // cookies allow karega
      )

      console.log("Backend response:", res)
    } catch (error) {
      console.error("Google login failed:", error)
      if (error.response) {
        console.error("Server error:", error.response.data)
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "674308411765-vj989fsmncdbjfr75it5el6ctm8fkl4j.apps.googleusercontent.com", // <== apna actual client_id
        callback: handleCallbackResponse,
      })

      window.google.accounts.id.renderButton(
        document.getElementById("google-btn"),
        { theme: "outline", size: "large" }
      )
    }
  }, [])

  return <div id="google-btn" className="m-auto border bg-red-400 rounded-[10px] p-3"></div>
}

export default GoogleLoginButton
