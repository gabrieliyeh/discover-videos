import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from '@/styles/login.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { magic} from '@/lib/magic-client'


const SingInPage = ()=> {
  const [email, setEmail]= useState('')
  const [userMsg, setUserMsg]= useState('')
  const [loading, setIsLoading]= useState(false)
  const router = useRouter()

  useEffect(()=> {
    const handleComplete = ()=> setIsLoading(false)

    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
    return ()=> {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])
  
  const handleLoginWithEmail = async(e)=> {
    e.preventDefault(); 
    setUserMsg('')
    const validRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(validRegex.test(email)){
      // log in a user by their email
      setIsLoading(true)
      try {
       const didToken = await magic.auth.loginWithMagicLink({email});
       if(didToken)  router.push('/')          
      } catch(error) {
        // Handle errors if required!
        setIsLoading(false)
        console.error('Something went wrong logging in', error);
      }
     
    }else{
      setUserMsg('Enter a valid email address')
    }
  }
  const handleOnChange = (e)=> {
    const email = e.target.value;
    setEmail(email)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix | Sign in</title>
      </Head>
      <header className={styles.header}> 
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href='/'  >
            <div className={styles.logoWrapper}>
            <Image src='/static/netflix.svg' alt='netflix logo' width={128} height={34} />
            </div>
          </Link>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
        <h1 className={styles.signInHeader}>Sign In</h1>
        <input 
        type="email" 
        id="email" 
        value={email}
        onChange={handleOnChange}
        placeholder="Email address" 
        className={styles.emailInput}
        />
        <p className={styles.userMsg}> {userMsg}</p>
        <button disabled={loading}  className={styles.loginBtn} onClick={handleLoginWithEmail}> {loading ? 'Loading...': 'Login'}</button>
        </div>
      </main>
    </div>
  )
}


export default  SingInPage