export const kansuji2number = {
  kansujiDict: { 〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 百: 100, 千: 1000, 万: 10000 },
  unitKansujiRe: /[十百千万]/,
  kansujiRe: /[〇一二三四五六七八九]/,
  convert(text) {
   const units = text.match(/[〇一二三四五六七八九]*[十百千万]?/g)
   let result = 0
   for (const unit of units) {
     if (this.unitKansujiRe.test(unit)) {
       const index = unit.search(this.unitKansujiRe)
       const preUnit = unit.substring(0, index)
       result += 1 * this.nonUnitKansuji2number(preUnit, 1) * this.kansujiDict[unit[index]]
     } else {
       result += this.nonUnitKansuji2number(unit)
     }
   }
   return result
  },
  convert2(text) {
    let result = 0
    while (this.unitKansujiRe.test(text)) {
      const i = text.search(this.unitKansujiRe)
      const preUnit = text.substring(0, i)
      let preUnitNumber = this.nonUnitKansuji2number(preUnit)
      if (preUnitNumber === 0) { preUnitNumber = 1 }
      const unit = text.substring(i, i + 1)
      text = text.substring(i + 1)
      result += 1 * preUnitNumber * this.kansujiDict[unit]
    }
    if (/[〇一二三四五六七八九]+/.test(text)) {
      result += this.nonUnitKansuji2number(text)
    }
    return result
  },
  /** 単位の漢数字を含まない漢数字列を数値化する。identityは単位元で0か１をとる */
  nonUnitKansuji2number(text, identity = 0) {
   if (![0, 1].includes(identity)) throw new RangeError('identity must be 0 or 1.')
      const kansujis = text.split('')
      let result = 0
      kansujis.forEach( (k, i) => {
      result += (10 ** (kansujis.length - 1 - i)) * this.kansujiDict[k]
    })
    return (result === 0 && identity === 1) ? 1 : result
  }
}
