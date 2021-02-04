const log = console.log

const solution = (m, n, board) => {
  let stacks = [...new Array(n)].map((_, row) =>
    [...new Array(m)].map((_, column) => board[column][row]).reverse()
  )
  let answer = 0

  while (true) {
    const { newBoard, deletedCount, isDeleted } = deleteSameMask(m, n, stacks)
    stacks = newBoard
    answer += deletedCount
    if (!isDeleted) break
  }

  return answer
}

const deleteSameMask = (m, n, board) => {
  let mask = [...new Array(2)].map((_) => [...new Array(2)])
  let deletedBoard = [...new Array(n).fill(true)].map((_) => new Array(m).fill(true))
  let isDeleted = false
  let deletedCount = 0

  for (let row = 0; row < n - 1; row++) {
    for (let column = 0; column < m - 1; column++) {
      mask[0][0] = board[row][column]
      mask[0][1] = board[row][column + 1]
      mask[1][0] = board[row + 1][column]
      mask[1][1] = board[row + 1][column + 1]

      if (isAllSame(mask)) {
        isDeleted = true
        deletedBoard[row][column] = false
        deletedBoard[row][column + 1] = false
        deletedBoard[row + 1][column] = false
        deletedBoard[row + 1][column + 1] = false
      }
    }
  }

  const newBoard = board.map((el, row) => {
    const filrtered = el.filter((_, column) => {
      deletedCount += deletedBoard[row][column] ? 0 : 1
      return deletedBoard[row][column]
    })

    return filrtered.length === el.length ? filrtered : fillLast(filrtered, el.length)
  })

  return { newBoard, deletedCount, isDeleted }
}

const isAllSame = ([first, second]) => first.every((a) => a && second.every((b) => a === b))
const fillLast = (arr, length) => [...new Array(length)].map((_, idx) => arr[idx])

log(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']))
log(solution(6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']))
