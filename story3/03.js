require('../everybody/codes')
 
let day3 = (notes, part) => {
 
  let node
 
  let tree = notes.map(e => e
    .match(/(?<==)[^,]+/g))
    .map(([i, p, L, R, d]) => ({
      id: i - 1,
      plug: p,
      L, R,
      child: {},
      data: d
  }))
 
  let bond = (n, side) => {
    let [plug, sock] = [node.plug, n[side]]
    let [a, b, c, d] = (plug + ' ' + sock).split` `
    if (!n.child[side]) return plug == sock ? 1 : 2 * (part > 1 && (a == c || b == d))
    if (part == 3 && n[side] != tree[n.child[side]].plug && plug == sock) return 3
  }
 
  let swap = (n, side) => {
    let prv = n.child[side]
    tree[n.id].child[side] = node.id
    tree[node.id].parent = n.id
    node = tree[prv]
  }
 
  let par = n => {
    for (let [c, t] of 'LR') {
      if ((t = bond(n, c)) && t < 3) return [n, c]
      if ((!t || swap(n, c)) && n.child[c] && (t = par(tree[n.child[c]]))) return t
    }
  }
 
  let walk = (n, c = []) => ((n = tree[n]) && (
    walk(n.child.L, c), c.push(n), walk(n.child.R, c)), c)
 
  for (let i = 0, n; node = tree[++i];) {
    for (n = 0; !n;) n = par(tree[0])
    let [parent, side] = n
    tree[node.id].parent = parent.id
    tree[parent.id].child[side] = node.id
  }
 
  // walk(0).for(e => print(e.data))
  return walk(0).fold((r, n, i) => r += (n.id + 1) * (i + 1), 0)
}
 
test(day3, 1, 5663)
test(day3, 2, 321309)
test(day3, 3, 406577)