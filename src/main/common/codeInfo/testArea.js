const CODEINFO = require('./loadCode');

var codeInfo = new CODEINFO('../../public/codeDB/');

codeInfo.load("sh600789", (info) => {
    if (info === undefined) {
        console.log('load fail')
    }
    else {
        let lst = info.area(info.def.T5_ZCLOSE, info.def.T30_ZCLOSE);
        console.log(lst)
        for (let i = 0; i < lst.length; i++) {
            console.log(`${lst[i][0]}`);
        }
    }
});