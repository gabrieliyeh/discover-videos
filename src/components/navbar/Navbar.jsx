import styles from './navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { magic } from '@/lib/magic-client'
const Navbar = () => {
  const router = useRouter()
  const [showDropDown,setShowDropDown]= useState(false)
  const [username,setUsername]= useState('')

  useEffect(()=> {
    (async()=> {
      try {
        const {email} = await magic.user.getMetadata()
        if(email){
          setUsername(email)
        }
       } catch (error) {
         console.error('Error retrieving email', error)
       }
    })()
    
  }, [])

  const handleOnClickHome = (e)=> {
    e.preventDefault();
    router.push('/')
  }
  const handleOnClickMyList = (e)=> {
    e.preventDefault();
    router.push('browse/my-list')
  }

  const handleDropDown = ()=> {
    setShowDropDown(!showDropDown)
  }

  const handleLogOut = async ()=> {
    try {
     await magic.user.logout()
     console.log(await magic.user.isLoggedIn());
     router.push('/login')
    } catch (error) {
      console.error('Error logging out', error);
      router.push('/login')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href='/'  >
          <div className={styles.logoWrapper}>
           <Image src='/static/netflix.svg' alt='netflix logo' width={128} height={34} />
          </div>
        </Link>
     
      <ul className={styles.navItems}>
        <li className={styles.navItem} onClick={handleOnClickHome}>
          Home
        </li>
        <li className={styles.navItem} onClick={handleOnClickMyList}>
          My List
        </li>
      </ul>
      <nav className={styles.navContainer}>
        <div>
          <button className={styles.usernameBtn} onClick={handleDropDown}>
           
            <p className={styles.username}>{ username &&  username}</p>
            <Image src='/static/expand_more.svg' width={24} height={24} alt='expand_more_icon' />
            {/* Expand more icons */}
          </button>
          {showDropDown && <div className={styles.navDropdown} >
            <div>
            <button onClick={handleLogOut} className={styles.linkName}> Sign out </button>
            <div className={styles.lineWrapper}></div>
            </div>
          </div>}
        </div>
      </nav>
      </div>
    </div>
  )
}

export default Navbar
