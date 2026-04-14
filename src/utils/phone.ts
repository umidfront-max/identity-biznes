export function phone_UTIL(phone: string | number) {
  if (phone && phone.toString().length == 12) {
    return `+${phone.toString().slice(0, 3)}-(${phone.toString().slice(3, 5)})-${phone.toString().slice(5, 8)}-${phone
      .toString()
      .slice(8, 10)}-${phone.toString().slice(10, 12)}`
  }
  if (phone && phone.toString().length == 13) {
    return `${phone.toString().slice(0, 4)}-(${phone.toString().slice(4, 6)})-${phone.toString().slice(6, 9)}-${phone
      .toString()
      .slice(9, 11)}-${phone.toString().slice(11, 13)}`
  }
}
