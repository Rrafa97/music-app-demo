import instance from './api.config.js'

export function SERCH_KEYWORDS (keywords) {
  return instance({
    method: 'get',
    url: 'http://musicapi.leanapp.cn/search',
    params: {
      keywords: keywords
    }
  })
}

export function GET_SONG (songId) {
  return instance({
    method: 'get',
    url: 'https://api.imjad.cn/cloudmusic/',
    params: {
      type: 'song',
      id: songId
    }
  })
}