const log = console.log

const solution = (info, query) => {
  const scoreTable = new Map()

  // get possible options and map score to each option so that each possible option can be quired
  info.forEach((i) => {
    const splitInfo = i.split(' ')
    const score = splitInfo.pop()
    const options = getPossibleOptions(splitInfo)

    options.forEach((option) => {
      const current = scoreTable.get(option) || []
      current.push(Number(score))
      scoreTable.set(option, current)
    })
  })

  // sort in ascending
  for (const [key, scores] of scoreTable) {
    scoreTable.set(
      key,
      scores.sort((a, b) => a - b)
    )
  }

  return query
    .map((q) => {
      const queryWithoutAnd = q.replace(/and/gi, '').split(' ')
      const criteria = queryWithoutAnd.pop()
      const key = queryWithoutAnd.join('')
      return [key, criteria]
    })
    .map(([key, criteria]) => getAvailableCandidates(scoreTable.get(key), Number(criteria)))
}

// info: string (ex. 'java backend junior pizza 150')
// 4 => 16 different options
const getPossibleOptions = (info) => {
  const infoLength = info.length
  let flags = new Array(infoLength).fill(false)
  const options = []

  const PowerSet = (level) => {
    if (level === infoLength) {
      const option = flags.map((flag, idx) => (flag ? info[idx] : '-')).join('')
      options.push(option)

      return
    }

    flags[level] = false
    PowerSet(level + 1)

    flags[level] = true
    PowerSet(level + 1)
  }

  PowerSet(0)
  return options
}

// Binary Search with minimum
// scores: number[]
// criteria: number
const getAvailableCandidates = (scores, criteria) => {
  if (!scores) return 0
  let [left, right] = [0, scores.length - 1]

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (scores[mid] < criteria) left = mid + 1
    if (scores[mid] >= criteria) right = mid - 1
  }

  return scores.length - left
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
)
