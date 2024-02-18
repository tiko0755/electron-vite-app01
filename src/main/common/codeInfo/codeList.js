const CODEINFO = require('./loadCode.js')
const DEF = require('./def.js')
let codeLoader = null
/**,
 * Module exports.
 * @public
 */

function loop_load(index, codeLst, date_start, date_end, rslt, cb) {
  if (index >= codeLst.length) {
    cb(rslt)
  } else {
    codeLoader.load(codeLst[index], (codeObj) => {
      const xObj = {}
      xObj.codestr = codeLst[index]
      xObj.data = []
      for (let i = 0; i < codeObj.daily.length; i++) {
        if (codeObj.daily[i][DEF.DATE] >= date_start && codeObj.daily[i][DEF.DATE] <= date_end) {
          if (codeObj.daily[i][DEF.DATE] > date_end) {
            break
          }
          xObj.data.push(codeObj.daily[i])
        }
      }
      if (rslt === undefined) {
        rslt = []
      }
      rslt.push(xObj)
      loop_load(index + 1, codeLst, date_start, date_end, rslt, cb)
    })
  }
}

module.exports = {
  init: function (dir) {
    codeLoader = new CODEINFO(dir)
  },
  load: function (codes, dateStart, dateEnd, cb) {
    let rtn
    loop_load(0, codes, dateStart, dateEnd, rtn, (all_codes_info) => {
      if (all_codes_info) {
        console.log(all_codes_info)
        cb(all_codes_info)
      } else {
        console.log('err@codesLoop.load:0000')
        cb()
      }
    })
  },

  // ��FS���ع�Ʊ������
  // codeStr: ��Ʊ�����str, ��"sh600123"
  // cb: �ص��з��ض���������
  // cb(data): data:{codeStr:"��Ʊ����",daily:���ն������������}
  zeroClose: function (codes, dateStart, dateEnd, cb) {
    const rtn = []
    this.load(codes, dateStart, dateEnd, (lst) => {
      if (lst === undefined) {
        console.log('err@codesLoop.load:0000')
        cb()
      } else {
        for (let i = 0; i < lst.length; i++) {
          const rec = {}
          rec.codestr = lst[i].codestr
          rec.data = []
          for (let j = 0; j < lst[i].data.length; j++) {
            const recX = []
            recX.push(lst[i].data[j][DEF.DATE])
            recX.push(lst[i].data[j][DEF.T5_ZCLOSE])
            recX.push(lst[i].data[j][DEF.T10_ZCLOSE])
            recX.push(lst[i].data[j][DEF.T20_ZCLOSE])
            recX.push(lst[i].data[j][DEF.T30_ZCLOSE])
            recX.push(lst[i].data[j][DEF.T40_ZCLOSE])
            recX.push(lst[i].data[j][DEF.T60_ZCLOSE])
            rec.data.push(recX)
          }
          rtn.push(rec)
        }
        cb(rtn)
      }
    })
  },

  // ��FS���ع�Ʊ�����һ�������
  // codeStr: ��Ʊ�����str, ��"sh600123"
  // cb: �ص��з��ض���������
  // cb(data): data:{codeStr:"��Ʊ����",daily:���ն������������}
  lastRec: function (codes, cb) {
    const rtn = {
      def: DEF,
      lst: []
    }
    this.load(codes, 0, 39999999, (lst) => {
      if (lst === undefined) {
        console.log('err@codesLoop.lastRec:0000')
        cb()
      } else {
        for (let i = 0; i < lst.length; i++) {
          const rec = {}
          rec.codestr = lst[i].codestr
          rec.lastrec = lst[i].data[lst[i].data.length - 1]
          rtn.lst.push(rec)
        }
        // console.log(`lastRec:${rtn}`)
        cb(rtn)
      }
    })
  }
}
