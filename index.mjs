import { toNumber } from './src/kansuji2number.mjs'
const log = console.log

log(toNumber('三百六十万二千十一'))
log(toNumber('二億三千五百十一万四千二百九十二'))
log(toNumber('五億三〇五万四千二〇〇'))
log(toNumber('百二'))
log(toNumber('十万千一'))