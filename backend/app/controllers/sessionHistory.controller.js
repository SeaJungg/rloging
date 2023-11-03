const { postSession } = require('use-cases/sessions');
const { postSessionHistory } = require('use-cases/sessionHistories');

module.exports = Object.freeze({
  getSessionHistoryBySessionId: (httpRequest) => getSessionHistoryBySessionId(httpRequest)
});