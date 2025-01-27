export function createTimer() {
  let timer = null
  let delay = 5000

  const start = (fn, _delay) => {
    delay = _delay || delay
    const loop = () => {
      if (fn) {
        timer = setTimeout(loop, delay)
        fn()
      }
    }
    console.log('定时器开始')
    loop()
  }

  const stop = () => {
    clearTimeout(timer)
    console.log('定时器停止')
  }

  return { start, stop }
}
