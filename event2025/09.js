require('../everybody/codes')

let day9 = (notes, part) => {

  let res = 0
  let triads = []
  let family = []
  let dna = notes.map(e => e.match(/[A-Z]/g))

  dna.for((c, ci) => dna.for((p, pi) => dna.for((q, qi) => {
    if (pi <= qi || ci == pi || ci == qi) return
    if (c.some((c, i) => p[i] != c && q[i] != c)) return
    let val = p => c.fold((r, c, i) => r += p[i] == c, 0)
    triads.push([ci + 1, pi + 1, qi + 1])
    res += val(p) * val(q)
  })))

  if (part == 1 || part == 2) return res

  while (len(triads)) {
    let fam = set(triads.pop())
    let add = i => (i = triads.findIndex(([a, b, c]) =>
      fam.has(a) || fam.has(b) || fam.has(c))) + 1 && (
      triads[i].for(e => fam.add(e)), triads.splice(i, 1), add())
    if ((add(), len(fam)) > len(family)) family = fam
  }

  return sum(arr(family))
}

test(day9, 1, 6642)
test(day9, 2, 320227)
test(day9, 3, 43815)