import kuromojin from "kuromojin"
import kansuji2arabic from "./kansuji2arabic"
import toSI from "./unit-converter"
import toHumanReadable from "./human-readable-number"

const log = console.log
const text = '二千フィートの巨人が一万二千三百四十五ヤードを歩いてきた'

kuromojin(text).then((morphemes) => {
  let i = 0
  let result = ''
  morphemes.forEach( morpheme => {
    if (morpheme.pos_detail_2 === '助数詞') {
      let e = morpheme.word_position + morpheme.surface_form.length - 1
      let subtext = text.substring(i, e)
      let reKansuji = new RegExp(`[零〇一二三四五六七八九十百千万億兆]+${morpheme.surface_form}`)
      if (reKansuji.test(subtext)) {
        const match = subtext.match(reKansuji)
        const kansuji = match[0].replace(morpheme.surface_form, '')
        const arabic = kansuji2arabic(kansuji)
        // 単位換算処理
        const convert = toSI(parseInt(arabic),  morpheme.surface_form, { lang: 'ja' })
        // 人間が読みやすくする
        const humanFriendly = toHumanReadable(convert.number, {lang: 'ja'})
        subtext = subtext.replace(match[0], humanFriendly.number + humanFriendly.prefix + convert.unit)
      }
      result += subtext
      i = e
    }
  })
  result += text.substring(i)
  log(result)
}).catch((err) => {

})
