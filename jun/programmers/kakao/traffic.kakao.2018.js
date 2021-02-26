const log = console.log

const solution = (lines) => {
  const responseIntervals = lines
    .map((l) => l.split(' '))
    .map(([date, end, time]) => [`${date}/${end}`, time])
    .map(([end, time]) => {
      const startDate = new Date(end)
      const parsedTime = time
        .replace('s', '')
        .split('.')
        .map((v, idx) => {
          if (idx === 1) return Number(v) * 10 ** Math.abs(v.length - 3)
          return Number(v)
        })

      const [seconds, millieSeconds] = parsedTime

      startDate.setMilliseconds(startDate.getMilliseconds() - millieSeconds + 1 || 1)
      startDate.setSeconds(startDate.getSeconds() - seconds)
      const endDate = new Date(end)
      return [startDate.getTime(), endDate.getTime()]
    })

  let max = -Infinity

  // 시작과 끝점에 대해서만 순회하면 된다.
  // 어차피 요청량이 변하는 순간은 각 로그의 시작점과 끝점이다.
  // 로그의 시작과 끝점 사이 값은 항상 동일한 요청량을 가질 것이다.
  const logPoints = responseIntervals.flatMap((v) => v)
  logPoints.forEach((point) => {
    const [maskS, maskE] = [point, point + 999]
    const concurrent = responseIntervals.filter(([s, e]) => {
      if (s >= maskS && s <= maskE) return true // mask 가 구간의 왼쪽에 걸쳐 있을 때
      if (e >= maskS && e <= maskE) return true // mask 가 구간의 오른쪽에 걸쳐있을 때
      if (s <= maskS && e >= maskE) return true // mask 가 구간의 사이에 있을 때

      return false
    }).length

    max = Math.max(max, concurrent)
  })

  return max
}

log(solution(['2016-09-15 01:00:04.001 2.0s', '2016-09-15 01:00:07.000 2s'])) // 1
log(solution(['2016-09-15 01:00:04.002 2.0s', '2016-09-15 01:00:07.000 2s'])) // 2
log(
  solution([
    '2016-09-15 20:59:57.421 0.351s',
    '2016-09-15 20:59:58.233 1.181s',
    '2016-09-15 20:59:58.299 0.8s',
    '2016-09-15 20:59:58.688 1.041s',
    '2016-09-15 20:59:59.591 1.412s',
    '2016-09-15 21:00:00.464 1.466s',
    '2016-09-15 21:00:00.741 1.581s',
    '2016-09-15 21:00:00.748 2.31s',
    '2016-09-15 21:00:00.966 0.381s',
    '2016-09-15 21:00:02.066 2.62s',
  ])
) // 7
log(solution(['2016-09-15 00:00:00.000 3s']))
log(solution(['2016-09-15 23:59:59.999 0.001s']))
log(solution(['2016-09-15 00:00:00.000 2.3s', '2016-09-15 23:59:59.999 0.1s']))
log(solution(['2016-09-15 00:00:00.000 2.3s', '2016-09-15 23:59:59.999 0.1s'])) // 1
