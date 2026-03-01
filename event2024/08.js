require('../everybody/codes')

let day8 = (notes, part) => {
  
  let num = int(notes)
  
  if (part == 1) {
    let h = cei(sqr(num))
    let t = h * h
    let width = 2 * h - 1
    let add = t - num
    let res = add * width
    return res
  }

  if (part == 2) {

    let layer = 1
    let thick = 1
    let used = 1
    let width = 1
    let mod = 1111
    let avail = 20240000

    while (used < avail) {
      layer++
      thick = thick * num % mod
      width += 2
      used += width * thick
    }

    let add = used - avail
    let res = add * width
    return res
  }

  if (part == 3) {

    let used = 0
    let mod = 10
    let layer = 1
    let width = 1
    let heights = []
    let avail = 202400000
    
    while (used < avail) {
      heights.push(layer)
      used += layer * width
      layer = (layer * num) % mod + mod
      width += 2
    }
    
    let height = heights.pop()
    let mul = ((width - 2) * num) % mod
    for (let i = len(heights); i--;) {
      height += heights[i]
      let sub = (mul * height) % mod
      used -= i ? 2 * sub : sub
    }

    return used - avail
  }

}

test(day8, 1, 8353087)
test(day8, 2, 118866341)
test(day8, 3, 41067)