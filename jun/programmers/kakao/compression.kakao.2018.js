const log = console.log

const solution = (msg) => {
  const aToZ = [...new Array(26)].map((_, idx) => String.fromCharCode(idx + 65))
  const dictionary = Object.entries(aToZ).reduce((acc, [index, char]) => {
    acc.set(char, Number(index) + 1)
    return acc
  }, new Map())

  const msgArr = [...msg]
  const result = []

  while (msgArr.length > 0) {
    let idx = 0
    let currentWord = msgArr[idx]
    while (dictionary.has(currentWord)) {
      currentWord += msgArr[idx + 1]
      idx += 1
    }

    const word = msgArr.splice(0, idx).join('')
    result.push(dictionary.get(word))
    dictionary.set(`${word}${msgArr[0]}`, dictionary.size + 1)
  }

  return result
}

log(solution('KAKAO'))
log(solution('TOBEORNOTTOBEORTOBEORNOT'))
log(solution('ABABABABABABABAB'))
