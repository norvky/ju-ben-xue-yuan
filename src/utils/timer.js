export function createTimer(delay = 3000) {
  let timer = null
  return {
    start() {
      timer = setInterval(() => {
        // getQrCodeList({})
      }, delay)
    },
    stop() {
      clearInterval(timer)
    },
  }
}
