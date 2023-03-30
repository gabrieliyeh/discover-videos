import styles from '@/styles/video.module.css'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import cls from 'classnames'
import Navbar from '@/components/navbar/Navbar'
import { getYoutubeVideosById } from '@/lib/videos'

export async function getStaticProps ({params: {videoId}}) {
  const videoArray = await getYoutubeVideosById(videoId)
  return {
    props:{
      video: videoArray.length > 0 ? videoArray[0]: {}
    },
    revalidate: 10
  }
} 

export async function getStaticPaths (){
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map(videoId => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
}

const VideoPage = ({video}) => {
  Modal.setAppElement('#__next');
  const router = useRouter()
  const {videoId}= router.query

  const {title, publishTime, description,channelTitle,statistics: {viewCount}}= video

  return (
    <>
      <Navbar/>
      <div className={styles.container}>
      <Modal
      isOpen={true}
      contentLabel="Watch the Video"
      onRequestClose={()=> router.back()}
      className={styles.modal}
      overlayClassName={styles.overlay}
      >
       <div>
        <iframe 
        className={styles.videoPlayer}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`} frameborder="0" width={640} height={360} itemType='text/htl'
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
          <div className={styles.col1}>
            <p className={styles.publishTime}>{publishTime}</p>
            <p className={styles.title}>{title}</p>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.col2}>
          <p className={cls(styles.subText, styles.subTextWrapper)}>
            <span className={styles.textColor}>Cast: </span>
             <span className={styles.channelTitle}>{channelTitle}</span>
          </p> 
          <p className={cls(styles.subText, styles.subTextWrapper)}>
            <span className={styles.textColor}>View Count: </span>
             <span className={styles.channelTitle}>{viewCount}</span>
          </p>
          </div>
          </div>
        </div>
       </div>
      </Modal>
    </div>
    </>
  
  )
}

export default VideoPage
