const codesOps = require('./codeList')

const codeStrLst = ['sh600007', 'sh600123']
codesOps.init('F:\\build\\public\\codeDB\\')
codesOps.lastRec(codeStrLst, (info) => {
  console.log('success: ', JSON.stringify(info))
})
