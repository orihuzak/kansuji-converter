module.exports.kansuji2number = {
  kansujiDict: { 〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 百: 100, 千: 1000, 万: 10000 },
  convert(text) {
   const units = text.match(/[〇一二三四五六七八九]*[十百千万]?/g)
   const kanUnitsRe = /[十百千万]/
   let result = 0
   for (const unit of units) {
     if (kanUnitsRe.test(unit)) {
       const index = unit.search(kanUnitsRe)
       const preUnit = unit.substring(0, index)
       result += 1 * this.nonUnitKansuji2number(preUnit, 1) * kansujiDict[unit[index]]
     } else {
       result += this.nonUnitKansuji2number(unit)
     }
   }
   return result
  },
  nonUnitKansuji2number(text, minimum = 0) {
   if (![0, 1].includes(minimum)) throw new RangeError('minimum must be 0 or 1.')
      const kansujis = text.split('')
      let result = 0
      kansujis.forEach( (k, i) => {
      result += (10 ** (kansujis.length - 1 - i)) * kansujiDict[k]
    })
    return (result === 0 && minimum === 1) ? 1 : result
  }
}
