const log = console.log

const L = {}

const curry = (f) => (first, ...args) =>
  args.length ? f(first, ...args) : (...args) => f(first, ...args)

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  } else {
    iter = iter[Symbol.iterator]()
  }

  for (const el of iter) acc = f(acc, el)
  return acc
})

const go = (value, ...functions) => reduce((acc, fn) => fn(acc), value, functions)
const pipe = (fn, ...functions) => (...values) => go(fn(...values), ...functions)

L.map = curry(function* (f, iter) {
  for (const el of iter) yield f(el)
})

const take = curry((limit, iter) => {
  const res = []

  for (const el of iter) {
    res.push(el)
    if (res.length === limit) return res
  }

  return res
})

const takeAll = take(Infinity)
const map = curry(pipe(L.map, takeAll))

const split = curry((seperator, str) => str.split(seperator))
const join = curry((seperator, str) => str.join(seperator))

L.prepend = curry(function* (val, iter) {
  yield val
  yield* iter
})

const binarySearchLowerBound = curry((target, arr) => {
  if (!arr) return 0
  let min = 0
  let max = arr.length - 1

  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (target <= arr[mid]) max = mid - 1
    if (arr[mid] < target) min = mid + 1
  }

  if (arr[min] >= target) return arr.length - min
  return 0
})

const getSubsets = (arr) => {
  let flag = new Array(arr.length).fill(false)
  const subSets = []

  const subSet = (depth) => {
    if (depth === arr.length) {
      const sub = arr.map((val, idx) => (flag[idx] ? val : '-')).join('')
      subSets.push(sub)
      return
    }

    flag[depth] = true
    subSet(depth + 1)

    flag[depth] = false
    subSet(depth + 1)
  }

  subSet(0)
  return subSets
}

const solution = (info, quries) => {
  const scoresGroupBy = go(
    info,
    L.map(split(' ')),
    L.prepend(new Map()),
    reduce((scoresGroupBy, info) => {
      const score = info.pop()
      const subSets = getSubsets(info)

      for (const key of subSets) {
        const currentScores = scoresGroupBy.get(key)
        if (currentScores) {
          currentScores.push(Number(score))
          scoresGroupBy.set(key, currentScores)
        } else scoresGroupBy.set(key, [Number(score)])
      }

      return scoresGroupBy
    })
  )

  for (const [key, value] of scoresGroupBy) {
    scoresGroupBy.set(
      key,
      value.sort((a, b) => a - b)
    )
  }

  return go(
    quries,
    L.map((query) => query.replace(/and/g, '')),
    L.map(split(' ')),
    map((query) => {
      const criteria = query.pop()
      return go(
        query,
        join(''),
        (key) => scoresGroupBy.get(key),
        binarySearchLowerBound(Number(criteria))
      )
    })
  )
}

log(
  solution(
    [
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ],
    [
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ]
  )
) // [1, 1, 1, 1, 2, 4]
