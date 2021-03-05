const log = console.log
const REGEXP = /([a-zA-Z.-\s]+)(\d+)(.+)?/
const regExp = new RegExp(REGEXP)

const solution = (files) => {
  const split = files
    .map((file) => file.match(regExp))
    .map(([_, HEAD, NUMBER, TAIL]) => ({
      HEAD: HEAD.toLowerCase(),
      NUMBER: Number(NUMBER),
      TAIL,
    }))

  log(split)

  const sorted = [...Array(files.length)]
    .map((_, idx) => idx)
    .sort((a, b) => {
      if (split[a].HEAD < split[b].HEAD) return -1
      if (split[a].HEAD > split[b].HEAD) return 1

      if (split[a].NUMBER < split[b].NUMBER) return -1
      if (split[b].NUMBER > split[b].NUMBER) return 1

      return 0
    })
    .map((idx) => files[idx])

  return sorted
}

log(solution(['img12.png', 'img10.png', 'img02.png', 'img1.png', 'IMG01.GIF', 'img2.JPG']))
log(solution(['F-5 Freedom Fighter', 'B-50 Superfortress', 'A-10 Thunderbolt II', 'F-14 Tomcat']))
log(solution(['muzi1.txt', 'MU- ZI1.txt', 'muzi001.txt', 'muzi1.TXT']))
