import kuromojin from "kuromojin"
import kansuji2arabic from "./src/kansuji2arabic"
import toSI from "./src/unit-converter"
import toHumanReadable from "./src/human-readable-number"
import fs from "fs"
const text = fs.readFileSync('./data/input.txt', 'utf8')

kuromojin(text).then( morphemes => {
  let i = 0
  let result = ''
  morphemes.forEach( morpheme => {
    if (morpheme.pos_detail_2 === '助数詞') {
      let e = morpheme.word_position + morpheme.surface_form.length - 1
      let subtext = text.substring(i, e)
      let reKansuji = new RegExp(`[零〇一二三四五六七八九十百千万億兆]+${morpheme.surface_form}`)
      result += subtext.replace(reKansuji, (...match) => {
        const kansuji = match[0].replace(morpheme.surface_form, '')
        const arabic = kansuji2arabic(kansuji)
        // 単位換算処理
        const si = toSI(parseInt(arabic),  morpheme.surface_form, { lang: 'ja' })
        // 人間が読みやすくする
        const humanFriendly = toHumanReadable(si.number, {lang: 'ja'})
        return humanFriendly.number + humanFriendly.prefix + si.unit
      })
      i = e
    }
  })
  result += text.substring(i)
  fs.writeFileSync('./data/output.txt', result)
}).catch((err) => {

})
