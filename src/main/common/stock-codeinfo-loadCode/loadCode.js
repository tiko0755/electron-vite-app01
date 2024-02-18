/*!
 * logic compute server
 * Copyright(c) 2020-2026 tikoZ
 * MIT Licensed
 */

'use strict'

const path = require('path')
const DEF = require('./def.js')

const fs = require('fs')

console.log('run bin/codeInfo/loadCode.js')

function dailyDecode(buff) {
  let offset = 0
  const len = buff.readInt32LE(offset)
  offset += 4

  const jobj = []
  for (let i = 0; i < len; i++) {
    const rec = []

    rec.push(buff.readUInt32LE(offset))
    offset += 4 //bw.Write(DList[i].Date);          // [0] date
    //// TdxDayRec
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(DList[i].DayRec.open);     // [1]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(DList[i].DayRec.close);    // [2]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(DList[i].DayRec.high);     // [3]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(DList[i].DayRec.low);      // [4]
    rec.push(Math.round((buff.readFloatLE(offset) / 100000000) * 100) / 100)
    offset += 4 //bw.Write(DList[i].DayRec.amount);   // [5]
    rec.push(buff.readUInt32LE(offset))
    offset += 4 //bw.Write(DList[i].DayRec.vol);      // [6]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(DList[i].DayRec.exch);     // [7]
    //// market
    rec.push(buff.readInt32LE(offset))
    offset += 4 //bw.Write(DList[i].ltsjdf);          // [8]
    rec.push(buff.readInt32LE(offset))
    offset += 4 //bw.Write(DList[i].cjjedf);          // [9]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(DList[i].ltsj);          // [10]

    //ftRec = DList[i].FixedTerm5;
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Open);               // [11]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Close);              // [12]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.High);               // [13]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Low);                // [14]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Amount);             // [15]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.VolWHand);           // [16]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Exch);               // [17]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.ZeroClose);          // [18]

    //ftRec = DList[i].FixedTerm10;
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Open);               // [19]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Close);              // [20]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.High);               // [21]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Low);                // [22]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Amount);             // [23]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.VolWHand);           // [24]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Exch);               // [25]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.ZeroClose);          // [26]

    //ftRec = DList[i].FixedTerm20;
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Open);               // [27]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Close);              // [28]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.High);               // [29]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Low);                // [30]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Amount);             // [31]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.VolWHand);           // [32]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Exch);               // [33]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.ZeroClose);          // [34]

    //ftRec = DList[i].FixedTerm30;
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Open);               // [35]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Close);              // [36]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.High);               // [37]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Low);                // [38]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Amount);             // [39]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.VolWHand);           // [40]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Exch);               // [41]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.ZeroClose);          // [42]

    //ftRec = DList[i].FixedTerm40;
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Open);               // [43]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Close);              // [44]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.High);               // [45]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Low);                // [46]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Amount);             // [47]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.VolWHand);           // [48]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Exch);               // [49]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.ZeroClose);          // [50]

    //ftRec = DList[i].FixedTerm60;
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Open);               // [51]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Close);              // [52]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.High);               // [53]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Low);                // [54]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Amount);             // [55]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.VolWHand);           // [56]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.Exch);               // [57]
    rec.push(Math.round(buff.readFloatLE(offset) * 100) / 100)
    offset += 4 //bw.Write(ftRec.ZeroClose);          // [58]

    jobj.push(rec)
  }
  //console.log('jobj:', jobj);
  return jobj
}

/**,
 * Module exports.
 * @public
 */
module.exports = function (dir) {
  this.root = dir
  console.log('root:', this.root)
  this.code = ''
  this.daily = []
  this.def = DEF
  // 从FS读回股票的数据
  // codeStr: 股票代码的str, 如"sh600123"
  // cb: 回调中返回读到的数据
  // cb(data): data:{codeStr:"股票代码",daily:按日对齐的数据数组}
  this.load = function (codeStr, cb) {
    if (codeStr === undefined) {
      cb(null)
      return
    }
    this.code = codeStr
    this.daily = []
    const fil = path.join(this.root, codeStr + '.bin')
    //console.log('filename:', fil);
    fs.readFile(fil, (err, buff) => {
      if (err) {
        cb(null)
        return console.error(err)
      }
      this.daily = dailyDecode(buff)
      cb(this)
    })
  }

  // 获取指定日期的序号
  // date: 要索引的日期
  // cond: [0]完全相同; [N]向未来查找未来第N个 [-N]向以前查找第N个
  // 返回负数表示没有找到
  this.indexOfDate = (date, cond) => {
    if (date === undefined || this.daily === undefined || this.daily.length === 0) {
      return -1
    }
    if (date < this.daily[0][DEF.DATE] || date > this.daily[this.daily.length - 1][DEF.DATE]) {
      return -2
    }
    // 先使用拆半查换法, 查找到正好是date或date的前一个有效日期
    let lowerIndx = 0
    let upperIndx = this.daily.length - 1
    let curIndx = Math.floor(upperIndx / 2)
    // eslint-disable-next-line no-constant-condition
    while (true) {
      // console.log(`cur:${curIndx}  lower:${lowerIndx}  upper:${upperIndx}`)
      if (date === this.daily[curIndx][DEF.DATE]) {
        break
      } else if (date > this.daily[curIndx][DEF.DATE]) {
        lowerIndx = curIndx
      } else if (date < this.daily[curIndx][DEF.DATE]) {
        upperIndx = curIndx
      }
      if (upperIndx - lowerIndx < 10) {
        curIndx = -99
        for (let i = upperIndx; i >= lowerIndx; i--) {
          if (this.daily[i][DEF.DATE] <= date) {
            curIndx = i
            break
          }
        }
        break
      }
      curIndx = lowerIndx + Math.floor((upperIndx - lowerIndx) / 2)
    }
    // console.log(this.daily[curIndx][DEF.DATE])
    if (curIndx >= 0 && cond !== 0) {
      curIndx += cond
    }
    return curIndx
  }

  //// 下面这段是折半查找法, 尚有问题
  //this.indexOfDate = (date, cond) => {
  //    if (date === undefined || this.daily === undefined || this.daily.length === 0) {
  //        return -1;
  //    }
  //    // 使用拆半查换法
  //    let lowerIndx = 0;
  //    let upperIndx = this.daily.length - 1;
  //    let curIndx = Math.floor(upperIndx / 2);
  //    while (true) {
  //        if (date === this.daily[lowerIndx][DEF.DATE]) {
  //            if (cond > 0) {

  //            } else if (cond < 0) {

  //            } else {
  //                return lowerIndx;
  //            }
  //        }
  //        else if (date === this.daily[curIndx][DEF.DATE]) {
  //            if (cond > 0) {

  //            } else if (cond < 0) {

  //            } else {
  //                return lowerIndx;
  //            }
  //        }
  //        else if (date === this.daily[upperIndx][DEF.DATE]) {
  //            if (cond > 0) {

  //            } else if (cond < 0) {

  //            } else {
  //                return lowerIndx;
  //            }
  //        }
  //        else if (date > this.daily[curIndx][DEF.DATE]) {
  //            if (lowerIndx === curIndx) {
  //                // console.log('end with lowerindex:', lowerIndx)
  //                if (cond > 0) {
  //                    for (let i = lowerIndx; i < this.daily.length; i++) {
  //                        if (this.daily[i][DEF.DATE] >= date) {
  //                            return i;
  //                        }
  //                    }
  //                }
  //                else if (cond < 0) {
  //                    for (let i = lowerIndx; i >= 0; i--) {
  //                        if (this.daily[i][DEF.DATE] <= date) {
  //                            return i;
  //                        }
  //                    }
  //                }
  //                return -2;
  //            }
  //            lowerIndx = curIndx;
  //        }
  //        else if (date < this.daily[curIndx][DEF.DATE]) {
  //            if (upperIndx === curIndx) {
  //                // console.log('end with upperindex:', upperIndx)
  //                if (cond > 0) {
  //                    for (let i = upperIndx; i < this.daily.length; i++) {
  //                        if (this.daily[i][DEF.DATE] >= date) {
  //                            return i;
  //                        }
  //                    }
  //                }
  //                else if (cond < 0) {
  //                    for (let i = upperIndx; i >= 0; i--) {
  //                        if (this.daily[i][DEF.DATE] <= date) {
  //                            return i;
  //                        }
  //                    }
  //                }
  //                return -3;
  //            }
  //            upperIndx = curIndx;
  //        }
  //        curIndx = lowerIndx + Math.floor((upperIndx - lowerIndx) / 2);
  //    }
  //    return -99;
  //};

  // 获取指定日期的收盘价
  // date: 要索引的日期
  // cond: [0]完全相同; [1]向未来查找下一个 [-1]向以前查找下一个
  // 返回undefined表示没有找到符合的
  this.get_rec = (date, cond) => {
    const indx = this.indexOfDate(date, cond)
    if (indx < 0) {
      return undefined
    }
    return this.daily[indx]
  }

  // 获取指定日期的收盘价
  // date: 要索引的日期
  // cond: [0]完全相同; [1]向未来查找下一个 [-1]向以前查找下一个
  // 返回undefined表示没有找到符合的
  ;(this.getRec = (date, cond) => {
    const REC = this.get_rec(date, cond)
    if (REC === undefined) {
      return undefined
    } else {
      const rec = {
        DATE: REC[DEF.DATE],
        // TdxDayRec
        OPEN: REC[DEF.OPEN],
        CLOSE: REC[DEF.CLOSE],
        HIGH: REC[DEF.HIGH],
        LOW: REC[DEF.LOW],
        AMOUNT: REC[DEF.AMOUNT],
        VOL_HAND: REC[DEF.VOL_HAND],
        EXCH: REC[DEF.EXCH],
        // market
        LTSJDF: REC[DEF.LTSJDF],
        CJJEDF: REC[DEF.CJJEDF],
        LTSJ: REC[DEF.LTSJ],
        //5日周期
        T5_OPEN: REC[DEF.T5_OPEN],
        T5_CLOSE: REC[DEF.T5_CLOSE],
        T5_HIGH: REC[DEF.T5_HIGH],
        T5_LOW: REC[DEF.T5_LOW],
        T5_AMOUNT: REC[DEF.T5_AMOUNT],
        T5_VOL: REC[DEF.T5_AMOUNT],
        T5_EXCH: REC[DEF.T5_EXCH],
        T5_ZCLOSE: REC[DEF.T5_ZCLOSE],
        //10日周期
        T10_OPEN: REC[DEF.T10_OPEN],
        T10_CLOSE: REC[DEF.T10_CLOSE],
        T10_HIGH: REC[DEF.T10_HIGH],
        T10_LOW: REC[DEF.T10_LOW],
        T10_AMOUNT: REC[DEF.T10_AMOUNT],
        T10_VOL: REC[DEF.T10_VOL],
        T10_EXCH: REC[DEF.T10_EXCH],
        T10_ZCLOSE: REC[DEF.T10_ZCLOSE],
        //20日周期
        T20_OPEN: REC[DEF.T20_OPEN],
        T20_CLOSE: REC[DEF.T20_CLOSE],
        T20_HIGH: REC[DEF.T20_HIGH],
        T20_LOW: REC[DEF.T20_LOW],
        T20_AMOUNT: REC[DEF.T20_AMOUNT],
        T20_VOL: REC[DEF.T20_VOL],
        T20_EXCH: REC[DEF.T20_EXCH],
        T20_ZCLOSE: REC[DEF.T20_ZCLOSE],
        //30日周期
        T30_OPEN: REC[DEF.T30_OPEN],
        T30_CLOSE: REC[DEF.T30_CLOSE],
        T30_HIGH: REC[DEF.T30_HIGH],
        T30_LOW: REC[DEF.T30_LOW],
        T30_AMOUNT: REC[DEF.T30_AMOUNT],
        T30_VOL: REC[DEF.T30_VOL],
        T30_EXCH: REC[DEF.T30_EXCH],
        T30_ZCLOSE: REC[DEF.T30_ZCLOSE],
        //40日周期
        T40_OPEN: REC[DEF.T40_OPEN],
        T40_CLOSE: REC[DEF.T40_CLOSE],
        T40_HIGH: REC[DEF.T40_HIGH],
        T40_LOW: REC[DEF.T40_LOW],
        T40_AMOUNT: REC[DEF.T40_AMOUNT],
        T40_VOL: REC[DEF.T40_VOL],
        T40_EXCH: REC[DEF.T40_EXCH],
        T40_ZCLOSE: REC[DEF.T40_ZCLOSE],
        //60日周期
        T60_OPEN: REC[DEF.T60_OPEN],
        T60_CLOSE: REC[DEF.T60_CLOSE],
        T60_HIGH: REC[DEF.T60_HIGH],
        T60_LOW: REC[DEF.T60_LOW],
        T60_AMOUNT: REC[DEF.T60_AMOUNT],
        T60_VOL: REC[DEF.T60_VOL],
        T60_EXCH: REC[DEF.T60_EXCH],
        T60_ZCLOSE: REC[DEF.T60_ZCLOSE]
      }
      return rec
    }
  }),
    // next day
    (this.refDate = (curDate, refTo) => {
      const dStr = curDate.toString() // 转换为字符串，方便提取
      const year = dStr.substr(0, 4) // 提取
      const month = dStr.substr(4, 2)
      const date = dStr.substr(6, 2)
      const d = new Date(year, month - 1, date) // 构建一个Date对象。 注意构建参数中的month使用的是序号，0表示1月， 11表示12月
      // 计算出第二天是什么日期
      let ms = Date.parse(d) // Date对象是js自带的对象，不需要定义。 分析出指定日期d所对应的毫秒数, 得出的结果是一个数字
      ms += refTo * 24 * 60 * 60 * 1000 // 增加1天的毫秒数
      const nxtD = new Date(ms) // 使用毫秒数构建日期对象
      const xx = nxtD.getFullYear() * 10000 + (nxtD.getMonth() + 1) * 100 + nxtD.getDate()
      return xx
    }),
    // 计算两条线闭合面积，格式为[[面积(涨跌%的积分),开始日期,结束日期,行情周期天数],[]]
    (this.area = (fastT, lowT) => {
      const serie = []
      let i
      for (i = 0; i < this.daily.length; ) {
        // 面积。fastT在lowT的上方，正数；fastT在lowT的下方,负数
        let diff = (this.daily[i][fastT] - this.daily[i][lowT]) / this.daily[i][lowT]
        if (diff === 0) {
          i++
          continue
        }
        // new a node
        const rec = []
        rec[0] = diff
        rec[1] = this.daily[i][DEF.DATE]
        rec[2] = this.daily[i][DEF.DATE]
        rec[3] = 1
        if (diff > 0) {
          for (i = i + 1; i < this.daily.length; i++) {
            diff = (this.daily[i][fastT] - this.daily[i][lowT]) / this.daily[i][lowT]
            if (diff >= 0) {
              rec[0] += diff
              rec[2] = this.daily[i][DEF.DATE]
              rec[3]++
              if (i === this.daily.length - 1) {
                rec[0] = Math.round(rec[0] * 100) / 100
                serie.push(rec)
                break
              }
            } else {
              rec[0] = Math.round(rec[0] * 100) / 100
              serie.push(rec)
              break
            }
          }
        } else if (diff < 0) {
          for (i = i + 1; i < this.daily.length; i++) {
            diff = (this.daily[i][fastT] - this.daily[i][lowT]) / this.daily[i][lowT]
            if (diff <= 0) {
              rec[0] += diff
              rec[2] = this.daily[i][DEF.DATE]
              rec[3]++
              if (i === this.daily.length - 1) {
                rec[0] = Math.round(rec[0] * 100) / 100
                serie.push(rec)
                break
              }
            } else {
              rec[0] = Math.round(rec[0] * 100) / 100
              serie.push(rec)
              break
            }
          }
        }
      }
      return serie
    })
}
