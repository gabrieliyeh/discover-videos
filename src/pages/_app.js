import Loading from '@/components/loading/Loading'
import { magic } from '@/lib/magic-client'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading]= useState(false)
  useEffect(()=> {
    const handleComplete = ()=> setIsLoading(false)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    // const checkUserStatus = async ()=> {
    //     const isLoggedIn = await magic.user.isLoggedIn()
    //     if(isLoggedIn){
    //       router.push('/')
    //     }else{
    //       router.push('/login')
    //     }
    // }
    // checkUserStatus()

    return ()=> {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
    
  }, [])
 
  return isLoading ? <Loading/> : <Component {...pageProps} />
}
