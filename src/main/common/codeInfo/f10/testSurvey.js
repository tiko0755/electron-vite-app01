const CompanySurvey = require('./CompanySurvey');

var survey = new CompanySurvey('../../../public/f10/easymoney/companySurvey/json/');

survey.load("sz000611", (info) => {
    if (info) {
        //console.log(info)
        console.log('birthday:', survey.ssrq());
        console.log('age:', survey.age(20220607));
        console.log('isSt:', survey.isST());
    }
});