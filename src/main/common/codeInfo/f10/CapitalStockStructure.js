/*!
 * logic compute server
 * Copyright(c) 2020-2026 tikoZ
 * MIT Licensed
 */

'use strict'

const path = require('path');
var fs = require('fs');

console.log('run bin/codeInfo/f10/CapitalStockStructure.js');

/**,
 * Module exports.
 * @public
 */
module.exports = function (dir) {
    this.root = path.join(__dirname, dir);
    //console.log('root:', this.root)
    this.code = '';
    this.capitalStrct = {};
    // 从FS读回股票的数据
    // codeStr: 股票代码的str, 如"sh600123"
    // cb: 回调中返回读到的数据
    // cb(data): data:{codeStr:"股票代码",daily:按日对齐的数据数组}
    this.load = function (codeStr, cb) {
        if (codeStr === undefined) {
            cb(null);
            return;
        }
        this.code = codeStr;
        this.capitalStrct = {};
        let fil = path.join(this.root, codeStr + '.json');
        //console.log('filename:', fil);
        fs.readFile(fil, (err, buff) => {
            if (err) {
                cb(null);
                return console.error(err);
            }
            this.capitalStrct = JSON.parse(buff);
            cb(this);
        });
    };

    // 获取realtime限售解禁比例
    // 返回: 'yyyymmdd'
    this.rt_xsjj_total = () => {
        let percent = 0;
        //console.log('this.data.xsjj:', this.capitalStrct.xsjj)
        if (this.capitalStrct.xsjj && this.capitalStrct.xsjj.length > 0) {
            for (let i = 0; i < this.capitalStrct.xsjj.length; i++) {
                percent += this.capitalStrct.xsjj[i].UNLIMITED_A_SHARES_RATIO
            }
        }
        return percent;
    };


    



}
