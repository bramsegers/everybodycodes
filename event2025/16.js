require('../everybody/codes')

let day16 = (notes, part) => {

  let nums = notes[0].split`,`.map(int)

  let fun1 = len => nums.fold((r, e) => r + int(len / e), 0)

  let fun2 = nums => nums.fold((r, e, i) => {
    if (e) for (let j = i++; nums[j]; j += i) nums[j]--
    if (e) r.push(i)
    return r
  }, [])

  let fun3 = tgt => {
    let res
    let lo = 0
    let hi = 1e16
    while (lo <= hi) {
      let mid = int((lo + hi) / 2)
      if (fun1(mid) > tgt) hi = mid - 1
      else res = mid, lo = mid + 1
    }
    return res
  }

  if (part == 1) return fun1(90)
  if (part == 2) return fun2(nums).fold((r, e) => r * e, 1)
  if (part == 3) return fun3(202520252025000, nums = fun2(nums))
}

test(day16, 1, 230)
test(day16, 2, 179798040576)
test(day16, 3, 97984487237147)