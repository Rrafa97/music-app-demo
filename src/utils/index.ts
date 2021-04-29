export function formlrc(lrc: any) {
  const arr = lrc.split("\n")
  const lrcarr: Array<any> = []
  arr.forEach((item: any, index: number) => {
    const lrco: any = {}
    lrco.time = makeDurationToSeconds(item.split(']')[0].replace("[", ""))
    lrco.lrc = item.split(']')[1]
    lrcarr[index] = lrco
  })
  return lrcarr
}

export function makeDurationToSeconds(time: any) {
  const str = time;
  const arr = str.split(/[:]/);
  const str_ = parseFloat((parseInt(arr[0]) * 60 + parseFloat(arr[1])).toFixed(1))
  // let arr_ = arr[1].split('.')
  return str_
}

export function transfromTimeToMins<T>(time: any) {

  const secsum: number = parseInt(time)
  const min:number =  Math.floor(secsum / 60)
  let sec:any = secsum - min * 60
  const ms = time.toFixed(1).toString().split('.')[1]
  if (sec.toString().length <= 1) {
    sec = '0' + sec
  }
  return min + ':' + sec
}