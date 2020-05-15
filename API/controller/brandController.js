const { DbUrl, DbName, soItemMoiPageAdmin } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');

module.exports = {
    LayDanhSachBrandTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let allBrand = await colBrand.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allBrand.length) / SoItemMoiPageAdmin);
        let arrBrand = await colBrand.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrBrand,
            soTrang: soTrang
        });
    },

    LayDanhSachBrandAll:async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let allBrand = await colBrand.find({ isDelete: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allBrand
        });
    },
    
    LayBrandTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let brandID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let result = await colBrand.find({ _id: ObjectId(brandID) }).next();
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

    ThemBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let brandThem = {
            idShow: 'BRAND-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            img: req.body.img,
            ngayTao: new Date(),
            isLock: false,
            isDelete: false
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let result = await colBrand.insertOne(brandThem);
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

    XoaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let brandID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let result = await colBrand.updateOne({ _id: ObjectId(brandID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    KhoaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let brandID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let result = await colBrand.updateOne({ _id: ObjectId(brandID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let brandID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let result = await colBrand.updateOne({ _id: ObjectId(brandID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công !'
        });

    },

    SuaBrand: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let brandSua = {
            _id: ObjectId(req.body._id),
            ten: req.body.ten,
            img: req.body.img,
            isLock: req.body.isLock
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('BRANDS');
        let result = await colBrand.updateOne({ _id: ObjectId(brandSua._id) },
            {
                $set:
                {
                    ten: brandSua.ten,
                    img: brandSua.img,
                    isLock: brandSua.isLock
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}