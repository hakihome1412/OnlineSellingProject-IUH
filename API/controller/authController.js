const { DbUrl, DbName, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    KiemTraAccount: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        var tenTaiKhoan = req.body.tenTaiKhoan;
        var matKhau = req.body.matKhau;

        await client.connect(async function (error, client) {
            assert.equal(null, error);
            console.log("Connected correctly to server");
            const col = client.db(DbName).collection("USERS");
            var resultUser = await col.find({ "taiKhoan.tenTaiKhoan": tenTaiKhoan }).next();
            if (resultUser === null) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Tài khoản không tồn tại'
                });
            } else {
                if (resultUser.isLock === true) {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Tài khoản này đã bị khóa'
                    });
                } else {
                    bcrypt.compare(matKhau, resultUser.taiKhoan.matKhau, function (err, result) {
                        if (result == true) {
                            var secretKey = process.env.SECRET_KEY;
                            var payload = {
                                userID: resultUser._id,
                                vaiTro: resultUser.vaiTro
                            };

                            //7 ngày hết hạn token
                            var token = jwt.sign({ payload }, secretKey, { expiresIn: 60 * 1220 * 7 });
                            console.log(JSON.stringify(payload));
                            res.status(200).json({
                                status: 'success',
                                message: 'Đăng nhập thành công !',
                                userID: resultUser._id,
                                tenTaiKhoan: resultUser.taiKhoan.tenTaiKhoan,
                                vaiTro: resultUser.vaiTro,
                                token: token
                            });
                        } else {
                            res.status(200).json({
                                status: "fail",
                                message: "Tài khoản hoặc mật khẩu không chính xác !",
                            });
                        }
                    })
                }
            }
        });
    },

    KiemTraTokenAdmin: async function (req, res, next) {
        var token = req.header('token');
        let resultToken = await jwt.verify(token, process.env.SECRET_KEY);
        if(resultToken.payload.vaiTro === 0){
            res.status(200).json({
                status: "success",
                message: 'Token hợp lệ',
            });
        }else{
            res.status(200).json({
                status: "fail",
                message: 'Token không hợp lệ !',
            });
        }
    },

    KiemTraTokenChuShop: function (req, res, next) {
        var token = req.header('token');
        jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
            // req.user = payload;
            // res.json(payload);
            if (payload.payload.vaiTro === 1) {
                res.status(200).json({
                    status: "success",
                    message: 'Token hợp lệ',
                });
                next();
            } else {
                res.status(200).json({
                    status: "fail",
                    message: 'Token không hợp lệ !',
                });
            }
        });
    },

    KiemTraTokenNormal: function (req, res, next) {
        var token = req.header('token');
        jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
            // req.user = payload;
            // res.json(payload);
            if (payload.payload.vaiTro === 2) {
                next();
            } else {
                res.status(200).json({
                    status: "fail",
                    message: 'Token không hợp lệ !',
                });
            }
        });
    },

}