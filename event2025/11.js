require('../everybody/codes')

let day11 = (notes, part) => {

  let ducks = notes.map(int)

  let phase1 = () => {
    let rounds = 0
    for (let done = 0; !done; rounds++)
      for (let i = done = 1; ducks[i]; i++)
        if (ducks[i] < ducks[i - 1]) ducks[i - 1]--, ducks[i]++, done = 0
    return rounds - 1
  }

  let phase2 = () => {
    let tgt = sum(ducks) / len(ducks)
    return ducks.fold((r, d) => r + max(0, d - tgt), 0)
  }

  if (part == 1) {
    let rounds = phase1()
    while (++rounds <= 10)
      for (let i = 1; ducks[i]; i++)
        if (ducks[i] > ducks[i - 1]) ducks[i]--, ducks[i - 1]++
    return ducks.fold((r, duck, i) => r + duck * (i + 1), 0)
  }

  if (part == 2) return phase1() + phase2()
  if (part == 3) return phase2() // ducks are already in phase 2
}

test(day11, 1, 298)
test(day11, 2, 3952731)
test(day11, 3, 152959215259947)