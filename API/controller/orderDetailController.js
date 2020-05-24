const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');


module.exports = {
    LayChiTietDonHangTheoIdDonHang: async function (req, res) {
        var idDonHang = req.query.idOrder;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let arrOrderDetail = await colOrderDetail.find({ idOrder: idDonHang }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail
        });
    },

    LayChiTietDonHangAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({}).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allOrderDetail
        });
    },

    LayChiTietDonHangTheoIdShop_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_ChoDuyet_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 0 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 0 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_DaDuyet_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 1 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 1 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_DangVanChuyen_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 2 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 2 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_KhachNhanHang_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 3 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 3 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_HoanThanh_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 4 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 4 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoIdShop_Huy_TheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        var page = req.params.page;
        const idShop = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let allOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 5 }).toArray();
        let soTrang = Math.ceil(parseInt(allOrderDetail.length) / SoItemMoiPageAdmin);
        let arrOrderDetail = await colOrderDetail.find({ idShop: idShop, trangThai: 5 }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrOrderDetail,
            soTrang: soTrang
        });
    },

    LayChiTietDonHangTheoID: async function (req, res) {
        const orderDetailID = req.query.idOrderDetail;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let result = await colOrderDetail.find({ idShow: orderDetailID }).next();
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

    SuaTrangThaiThanhDaDuyet: async function (req, res) {
        const orderDetailID = req.body.id;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let result = await colOrderDetail.updateOne({ idShow: orderDetailID },
            {
                $set:
                {
                    trangThai: 1
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },

    SuaChiTietDonHang: async function (req, res) {
        const orderDetailID = req.body.id;
        var chiTietSua = {
            trangThai:req.body.trangThai,
            ghiChu:req.body.ghiChu
        }
        console.log(chiTietSua)
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let result = await colOrderDetail.updateOne({ idShow: orderDetailID },
            {
                $set:
                {
                    trangThai: chiTietSua.trangThai,
                    ghiChu:chiTietSua.ghiChu
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });
    },

}