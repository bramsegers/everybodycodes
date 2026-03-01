require('../everybody/codes')

let day7 = (notes, part) => {


  let val = e =>
    '-=+'.indexOf(e) - 1


  let pplans = p => p
    .map((e, f) => ([e, f] = e
    .split`:`, [e, f
    .split`,`
    .map(val)]))


  let ptrack = t => {
    t = t.map(e => arr(e))
    let trk = ''
    let nb = neighbors('N E S W') 
    let f = (i, j) => {
      trk += t[i][j]
      t[i][j] = ' '
      nb(i, j).for(([i, j]) => t[i] &&
        t[i][j] && t[i][j] != ' ' && f(i, j))
    }
    f(0, 1, t[0][0] = ' ')
    return arr(trk + '=').map(val)
  }


  let split = notes.indexOf('')
  let plans = pplans(notes.slice(0, split))
  let track = ptrack(notes.slice(split + 1))


  let race = (plan, loops) => {
    let idx = 0
    let tot = 0
    let pow = 10
    for (let loop = 0; loop < loops; loop++) {
      track.for(e => {
        let delta = plan[idx % len(plan)]
        pow = max(0, pow + (e || delta))
        tot += pow
        idx++
      })
    }
    return tot
  }


  if (part < 3) {
    let scores = plans.map(([a, b]) => [a, race(b, 10)])
    let res = scores.sort((a, b) => b[1] - a[1]).map(e => e[0]).join``
    return res
  }


  let my_plans = []
  let permute = (a, b, c, s) => {
    if (!(a + b + c)) my_plans.push(arr(s).map(val))
    if (a) permute(a - 1, b, c, s + '-')
    if (b) permute(a, b - 1, c, s + '=')
    if (c) permute(a, b, c - 1, s + '+')
  }
  permute(3, 3, 5, '')

  let loops = 2024 / 8
  let score = race(plans[0][1], loops)
  let res = my_plans.fold((r, p) => r += race(p, loops) > score, 0)
  return res
}


test(day7, 1, 'FBKECJADI')
test(day7, 2, 'BHACEJKDG')
test(day7, 3, 6532)