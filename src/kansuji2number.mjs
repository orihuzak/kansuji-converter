const kansujiDict = { 〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 百: 100, 千: 1000, 万: 10000 },
      manRe = /[万億兆]/,
      unitRe =  /[十百千]/,
      kansujiRe = /[〇一二三四五六七八九]/

function toNumber(text){
  return this.convert4(text, this.manRe, this.nonMan2number)
}

function convert4(text, re, func) {
  let result = 0
  while(re.test(text)) {
    const i = text.search(re)
    const prePtnStr = text.substring(0, i)
    console.log(prePtnStr)
    let prePtnNum = func(prePtnStr)
    const kansuji = text[i]
    text = text.substring(i + 1)
    //console.log(text)
    result += 1 * prePtnNum * kansujiDict[kansuji]
  }
  if (/[〇一二三四五六七八九]+/.test(text)) {
    result += func(text)
  }
  return result
}

function convert3(text) {
  let result = 0
  // 万を探す
  while(manRe.test(text)){
    const i = text.search(manRe)
    const preMan = text.substring(0, i)
    let preManNumber = nonMan2number(preMan)
    const man = text[i]
    text = text.substring(i + 1)
    result += 1 * preManNumber * kansujiDict[man]
  }
  if (/[〇一二三四五六七八九]+/.test(text)) {
    result += nonMan2number(text)
  }
  return result
}

function nonMan2number(text) {
  let result = 0
  console.log(text)
  while (unitRe.test(text)) {
    const i = text.search(unitRe)
    const preUnit = text.substring(0, i)
    let preUnitNumber = nonUnitKansuji2number(preUnit, 1)
    const unit = text[i]
    text = text.substring(i + 1)
    result += 1 * preUnitNumber * kansujiDict[unit]
  }
  if (/[〇一二三四五六七八九]+/.test(text)) {
    result += nonUnitKansuji2number(text)
  }
  return result
}

/** 単位の漢数字を含まない漢数字列を数値化する。identityは単位元で0か１をとる */
function nonUnitKansuji2number(text, identity = 0) {
  if (![0, 1].includes(identity)) throw new RangeError('identity must be 0 or 1.')
    const kansujis = text.split('')
    let result = 0
    kansujis.forEach( (k, i) => {
    result += (10 ** (kansujis.length - 1 - i)) * this.kansujiDict[k]
  })
  return (result === 0 && identity === 1) ? 1 : result
}