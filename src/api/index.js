import instance from './api.config.ts'

export function SERCH_KEYWORDS (keywords) {
  return instance({
    method: 'get',
    url: '/search',
    params: {
      keywords: keywords
    }
  })
}

export function GET_SONG (songId) {
  return instance({
    method: 'get',
    url: '/cloudmusic/',
    params: {
      type: 'song',
      id: songId
    }
  })
}

export function SERCH_HOT () {
  return instance({
    method: 'get',
    url: '/search/hot/',
  })
}

export function SERCH_KEY (keywords) {
  return instance({
    method: 'get',
    url: '/cloudsearch',
    params: {
      keywords: keywords
    }
  })
}

export function GET_LYRIC( id ) {
  return instance ({
    method: 'get',
    url: '/lyric',
    params: {
      id: id
    }
  })
}

export function SONGS_DETAIL(ids) {
  return instance ({
    method: 'get',
    url: '/song/detail',
    params: {
      ids: ids
    }
  })
}

export function PLAYLIST_HOT() {
  return instance( {
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