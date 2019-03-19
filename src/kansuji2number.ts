export const kansuji2number = {
  kansujiDict: { 〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 百: 100, 千: 1000, 万: 10000 },
  unitRe: /[十百千]/,
  kansujiRe: /[〇一二三四五六七八九]/,
  manRe: /[万億兆]/,
  convert3(text) {
    let result = 0
    // 万を探す
    while(this.manRe.test(text)){
      const i = text.search(this.manRe)
      const preMan = text.substring(0, i)
      let preManNumber = this.nonMan2number(preMan)
      const man = text[i]
      text = text.substring(i + 1)
      result += 1 * preManNumber * this.kansujiDict[man]
    }
    if (/[〇一二三四五六七八九]+/.test(text)) {
      result += this.nonMan2number(text)
    }
    return result
  },
  nonMan2number(text){
    let result = 0
    while (this.unitRe.test(text)) {
      const i = text.search(this.unitRe)
      const preUnit = text.substring(0, i)
      let preUnitNumber = this.nonUnitKansuji2number(preUnit, 1)
      const unit = text[i]
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
