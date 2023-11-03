const { 
    getKakaoUserBeforeLogin,
    signUp,
    signIn,
    getUser,
    refreshToken
} = require('../services/users');

module.exports = Object.freeze({
    getKakaoUserBeforeLogin : (httpRequest) => getKakaoUserBeforeLogin(httpRequest),
    signUp : (httpRequest) => signUp(httpRequest),
    getUser : (httpRequest) => getUser(httpRequest),
    refreshToken : (httpRequest) => refreshToken(httpRequest)
});