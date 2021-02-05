const log = console.log

const ALLOWED = /[^-_.a-z0-9]/g
const DOTS_MORE_THAN_TWO = /\.{2,}/g
const FIRST_AND_LAST_DOT = /^\.|\.$/g

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }

  for (const el of iter) acc = f(acc, el)
  return acc
}

const curry = (f) => {
  const curried = (...args) => {
    const isFull = args.length >= f.length
    return isFull ? f(...args) : (...args2) => curried(...args, ...args2)
  }

  return curried
}

const go = (value, ...functions) => reduce((acc, fn) => fn(acc), value, functions)

const take = curry((limit, iter) => {
  const res = []

  for (const el of iter) {
    res.push(el)
    if (res.length === limit) return res
  }

  return res
})

const toLowerCase = (str) => str.toLowerCase()
const join = (arr) => arr.join('')
const replace = curry((parser, replacement, str) => str.replace(parser, replacement))
const ifEmpty = (str) => (str.length ? str : 'a')
const isLonger = (str) => (str.length >= 16 ? go(str, take(15), join) : str)
const repeatLast = curry((limit, str) => {
  const repeat = (str) => {
    if (str.length >= limit) return str
    else return repeat(str.concat('', str[str.length - 1]))
  }

  return repeat(str)
})

const solution = (newId) =>
  go(
    newId,
    toLowerCase,
    replace(ALLOWED, ''),
    replace(DOTS_MORE_THAN_TWO, '.'),
    replace(FIRST_AND_LAST_DOT, ''),
    ifEmpty,
    isLonger,
    replace(FIRST_AND_LAST_DOT, ''),
    repeatLast(3)
  )

log(solution('...!@BaT#*..y.abcdefghijklm'))
log(solution('z-+.^.'))
log(solution('=.='))
log(solution('123_.def'))
log(solution('abcdefghijklmn.p'))
