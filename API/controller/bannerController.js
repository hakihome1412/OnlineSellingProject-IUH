const { DbUrl, DbName,soItemMoiPageAdmin } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');

module.exports = {
    LayDanhSachBannerAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let allBanner = await colBanner.find({ isDelete: false }).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: allBanner,
        });
    },

    LayDanhSachBannerTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const page = req.params.page;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let allBanner = await colBanner.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allBanner.length) / SoItemMoiPageAdmin);
        let arrBanner = await colBanner.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: arrBanner,
            soTrang: soTrang
        });
    },

    LayBannerTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let bannerID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let result = await colBanner.find({ _id: ObjectId(bannerID) }).next();
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

    ThemBanner: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let bannerThem = {
            idShow: 'BANNER-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            img: req.body.img,
            ngayTao: new Date(req.body.ngayTao),
            positionShow: {
                center: req.body.positionShow.center,
                right: req.body.positionShow.right,
                bottom: req.body.positionShow.bottom
            },
            isLock: req.body.isLock,
            isDelete: req.body.isDelete
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let result = await colBanner.insertOne(bannerThem);
        client.close();
        if (result.insertedCount > 0) {
            res.status(200).json({
                status: 'success',
                message: 'Thêm thành công'
            });
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Thêm thất bại!'
            })
        }
    },

    XoaBanner: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let bannerID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let result = await colBanner.updateOne({ _id: ObjectId(bannerID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    KhoaBanner: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let bannerID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let result = await colBanner.updateOne({ _id: ObjectId(bannerID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaBanner: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let bannerID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let result = await colBanner.updateOne({ _id: ObjectId(bannerID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công !'
        });

    },

    SuaBanner: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let bannerSua = {
            _id: ObjectId(req.body._id),
            ten: req.body.ten,
            img: req.body.img,
            positionShow: {
                center: req.body.positionShow.center,
                right: req.body.positionShow.right,
                bottom: req.body.positionShow.bottom
            },
            isLock: req.body.isLock
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBanner = db.collection('BANNERS');
        let result = await colBanner.updateOne({ _id: ObjectId(bannerSua._id) },
            {
                $set:
                {
                    ten: bannerSua.ten,
                    img: bannerSua.img,
                    positionShow: {
                        center: bannerSua.positionShow.center,
                        right: bannerSua.positionShow.right,
                        bottom: bannerSua.positionShow.bottom
                    },
                    isLock: bannerSua.isLock
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}