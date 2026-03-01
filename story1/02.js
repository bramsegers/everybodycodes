require('../everybody/codes')

let day2 = (notes, part) => {

  let instr = notes
  . map(e => e
  . replace(/[^ ,!A-Z\d]+/g, '')
  . split(/[ ,]/))

  let tree1, tree2

  let add = (r, n) => n.val < r.val
    ? r.L ? add(r.L, n) : (n.par = r, r.L = n)
    : r.R ? add(r.R, n) : (n.par = r, r.R = n)

  let find = (id, n, c = []) => (
    n.id == id && c.push(n),
    n.L && find(id, n.L, c),
    n.R && find(id, n.R, c), c)

  let swap = (id) => {

    let [n1, n2] = [find(id, tree1), find(id, tree2)].flat()

    if (part == 2) {
      [n1.val, n1.char, n2.val, n2.char] =
      [n2.val, n2.char, n1.val, n1.char]
    }

    if (part == 3) {
      let [par1, par2] = [n1.par, n2.par]
      if (!par1 && !par2) return [tree1, tree2] = [tree2, tree1]  // swap 2 roots
      if (!par1 || !par2) throw Error('not implemented')          // swap root with non-root
      if (par1.L == n1) par1.L = n2                               // swap 2 non-roots
      if (par1.R == n1) par1.R = n2
      if (par2.L == n2) par2.L = n1
      if (par2.R == n2) par2.R = n1
      n1.par = par2
      n2.par = par1
    }
  }

  let text = (t, c = []) => {
    let f = (t, d) => t && (c[d] ||= '',
      c[d] += t.char, f(t.L, d + 1), f(t.R, d + 1))
    return c.fold((r, e) => len(e) > len(r) ? e : r, '', f(t, 0))
  }

  instr.for(([op, id, n1, c1, n2, c2]) => {
    [id, n1, n2] = [id, n1, n2].map(int)
    if (op == 'ADD') {
      n1 = { id, val: n1, char: c1 }
      n2 = { id, val: n2, char: c2 }
      tree1 ? add(tree1, n1) : tree1 = n1
      tree2 ? add(tree2, n2) : tree2 = n2
    }
    if (op == 'SWAP') swap(id)
  })

  return text(tree1) + text(tree2)
}

test(day2, 1, 'QUACK!RVGNVVZJ')
test(day2, 2, 'QUACK!MJPLBJRRVBHJVY')
test(day2, 3, 'QUACK!YJHNWRBYMXNBWRZRJGVPSSZVJNMT')