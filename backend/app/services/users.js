require("dotenv").config();
const db = require("../database/models/index");
const User = db.User;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const qs = require("qs");
const axios = require('axios');

async function call(method, uri, param, header) {
    console.log(`call ${uri}`)
    try {
        let rtn = await axios({
            method: method,
            url: uri,
            headers: header,
            data: param
        })
        return rtn.data;
    } catch (err) {
        console.error(err)
        return err;
    }
}



async function getUser(httpRequest) {
    const user = await User.findByPk(httpRequest.user_id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

function generateAccessTokenByUserCredentials(user_id) {
    return jwt.sign({ user_id: user_id, flag: 'USER'}, process.env.ACCESS_TOKEN_SECRET)
    //return jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function generateAccessTokenByRefreshToken(user_id) {
    return jwt.sign({ user_id: user_id, flag: 'SYSTEM'}, process.env.ACCESS_TOKEN_SECRET)
    //return jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

function generateRefreshToken(user_id) {
    return jwt.sign({ user_id: user_id }, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = Object.freeze({
    getUser,
    refreshToken: async (httpRequest) => {
        try {
            const refreshToken = httpRequest.body.refresh_token
            if (refreshToken == null) throw new Error(401)
      
            const user = await new Promise((resolve, reject) => {
              jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) reject(new Error(403))
                else resolve(user)
              })
            })

            const accessToken = generateAccessTokenByRefreshToken(user.user_id)
      
            return { access_token: accessToken }
          } catch (e) {
            console.error(e)
            throw new Error(e)
          }
    },
    getKakaoUserBeforeLogin: async (httpRequest) => {
        let code = httpRequest.query.code;
        console.log(code)
        if (!code) {
            throw new Error('invalid requesst');
        }
        try {
            console.log(`get token start`)
            process.env.KAKAO_CLIENT_ID = "282afdc3c17f8dd495cd16bc34138b34"
            process.env.KAKAO_REDIRECT_URL = "http://localhost:3000" //front uri
            const tokenData = await call(
                'POST',
                'https://kauth.kakao.com/oauth/token',
                qs.stringify({
                    "grant_type": 'authorization_code',
                    "client_id": process.env.KAKAO_CLIENT_ID,
                    "redirect_uri": process.env.KAKAO_REDIRECT_URL,
                    "code": code
                }),
                { 'content-type': 'application/x-www-form-urlencoded' }
            );
            
            console.log(`get token end ${tokenData.access_token}`)

            const userData = await call(
                'GET',
                'https://kapi.kakao.com/v2/user/me',
                null,
                { 'Authorization': `Bearer ${tokenData.access_token}` }
            );

            console.log(tokenData.access_token)
            console.log('%j', userData)
            let personalData = {
                oauth_id: userData.id,
                "email": userData.kakao_account.email,
                "age_range": userData.kakao_account.age_range,
                "gender": userData.kakao_account.gender
            };

            httpRequest.session.kakao = personalData;
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ email: userData.kakao_account.email }, { oauth_id: userData.id }],
                },
            });
            if (!existingUser) {
                return { exists: false, signup_data: personalData };
            } else {
                const accessToken = generateAccessToken(existingUser.user_id);
                const refreshToken = generateRefreshToken(existingUser.user_id);

                // Update refresh_token
                const updateUser = await User.update(
                    { refresh_token: refreshToken },
                    { where: { user_id: existingUser.user_id } }
                );

                // Return the token
                return {
                    user_id: existingUser.user_id,
                    user_name: existingUser.user_name,
                    access_token: accessToken,
                    refresh_token: refreshToken
                };
            }
        } catch (e) {
            throw new Error(e);
        }
    },
    signUp: async (httpRequest) => {
        const { user_name, phone } = httpRequest.body;
        const { oauth_id, email, age_range, gender } = httpRequest.body.signup_data;
        try {


            // Create a new user
            const newUser = await User.create({
                user_name,
                phone,
                age_range,
                gender,
                email,
                oauth_id,
                oauth_provider: 'kakao'
            });
            // Generate a JWT token

            const accessToken = generateAccessTokenByUserCredentials(newUser.user_id);
            const refreshToken = generateRefreshToken(newUser.user_id);


            // Update refresh_token
            const updateUser = await User.update(
                { refresh_token: refreshToken },
                { where: { user_id: newUser.user_id } }
            );
            // Return the token
            return {
                user_id: newUser.user_id,
                user_name: newUser.user_name,
                access_token: accessToken,
                refresh_token: refreshToken
            };
        } catch (e) {
            throw new Error(e);
        }
    }
})
