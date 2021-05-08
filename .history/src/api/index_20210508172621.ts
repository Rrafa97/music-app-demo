import instance from './api.config'

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