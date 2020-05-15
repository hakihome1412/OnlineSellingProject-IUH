const { DbUrl, DbName, soItemMoiPageAdmin } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');

module.exports = {
    LayDanhSachCategoryTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let allCategory = await colCategory.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allCategory.length) / SoItemMoiPageAdmin);
        let arrCategory = await colCategory.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrCategory,
            soTrang: soTrang
        });
    },

    LayDanhSachCategoryAll:async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let allCategory = await colCategory.find({ isDelete: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allCategory
        });
    },
    
    LayCategoryTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let result = await colCategory.find({ _id: ObjectId(categoryID) }).next();
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

    ThemCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categoryThem = {
            idShow: 'CATE-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            icon:req.body.icon,
            img: req.body.img,
            ngayTao: new Date(),
            isLock: false,
            isDelete: false
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let result = await colCategory.insertOne(categoryThem);
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

    XoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categoryID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let result = await colCategory.updateOne({ _id: ObjectId(categoryID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    KhoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categoryID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let result = await colCategory.updateOne({ _id: ObjectId(categoryID) }, { $set: { isLock: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Khóa thành công !'
        });

    },

    MoKhoaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let categoryID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let result = await colCategory.updateOne({ _id: ObjectId(categoryID) }, { $set: { isLock: false } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Mở khóa thành công !'
        });

    },

    SuaCategory: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let categorySua = {
            _id: ObjectId(req.body._id),
            ten: req.body.ten,
            icon:req.body.icon,
            img: req.body.img,
            isLock: req.body.isLock
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colCategory = db.collection('CATEGORY');
        let result = await colCategory.updateOne({ _id: ObjectId(categorySua._id) },
            {
                $set:
                {
                    ten: categorySua.ten,
                    icon:categorySua.icon,
                    img: categorySua.img,
                    isLock: categorySua.isLock
                }
            });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}