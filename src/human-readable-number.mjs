function round(number, precision) {
  const shift = (num, prec, reverseShift) => {
    if (reverseShift) prec = -prec
    const numArray = ('' + num).split('e')
    return +(numArray[0] + 'e' + (numArray[1] ? +numArray[1] + prec : prec))
  }
  return shift(Math.round(shift(number, precision, false)), precision, true)
}

export default function toHumanReadable(num, option = { lang: 'en' }) {
  let result = {
    number: num,
    prefix: ''
  }
  if (Math.trunc(num).toString().length >= 4) {
    result.number = num / 1000
    if(option.lang === 'en') result.prefix = 'k'
    else if(option.lang === 'ja') result.prefix = 'キロ'
  }
  result.number = round(result.number, 0)
  return result
}
