import React, { useEffect } from 'react'
import nookies from 'nookies'
import { useRouter } from 'next/navigation'

const Checkiflogin = () => {
    const nav = useRouter()
    useEffect(()=> {
        const cookies = nookies.get()
        console.log(cookies.accestoken , "asldfjlasdjflkasjfklsdjfklasjfklasjflkasdjfklsdj")
        if(!cookies.accestoken) {
            nav.push('/pages/login')
        }
    })
  return (
    <>
      
    </>
  )
}

export default Checkiflogin
