import videoTestData from '@/data/videos.json'
 
const fetchVideos = async (url)=> {
  const BASE_URL = 'https://youtube.googleapis.com/youtube/v3' 
  const response = await fetch(`${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`)
  return  await response.json()
}

export const getCommonVideos = async (url)=> {
  const isDev = process.env.DEVELOPMENT
  try {
    const data = isDev ? videoTestData: await fetchVideos(url)
    if(data?.error){
      console.error('Youtube API error', data.error);
      return []
    }
    
    return data?.items.map(item => {
      const id = item?.id?.videoId || item?.id
      const snippet = item.snippet
    return {
      title: snippet?.title,
      imgUrl: snippet?.thumbnails.high.url,
      id,
      description: snippet.description,
      publishTime: snippet.publishedAt,
      channelTitle: snippet.channelTitle,
      statistics: item.statistics ? item.statistics : {viewCount: 0}
    }
  });
  } catch (error) {
    console.error('something went wrong with video library', error);
    return []
  }
}

export const getVideos = async (searchQuery)=> {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`
  return getCommonVideos(URL)
}

export const getPopularVideos = async ()=> {
  const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=NG";
  return getCommonVideos(URL)
}

export const getYoutubeVideosById = async (id)=> {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}`;
  return getCommonVideos(URL)
}