import { kansuji2Number } from './src/kansuji2number.mjs'
const log = console.log

log(kansuji2Number('三百六十万二千十一'))
log(kansuji2Number('二億三千五百十一万四千二百九十二'))
log(kansuji2Number('五億三〇五万四千二〇〇'))
log(kansuji2Number('百二'))
log(kansuji2Number('十万千一'))
log(kansuji2Number('十'))