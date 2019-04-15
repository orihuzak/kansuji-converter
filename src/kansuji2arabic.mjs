export function kansuji2arabic(text) {
  const kansuji2number = { 零: 0, 〇: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9}
  const unit2number = {
    十: 10,
    百: 100,
    千: 1000,
    万: 10000,
    億: 10 ** 8,
    兆: 10 ** 12
  }
  // 文字列内の0-9までの漢数字をアラビア数字に変換
  let arabic = text.replace(
    /[零〇一二三四五六七八九]/g,
    (kansuji) => kansuji2number[kansuji])
  // 小さい単位から順にアラビア数字に変換
  for (const unit of Object.keys(unit2number)) {
    const reUnit = new RegExp(`(\\d*)${unit}(\\d*)`, 'g')
    arabic = arabic.replace(reUnit, (...match) => {
      const left = (match[1] ? parseInt(match[1]) : 1)
      const right = (match[2] ? parseInt(match[2]) : 0)        
      return (left * unit2number[unit] + right).toString()
    })
  }
  return arabic
}
