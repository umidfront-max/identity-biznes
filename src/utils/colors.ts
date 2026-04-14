import { round } from 'lodash-es'

export const getRgbNum = (sColor: string): number[] => {
  if (sColor.length === 4) {
    let sColorNew = '#'
    for (let i = 1; i < 4; i += 1) {
      sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
    }
    sColor = sColorNew
  }
  const sColorChange: number[] = []
  for (let i = 1; i < 7; i += 2) {
    sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`))
  }
  return sColorChange
}

export const colorRgba = (str: any, n = 1): string => {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  const sColor = str.toLowerCase()
  if (sColor && reg.test(sColor)) return `rgba(${getRgbNum(sColor).join(',')},${round(n, 1)})`
  else return sColor
}
