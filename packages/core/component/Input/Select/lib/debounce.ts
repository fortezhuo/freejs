export function debounce(func: any, wait: boolean) {
  let timeout: any

  return (...args: any) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      timeout = null
      func(...args)
    }, wait)
  }
}
