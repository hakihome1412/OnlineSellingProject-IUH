const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');

module.exports = {
    LayDanhSachVoucherTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection('VOUCHERS');
        let allVoucher = await colVoucher.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allVoucher.length) / SoItemMoiPageAdmin);
        let arrVoucher = await colVoucher.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrVoucher,
            soTrang: soTrang
        });
    },

    LayDanhSachVoucherAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection('VOUCHERS');
        let allVoucher = await colVoucher.find({ isDelete: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allVoucher
        });
    },

    LayVoucherTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let voucherID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection('VOUCHERS');
        let result = await colVoucher.find({ _id: ObjectId(voucherID) }).next();
        client.close();
        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có dữ liệu',
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },

    LayVoucherTheoIDShow: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let voucherID = req.query.idShow;
        await client.connect();
        var dateNow = new Date();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colVoucher = db.collection('VOUCHERS');
        let result = await colVoucher.find({ idShow: voucherID, isLock: false }).next();
        client.close();
        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Không có Voucher này',
            })
        } else {
            if (result.ngayKetThuc < dateNow) {
                res.status(200).json({
                    status: 'failt',
                    message: 'Voucher đã hết hạn',
                    data: result
                });
            } else {
                res.status(200).json({
                    status: 'success',
                    message: 'Đã kích hoạt Voucher',
                    data: result
                });
            }

        }
    }
}