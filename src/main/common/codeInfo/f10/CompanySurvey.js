/*!
 * logic compute server
 * Copyright(c) 2020-2026 tikoZ
 * MIT Licensed
 */

'use strict'

const path = require('path');
var fs = require('fs');

//const dir = '../../public/f10/easymoney/CompanySurvey/'
console.log('run bin/codeInfo/f10/CompanySurvey.js');

/**,
 * Module exports.
 * @public
 */
module.exports = function (dir) {
    this.root = path.join(__dirname, dir);
    console.log('root:', this.root)
    this.code = '';
    this.survey = {};
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
        this.survey = {};
        let fil = path.join(this.root, codeStr + '.json');
        //console.log('filename:', fil);
        fs.readFile(fil, (err, buff) => {
            if (err) {
                cb(null);
                return console.error(err);
            }
            this.survey = JSON.parse(buff);
            cb(this);
        });
    };

    // 获取上市日期
    // 返回: 'yyyymmdd'
    this.ssrq = () => {
        let xDate
        if (this.survey.fxxg.ssrq) {
            xDate = this.survey.fxxg.ssrq.replaceAll("-", "");
        }
        return xDate;
    };

    /**
     * 
     * @param {string} dateStr : 当前日期格式 yyyymmdd
     */
    // 获取年龄
    //
    // 返回: 数字
    this.age = (yyyymmdd) => {
        let dateStr = yyyymmdd.toString();
        let year = dateStr.substr(0, 4)		// 提取
        let month = dateStr.substr(4, 2)
        let date = dateStr.substr(6, 2)
        let ms1 = Date.UTC(year, month - 1, date);
        let age = 0;
        if (this.survey.fxxg.ssrq) {
            dateStr = this.survey.fxxg.ssrq.replaceAll("-", "");
            year = dateStr.substr(0, 4)		// 提取
            month = dateStr.substr(4, 2)
            date = dateStr.substr(6, 2)
            let ms2 = Date.UTC(year, month - 1, date);
            age = Math.floor((ms1 - ms2) / (1000 * 60 * 60 * 24) / 365);
        }
        return age;
    };

    // 是否ST股
    // 返回: true or false
    this.isST = () => {
        //console.log(this.survey)
        if (this.survey.jbzl.agjc.indexOf('ST') >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    



}
