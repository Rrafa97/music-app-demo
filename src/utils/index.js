export function formlrc (lrc) {
  let arr = lrc.split("\n")
  let lrcarr = []
  arr.forEach((item, index) => {
    let lrco = {}
    lrco.time = makeDurationToSeconds(item.split(']')[0].replace("[", ""))
    lrco.lrc = item.split(']')[1]
    lrcarr[index] = lrco
  })
  return lrcarr
}

export function makeDurationToSeconds (time) {
  var str = time;
  var arr = str.split(/[:]/);
  var str_ = parseFloat((parseInt(arr[0])*60 + parseFloat(arr[1])).toFixed(1))
  // let arr_ = arr[1].split('.')
  return str_
}

export function transfromTimeToMins(time) {
  let secsum = parseInt(time)
  let min = parseInt(secsum/60)
  let sec = secsum - min*60
  let ms = time.toFixed(1).toString().split('.')[1]
  if(sec.toString().length <= 1) {
    sec = '0'+sec
  }
  return min + ':' + sec
}