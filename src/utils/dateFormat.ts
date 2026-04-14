export function formatDate_UTIL(unixtime: Date | string | number, isShort = true): string {
  if (!unixtime) {
    return '--.--.----'
  }
  const date = new Date(unixtime)

  if (isShort) {
    return `${`0${date.getDate()}`?.slice(-2)}.${`0${date.getMonth() + 1}`?.slice(-2)}.${date.getFullYear()}`
  }

  return `${`0${date.getDate()}`?.slice(-2)}.${`0${date.getMonth() + 1}`?.slice(-2)}.${date.getFullYear()} ${`0${date.getHours()}`.slice(
    -2
  )}:${`0${date.getMinutes()}`.slice(-2)}:${`0${date.getSeconds()}`.slice(-2)}`
}

export function formatDate2_UTIL(unixtime: Date | string | number, isShort = true): string {
  if (!unixtime) {
    return '--.--.----'
  }
  const date = new Date(unixtime)

  if (isShort) {
    return `${date.getFullYear()}.${`0${date.getMonth() + 1}`?.slice(-2)}.${`0${date.getDate()}`?.slice(-2)}`
  }

  return `${`0${date.getDate()}`?.slice(-2)}.${`0${date.getMonth() + 1}`?.slice(-2)}.${date.getFullYear()} ${`0${date.getHours()}`.slice(
    -2
  )}:${`0${date.getMinutes()}`.slice(-2)}`
}
