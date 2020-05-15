const { DbUrl, DbName, soItemMoiPage, soItemMoiPageAdmin } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');

module.exports = {
    LayDanhSachCarouselAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let allCarousel = await colCarousel.find({ isDelete: false }).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: allCarousel
        });
    },

    LayDanhSachCarouselTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        const page = req.params.page;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let allCarousel = await colCarousel.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allCarousel.length) / SoItemMoiPageAdmin);
        let arrCarousel = await colCarousel.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();
        res.status(200).json({
            status: 'success',
            data: arrCarousel,
            soTrang: soTrang
        });
    },

    LayCarouselTheoIDD: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let carouselID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let result = await colCarousel.find({ _id: ObjectId(carouselID) }).next();
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

    ThemCarousel: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let carouselThem = {
            idShow: 'CAROU-' + ids.generate().toUpperCase(),
            tieuDe: req.body.tieuDe,
            moTa: req.body.moTa,
            img: req.body.img,
            ngayTao: new Date(req.body.ngayTao),
            isLock: req.body.isLock,
            isDelete: req.body.isDelete
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let result = await colCarousel.insertOne(carouselThem);
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

    XoaCarousel: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let carouselID = req.body.carouselID;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let result = await colCarousel.updateOne({ _id: ObjectId(carouselID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    KhoaCarousel: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let carouselID = req.body.carouselID;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let result = await colCarousel.updateOne({ _id: ObjectId(carouselID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaCarousel: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let carouselID = req.body.carouselID;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let result = await colCarousel.updateOne({ _id: ObjectId(carouselID) }, { $set: { isLock:false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công !'
        });

    },

    SuaCarousel: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let carouselSua = {
            _id: ObjectId(req.body._id),
            tieuDe: req.body.tieuDe,
            moTa: req.body.moTa,
            img: req.body.img,
            isLock: req.body.isLock
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCarousel = db.collection('CAROUSELS');
        let result = await colCarousel.updateOne({ _id: ObjectId(carouselSua._id) },
            {
                $set:
                {
                    tieuDe: carouselSua.tieuDe,
                    moTa: carouselSua.moTa,
                    img: carouselSua.img,
                    isLock: carouselSua.isLock
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}

