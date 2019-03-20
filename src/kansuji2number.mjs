const kansujiDict = { 
  〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 
  十: 10, 百: 100, 千: 1000, 万: 10000, 億: 10 ** 8, 兆: 10 ** 12 },
      manRe = /[万億兆]/,
      unitRe =  /[十百千]/,
      log = console.log

export function toNumber(text){
  return convert2(text, manRe)
}

function convert2(text, re) {
  let result = 0
 // let flag = (manRe.test(text)) ? true : false
  const flag = (manRe.test(text)) 
    ? 1
    : (unitRe.test(text))
    ? 2
    : 0
  while(re.test(text)) {
    const i = text.search(re)
    const prePtnStr = text.substring(0, i)
    const unit = text[i]

    let prePtnNum = 0
    if (flag) {
      prePtnNum = convert(prePtnStr, unitRe)
    } else prePtnNum = nonUnitKansuji2number(prePtnStr, 1)

    text = text.substring(i + 1)
    result += 1 * prePtnNum * kansujiDict[unit]
  }
  if (/[〇一二三四五六七八九]+/.test(text)) {
    result += (flag) 
      ? convert(text, unitRe)
      : nonUnitKansuji2number(text)
  }
  return result
}

function convert(text, re) {
  let result = 0
  let flag = (manRe.test(text)) ? true : false
  while(re.test(text)) {
    const i = text.search(re)
    const prePtnStr = text.substring(0, i)
    const unit = text[i]

    let prePtnNum = 0
    if (flag) {
      prePtnNum = convert(prePtnStr, unitRe)
    } else prePtnNum = nonUnitKansuji2number(prePtnStr, 1)

    text = text.substring(i + 1)
    result += 1 * prePtnNum * kansujiDict[unit]
  }
  if (/[〇一二三四五六七八九]+/.test(text)) {
    result += (flag) 
      ? convert(text, unitRe)
      : nonUnitKansuji2number(text)
  }
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