import Head from 'next/head'
import Banner from '@/components/banner/Banner'
import Navbar from '@/components/navbar/Navbar'
import SectionCards from '@/components/card/SectionCards'
import styles from '@/styles/Home.module.css'
import { getPopularVideos, getVideos } from '@/lib/videos'

export const getServerSideProps = async ()=> {
  const disneyVideos = await getVideos('disney trailer')
  const productivityVideos = await getVideos('productivity trailer')
  const travelVideos = await getVideos('travel trailer')
  const popularVideos = await getPopularVideos()

  return {
      props: {disneyVideos, productivityVideos, travelVideos, popularVideos}
  }
}

export default function Home({disneyVideos, productivityVideos, travelVideos, popularVideos}) {

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover videos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar />
        <Banner
         title='Clifford the bad dog'
         subTitle='a very cute and loyal dog'
         imgUrl='/static/clifford.webp'
         videoId='kpGo2_d3oYE'
         />
         <div className={styles.sectionWrapper}>
         <SectionCards title='Disney' videos={disneyVideos} size='large'/>
         <SectionCards title='Travel' videos={travelVideos} size='small'/>
         <SectionCards title='Productivity' videos={productivityVideos} size='medium'/>
         <SectionCards title='Popular' videos={popularVideos} size='small'/>
         </div>
      </main>
    </>
  )
}
