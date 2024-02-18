'use strict'

const CODEINFO = require('./loadCode')
const DEF = require('./def.js')

const codeInfo = new CODEINFO('F:\\build\\public\\codeDB\\')

codeInfo.load('sh600007', (info) => {
  // console.log(info.root)
  const date = 20220424

  //let rec = info.getRec(date, -1);
  //console.log(`${date}[-1]:`, rec)

  //let rec2 = info.getRec(date, 0);
  //console.log(`${date}[0]:`, rec2)

  //let rec3 = info.getRec(date, 1);
  //console.log(`${date}[1]:`, rec3)

  let indx = info.indexOfDate(date, -3)
  let rec = info.daily[indx]
  if (indx >= 0) {
    console.log(`[-3] ${date}=>${rec[DEF.DATE]}:${indx}`)
  } else {
    console.log('not found')
  }

  indx = info.indexOfDate(date, 0)
  rec = info.daily[indx]
  if (indx >= 0) {
    console.log(`[0] ${date}=>${rec[DEF.DATE]}:${indx}`)
  } else {
    console.log('not found')
  }

  indx = info.indexOfDate(date, 1)
  rec = info.daily[indx]
  if (indx >= 0) {
    console.log(`[1] ${date}=>${rec[DEF.DATE]}:${indx}`)
  } else {
    console.log('not found')
  }

  //console.log('refdate:', info.refDate(20180529, -1))
})
