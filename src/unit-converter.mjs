const log = console.log
/**
 * 出力: {
 	   all: <number><unit>,
 	   number: number,
 	   unit: unit
 	 }
 */
export default function toSI(num, unit, option = { lang: 'en' }) {
  if (!(typeof num === 'number')) return
  let result = {}
  if (['インチ', 'inch', 'in', '"'].includes(unit)) {
    result.number = 0.0254 * num
    result.unit = option.lang === 'ja' ? 'メートル' : 'm'
  } else if (['フィート', 'foot', 'feet', 'ft', "'"].includes(unit)) {
    result.number = 0.3048 * num
    result.unit = option.lang === 'ja' ? 'メートル' : 'm'
  } else if (['ヤード', 'yard', 'yd'].includes(unit)) {
    result.number = 0.9144 * num
    result.unit = option.lang === 'ja' ? 'メートル' : 'm'
  } else if (['マイル', 'mile'].includes(unit)) {
    result.number = 1609.3 * num
    result.unit = option.lang === 'ja' ? 'メートル' : 'm'
  } else result = null
  result.all = result.number + result.unit
  return result
}
