const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const bcrypt = require('bcrypt');

module.exports = {
    LayShopTheoID: async function (req, res) {
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection('USERS');
        let dataUser = await colUser.find({ 'thongTinShop.idShop': shopID, vaiTro: 1 }).next();
        client.close();
        if (dataUser === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: dataUser
            });
        }
    },

    LayUserTheoID: async function (req, res) {
        const userID = req.query.idUser;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection('USERS');
        let dataUser = await colUser.find({ _id: ObjectId(userID) }).next();
        client.close();
        if (dataUser === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: dataUser
            });
        }
    },

    ThemUser: async function (req, res) {
        let userThem = {
            ten: req.body.ten,
            email: req.body.email,
            sdt: req.body.sdt,
            cmnd: req.body.cmnd,
            ngaySinh: new Date(req.body.ngaySinh),
            gioiTinh: req.body.gioiTinh,
            taiKhoan: {
                tenTaiKhoan: req.body.taiKhoan.tenTaiKhoan,
                matKhau: req.body.taiKhoan.matKhau
            },
            thongTinShop: {
                ten: '',
                diaChi: '',
                idShop: '',
                logoShop: '',
                ngayTao: '',
                moTa: '',
                img: {
                    carousel: [],
                    banner1: '',
                    banner2
                }
            },
            vaiTro: req.body.vaiTro,
            isLock: req.body.isLock,
            isDelete: req.body.isDelete
        }
        const saltRounds = 10;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection('USERS');
        const allUser = await colUser.find({ isDelete: false }).toArray();
        let trungTaiKhoan = false;
        for (let index = 0; index < allUser.length; index++) {
            if (allUser[index].email === userThem.email) {
                trungTaiKhoan = true;
                break;
            }
        }

        let result;

        if (trungTaiKhoan === false) {
            bcrypt.hash(userThem.taiKhoan.matKhau, saltRounds, async function (err, hash) {
                userThem.taiKhoan.matKhau = hash;
                result = await colUser.insertOne(userThem);
                client.close();
                if (result.insertedCount > 0) {
                    res.status(200).json({
                        status: 'success',
                        message: 'Thêm user thành công',
                    })
                } else {
                    res.status(200).json({
                        status: 'fail',
                        message: 'Thêm user thất bại',
                    });
                }

            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Email này đã tồn tại. Vui lòng chọn email khác để đang ký tài khoản',
            })
        }
    },

    TaoShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let shopThem = {
            _id: req.body._id,
            idShop: 'SHOP-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            diaChi: req.body.diaChi,
            logoShop: req.body.logoShop,
            ngayTao: new Date(req.body.ngayTao),
            moTa: req.body.moTa
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection('USERS');
        let result = await colUser.updateOne({ _id: ObjectId(shopThem._id) },
            {
                $set:
                {
                    thongTinShop: {
                        idShop: shopThem.idShop,
                        ten: shopThem.ten,
                        diaChi: shopThem.diaChi,
                        logoShop: shopThem.logoShop,
                        ngayTao: shopThem.ngayTao,
                        moTa: shopThem.moTa
                    }
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    },

    SuaThietKeShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let thietKeShop = {
            _id: req.body._id,
            carousel: req.body.carousel,
            banner1: req.body.banner1,
            banner2: req.body.banner2
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colUser = db.collection('USERS');
        let result = await colUser.updateOne({ _id: ObjectId(thietKeShop._id) },
            {
                $set:
                {
                    'thongTinShop.img': {
                        carousel: thietKeShop.carousel,
                        banner1: thietKeShop.banner1,
                        banner2: thietKeShop.banner2
                    }
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    }
}