export function card_UTIL(number: number) {
  return `${number.toString().substring(0, 4)} ${number.toString().substring(4, 8)} ${number.toString().substring(8, 12)} ${number
    .toString()
    .substring(12, 16)}`
}
