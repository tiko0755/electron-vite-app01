const Capital = require('./CapitalStockStructure');

var capital = new Capital('../../../public/f10/easymoney/CapitalStockStructure/json/');

capital.load("sz002157", (info) => {
    if (info) {
        console.log(info.rt_xsjj_total());
    }
});