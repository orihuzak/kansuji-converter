export function kansuji2arabic(text) {
  const kansuji2number = { 零: 0, 〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9}
  const reKansuji = /[零〇一二三四五六七八九]/
  const unit2number = {
    十: 10,
    百: 100,
    千: 1000,
    万: 10000,
    億: 10 ** 8,
    兆: 10 ** 12
  }
  // アラビア数字に変換
  function kanUnit2arabic(text, unit) {
    const reUnit = new RegExp(`(?<left>\\d*)${unit}(?<right>\\d*)`)
    if(reUnit.test(text)) {
      const match = text.match(reUnit)
      const lNum = parseInt(match[1])
      const rNum = parseInt(match[2])
      const arabic = ((lNum ? lNum : 1) * unit2number[unit] + (rNum ? rNum : 0)).toString()
      text = text.substring(0, match.index) + arabic + text.substring(match.index + match[0].length)
      return kanUnit2arabic(text, unit)
    } else return text
  }
  // 文字列内の0-9までの漢数字をアラビア数字に変換
  const chars = text.split('')
  chars.forEach((char, i) => {
    if(reKansuji.test(char)) chars[i] = kansuji2number[char]
  })
  let converted = chars.join('')
  for (let unit of Object.keys(unit2number)) {
    converted = kanUnit2arabic(converted, unit)
  }
  return converted
}
