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
  var arr = str.split(/[:.]/);
  var str_ = parseInt(arr[0])*60 + parseInt(arr[1])
  // let arr_ = arr[1].split('.')
  return str_
}