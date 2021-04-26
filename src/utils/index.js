export function formlrc (lrc) {
  let arr = lrc.split("\n")
  let lrcarr = []
  arr.forEach((item, index) => {
    let lrco = {}
    lrco.time = item.split(']')[0].replace("[", "")
    lrco.lrc = item.split(']')[1]
    lrcarr[index] = lrco
  })
  return lrcarr
}