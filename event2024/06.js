require('../everybody/codes')

let day6 = (notes, part) => {

  let tree = {}
  let paths = {}
  let root = 'RR'

  notes.for(e => {
    let [a, b] = e.split`:`
    tree[a] = b.split`,`
  })

  let f = (n, p) => n == '@' ? (paths[len(p)] ||= []).push(p) :
  (tree[n] || []).for(n => p.includes(n) || f(n, p + ' ' + n))

  let g = e => part == 1 ? e : e[0]

  f(root, root)

  for (let k in paths)
    if (len(k = paths[k]) == 1)
      return k[0].split` `.map(g).join``

}

test(day6, 1, 'RRHBSPJDNWGR@')
test(day6, 2, 'RTJPPBTMVR@')
test(day6, 3, 'RCNBNMHBDSZT@')