"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTime = void 0;
var moment = require("moment");
function getTime() {
    var time = moment().format('YYYYMMDD');
    return time;
}
exports.getTime = getTime;
//# sourceMappingURL=moment.js.map