const { 
    postSession, 
    getSessionDetail, 
    getSessionsByAttribute, 
    applySession, 
    recordAttendance, 
    applyDailySupporter 
} = require('../services/sessions');

module.exports = Object.freeze({
    postSession: (httpRequest) => postSession(httpRequest),
    getSessionDetail: (httpRequest) => getSessionDetail(httpRequest),
    getSessionsByAttribute: (httpRequest) => getSessionsByAttribute(httpRequest),
    applySession: (httpRequest) => applySession(httpRequest),
    recordAttendance: (httpRequest) => recordAttendance(httpRequest),
    applyDailySupporter: (httpRequest) => applyDailySupporter(httpRequest),
});