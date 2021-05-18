import instance from './api.config'

/**
 * 
 * @param keywords 搜索关键词
 * @param limit 搜索数量，默认30
 * @param type 类型，注解如下：
 * 默认为 1 即单曲 , 取值意义 : 
 * 1: 单曲, 
 * 10: 专辑, 
 * 100: 歌手, 
 * 1000: 歌单, 
 * 1002: 用户, 
 * 1004: MV, 
 * 1006: 歌词, 
 * 1009: 电台, 
 * 1014: 视频, 
 * 1018:综合
 * @returns 无
 */
export function SERCH_KEYWORDS(keywords: string,limit:number,type:number) {
  return instance({
    method: 'get',
    url: '/cloudsearch',
    params: {
      keywords: keywords,
      limit: limit,
      type:type
    }
  })
}

export function GET_SONG(songId: string) {
  return instance({
    method: 'get',
    url: '/song/url',
    params: {
      type: 'song',
      id: songId
    }
  })
}

export function SERCH_HOT() {
  return instance({
    method: 'get',
    url: '/search/hot/',
  })
}

export function SERCH_KEY(keywords: string) {
  return instance({
    method: 'get',
    url: '/cloudsearch',
    params: {
      keywords: keywords
    }
  })
}

export function GET_LYRIC(id: number) {
  return instance({
    method: 'get',
    url: '/lyric',
    params: {
      id: id
    }
  })
}

export function SONGS_DETAIL(ids: string) {
  return instance({
    method: 'get',
    url: '/song/detail',
    params: {
      ids: ids
    }
  })
}

export function PLAYLIST_HOT() {
  return instance({
    method: 'get',
    url: '/top/playlist?limit=10&order=new'
  })
}

export function PLAYLIST_CATLIST() {
  return instance({
    method: 'get',
    url: '/playlist/catlist'
  })
}

export function PLAYLIST_INFO(id: number) {
  return instance({
    method: 'get',
    url: '/playlist/detail',
    params: {
      id: id
    }
  })
}

export function HIGHT_QUALITY_PL(limit: any) {
  return instance({
    method: 'get',
    url: '/top/playlist/highquality',
    params: {
      limit: limit ? limit : 30
    }
  })
}

export function MV_URL(id: any) {
  return instance({
    method: 'get',
    url: '/mv/url',
    params: {
      id: id
    }
  })
}