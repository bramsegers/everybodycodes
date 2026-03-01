require('../everybody/codes')

let day5 = (notes, part) => {

  let instr = notes.map(e => e.match(/\d+/g).map(int))

  let sword = s => {
    let id = s.shift()
    let sword = []
    s.for(e => {
      for (let level of sword) {
        let [a, b, c] = level
        if (!a && e < b) return level[0] = e
        if (!c && e > b) return level[2] = e
      }
      sword.push([0, e, 0])
    })
    let quality = +sword.fold((r, e) => r + e[1], '')
    let levels = sword.map(e => +e.filter(e => e).join``)
    return { id, quality, levels }
  }

  let cmp = (s1, s2) => {
    let i = s1.levels.findIndex((e, i) => e != s2.levels[i])
    return s2.quality - s1.quality || s2.levels[i] - s1.levels[i] || s2.id - s1.id
  }

  let swords = instr.map(sword).sort(cmp)

  if (part == 1) return swords[0].quality
  if (part == 2) return swords[0].quality - swords.pop().quality
  if (part == 3) return swords.fold((r, e, i) => r + e.id * ++i, 0)
}

test(day5, 1, 2656867275)
test(day5, 2, 8505075609391)
test(day5, 3, 31131513)