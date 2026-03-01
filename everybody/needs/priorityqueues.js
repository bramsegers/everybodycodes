prioqueue = () => {

  let values = []

  let bubbleUp = () => {
    let idx = values.length - 1
    let elm = values[idx]
    while (idx > 0) {
      let pidx = Math.floor((idx - 1) / 2)
      let parent = values[pidx]
      if (elm.prio == parent.prio) return
      if (elm.prio > parent.prio) break
      values[pidx] = elm
      values[idx] = parent
      idx = pidx
    }
    return 1
  }

  let sinkDown = () => {
    let idx = 0
    let elm = values[0]
    let len = values.length
    while (1) {
      let L, R, swap
      let Li = 2 * idx + 1
      let Ri = 2 * idx + 2
      if (Li < len) {
        L = values[Li]
        if (L.prio < elm.prio) swap = Li
      }
      if (Ri < len) {
        R = values[Ri]
        let prio = swap ? L.prio : elm.prio
        if (R.prio < prio) swap = Ri
      }
      if (!swap) break
      values[idx] = values[swap]
      values[swap] = elm
      idx = swap
    }
  }

  let more = () => {
    return values.length > 0
  }

  let push = (val, prio) => {
    let node = { val, prio }
    values.push(node)
    return bubbleUp()
  }
  
  let pop = () => {
    let min = values[0]
    let end = values.pop()
    if (values.length) {
      values[0] = end
      sinkDown()
    }
    return min
  }
  
  return {more, push, pop}
}