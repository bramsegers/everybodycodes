require('../everybody/codes')

let day7 = (notes, part) => {

  let names = notes[0].split`,`

  let rules = notes.slice(2)
  . fold((r, [a, ...b]) => (r[a] = b
  . filter(e => /[a-z]/i
  . test(e)), r), {})

  let valid = ([...n]) => n
  . every((c, i) => !n[i + 1] || rules[c]
  . includes(n[i + 1]))

  let part3 = (c, n) => (n <= 11) && (n >= 7) +
    (rules[c] || []).fold((r, c) => r + part3(c, n + 1), 0)

  if (part == 1) return names.find(valid)
  if (part == 2) return names.fold((r, e, i) => r + valid(e) * (i + 1), 0)
  if (part == 3) return names.filter(s => valid(s) && !names.some(t => s != t
    && s.startsWith(t))).fold((r, s) => r + part3(s.slice(-1), len(s)), 0)
}

test(day7, 1, 'Ulnarith')
test(day7, 2, 3045)
test(day7, 3, 9382716)