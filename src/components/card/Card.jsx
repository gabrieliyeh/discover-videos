import styles from './card.module.css'
import Image from 'next/image'
import cls from 'classnames'
import { useState } from 'react'
import { motion } from 'framer-motion'

const Card = ({imgUrl,size= 'medium', id}) => {
  const [imgSrc,setImgSrc]= useState(imgUrl)
  const classMap = {
    'large': styles.lgItem,
    'medium': styles.mdItem,
    'small': styles.smItem
  }

  const handleOnError = ()=> {
    console.log('handle error');
    setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80')
  }

  const scale = id === 0 ? {scaleY: 1.1} : {scale: 1.1}

  return (
    <div  className={styles.container}>
      <motion.div whileHover={scale} className={cls(styles.imgMotionWrapper,classMap[size])}>
      <Image src={imgSrc} alt='image' fill className={styles.cardImg} onError={handleOnError} />
      </motion.div>
    </div>
  )
}

export default Card
