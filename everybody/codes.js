test = (fun, part, expected) => {
  let day = +fun.name.match(/\d+/)[0]
  let sday = str(day).padStart(2, 0)
  let path = `./input/${sday}_${part}.txt`
  let notes = read(path)
  let start = Date.now()
  let actual = fun(notes, part)
  let pass = actual == expected
  let ms = Date.now() - start
  let res = { day, part, actual, expected, ms }
  let raw = `\x1b[${pass ? 32 : 34}m%s\x1b[0m`
  print(raw, pass ? 'QUACK!' : 'FAIL' , res)
}

read = path => require('fs').readFileSync(path, 'utf-8').split('\r\n')
write = txt => require('fs').writeFileSync('./output/out.txt', txt, 'utf-8')
print = console.log

inf = 1 / 0																				// num
big = BigInt																			// num
log = Math.log																		// num
sgn = Math.sign																		// num
cei = Math.ceil																		// num
int = Math.floor																	// num
hyp = Math.hypot																	// num
sqr = Math.sqrt                                   // num

isq = n => int(sqr(n))                            // num
abs = n => n < 0 ? -n : n													// num, big
lcm = (a, b) => a / gcd(a, b) * b									// num, big
gcd = (a, b) => b ? gcd(b, a % b) : a							// num, big
fac = n => n ? n * fac(--n) : n === 0 ? 1 : 1n		// num, big
ncr = (a, b) => fac(a) / fac(b) / fac(a - b)			// num, big

sum = (a, b) => a.pop ? a.reduce((a, b) => a + b) : a + b                  		// num, big
min = (a, b) => a.pop ? a.reduce((m, e) => e < m ? e : m) : a < b ? a : b 		// num, big
max = (a, b) => a.pop ? a.reduce((m, e) => e > m ? e : m) : a > b ? a : b 		// num, big

len = e =>
  e.length >= 0 ? e.length  :
  e.size >= 0 ? e.size      :
  e >= 0 ? str(e).length    :
  typeof e == 'object' ? Object.keys(e).length : 0

str = s => new String(s)
ord = c => c.charCodeAt()
chr = c => String.fromCharCode(c)

map = e => new Map(e)
set = e => new Set(e)

i8 = n => new Int8Array(n)
i16 = n => new Int16Array(n)
i32 = n => new Int32Array(n)

arr = (n, v) => (
  n = [...(n === +n ? Array(n) : n)],
  v === undefined ? n : n.map(v.call ? (_, i) => v(i) : _ => v)
)

Object.defineProperty(Array.prototype, 'for', {
  value: function (f) { this.forEach(f); return this },
  enumerable: false,
})

Object.defineProperty(Array.prototype, 'fold', {
  value: function (f, init) { return this.reduce(f, init) },
  enumerable: false,
})

dimensions = grid => [len(grid), max(grid.map(len))]

location = (token, grid) => {
  let y = grid.findIndex(e => e.includes(token))
  return y < 0 ? [] : [y, grid[y].indexOf(token)]
}
  
neighbors = (s, bounds) => {
  let d = {
    _ : [ 0, 0], N : [-1, 0], E : [ 0, 1],
    S : [ 1, 0], W : [ 0,-1], NE: [-1, 1],
    SE: [ 1, 1], SW: [ 1,-1], NW: [-1,-1],
  }
  s = s.toUpperCase().split(/[^\_A-Z]+/g)
  d = s.fold((r, c) => (r.push(d[c]), r), [])
  s = (y, x) => d.map(([i, j]) => [y + i, x + j])
  return (y, x) => bounds ? s(y, x).filter(e => bounds(...e)) : s(y, x)
}