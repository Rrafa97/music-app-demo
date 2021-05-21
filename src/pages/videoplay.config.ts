// 播放器配置
const state__ :any = {
  refresh: false,
  plst: {
    currtime: 0,
    percentage: 0,
    pstm: '0:00',
  },
  playstau: false,
  fullscreamdata: {
    width: '100vw',
    height: '30vh'
  },
  constl: {
    width: "100vw",
    maxWidth: '100vw'
  },
  constlVanSlider: {
    maxWidth: '70vw',
    width: '70vw',
    margin: '0 10px'
  },
  contrlBox: {
    display: 'flex'
  }
}

export default {
  getstate(state__:any) {
    return state__
  }
}