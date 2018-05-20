const random = require('string-random');
module.exports = {
    create3rdSessionId() {
        let timeStamp = new Date().getTime();
        let _3rdSessionId = timeStamp + random(8);
        console.log(_3rdSessionId);
        return _3rdSessionId;
    },
    
    resultWrapper(resultCode, msg, value) {
        return {
            resultCode: {
                code: resultCode,
                msg: msg
            },
            value: value ? value : null
        };
    }
}