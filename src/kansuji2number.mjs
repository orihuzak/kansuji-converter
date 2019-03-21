const kansujiDict = { 
  〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 
  十: 10, 百: 100, 千: 1000, 万: 10000, 億: 10 ** 8, 兆: 10 ** 12 },
      manRe = /[万億兆]/,
      unitRe =  /[十百千]/,
      log = console.log

/** 漢数字をnumberにして返します */
export function kansuji2Number(text) {
  let result = 0
  const units = text.split(manRe)
  const length = units.length - 1
  units.forEach( (unit, index) => {
    result += unit2number(unit)
    if (!(index === length)) result *= 10000
  })
  return result
}

/** 単位を含む漢数字列を数字にする */
function unit2number(text) {
  let result = 0
  if(unitRe.test(text)){
    const i = text.search(unitRe)
    const prePtnStr = text.substring(0, i)
    const unit = text[i]
    const prePtnNum = nonUnitKansuji2number(prePtnStr, 1)
    result += 1 * prePtnNum * kansujiDict[unit]
    text = text.substring(i + 1)
    if(text.length > 0) result += unit2number(text)
  } else result += nonUnitKansuji2number(text)
  return result
}

/** 単位の漢数字を含まない漢数字列を数値化する。identityは単位元で0か１をとる */
function nonUnitKansuji2number(text, identity = 0) {
  if (![0, 1].includes(identity)) throw new RangeError('identity must be 0 or 1.')
  const kansujis = text.split('')
  let result = 0
  kansujis.forEach( (k, i) => {
    result += (10 ** (kansujis.length - 1 - i)) * kansujiDict[k]
  })
  return (result === 0 && identity === 1) ? 1 : result
}