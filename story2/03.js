require('../everybody/codes')

let day3 = (notes, part) => {

  let [dice, track] = notes
  . join`|`
  . split`||`
  . map(e => e
  . split`|`)
  
  dice = dice
  . map(e => e
  . match(/-?\d+/g).map(int))
  . map(e => ({id: e
  . shift(), seed: e.at(-1), pulse: e
  . pop(), faces: e, start: 0, rolls: 0}))

  let roll = die => {
    let spin = ++die.rolls * die.pulse
    die.start += spin
    die.start %= len(die.faces)
    die.pulse += spin
    die.pulse %= die.seed
    die.pulse += 1 + die.rolls + die.seed
    return die.faces[die.start]
  }

  if (part == 1) {
    let res = 0
    for (let tot = 0; tot < 10000; res++)
      tot += dice.fold((r, die) => r + roll(die), 0)
    return res
  }

  if (part == 2) {
    let res = []
    for (let die of dice) {
      for (let i = 0; track[0][i];)
        i += roll(die) == track[0][i]
      res.push(die)
    }
    return res.sort((a, b) => a.rolls - b.rolls).map(e => e.id).join`,`
  }

  if (part == 3) {
    let res = set()
    let bounded = (i, j) => track[i] && track[i][j]
    let nbs = neighbors('N E S W', bounded)
    let key = (i, j) => (i << 10) | j
    let unk = p => [p >> 10, p & 1023]
    let init = set(track.map((e, i) => arr(e).map((_, j) => key(i, j))).flat())
    for (let die of dice) {
      let pos1 = set(init)
      while (len(pos1)) {
        let thrown = roll(die)
        let pos2 = set()
        for (let p of pos1) {
          let [i, j] = unk(p)
          if (track[i][j] == thrown) {
            nbs(i, j).for(([i ,j]) => pos2.add(key(i, j)))
            pos2.add(p)
            res.add(p)
          }
        }
        pos1 = pos2
      }
    }
    return len(res)
  }

}

test(day3, 1, 630)
test(day3, 2, '7,8,9,5,6,3,2,4,1')
test(day3, 3, 158086)