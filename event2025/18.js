require('../everybody/codes')

let day18 = (notes, part) => {

  let blocks = notes.join`|`.split`||`.map(e => e.split`|`)
  let active = part == 1 ? 0 : blocks.pop().slice(1).map(s => s.split` `.map(int))
  let adjac = blocks.map(_ => [])
  let thick = []

  blocks.for(([a, ...b]) => {
    let [id, t] = a.match(/\d+/g)
    thick[--id] = +t
    b.for(e => {
      let [i, t] = e.match(/-?\d+/g)
      if (t) adjac[id].push([--i, +t])
    })
  })

  let sim = (thick, adj, act) =>
    thick.fold((nrg, inc, i) => (
      inc = len(adj[i]) < 1 ? act ? act[i] : 1 :
      adj[i].fold((r, [id, t]) => r + nrg[id] * t, 0),
      nrg[i] = inc >= thick[i] ? inc : 0,
      nrg), []).pop()

  if (part == 1) return sim(thick, adjac)
  if (part == 2) return active.fold((r, a) => r + sim(thick, adjac, a), 0)
  
  if (part == 3) {
    let fun = (p, _, i) => (adjac[i].for(([j, t]) => p[j] = t > 0), p)
    let tmp = sim(thick, adjac, thick.fold(fun, []))
    return active.fold((r, a) => r += tmp - (sim(thick, adjac, a) || tmp), 0)
  }
}

test(day18, 1, 1400387)
test(day18, 2, 12020379845)
test(day18, 3, 160421)