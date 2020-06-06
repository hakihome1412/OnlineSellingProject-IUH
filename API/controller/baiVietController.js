const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, soItemMoiPageCategory } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau, shuffle, sapXepTuLonDenBe } = require('../functionHoTro/index');

module.exports = {
    ThemBaiViet: async function (req, res) {
        const baiVietThem2 = req.body.data;
        const baiVietThem = {
            idShow: 'POST-' + ids.generate().toUpperCase(),
            ...baiVietThem2
        }

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection('POSTS2');

        let result = await colPost.insertOne(baiVietThem);
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

    LayBaiVietTheoID: async function (req, res) {
        const id = req.query.id;
        console.log(id);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server POSTS");
        const db = client.db(DbName);
        const colPost = db.collection('POSTS2');

        let result = await colPost.findOne({ idShow: id });
        client.close();

        if (result === null) {
            res.status(200).json({
                status: 'fail',
                message: 'Lấy dữ liệu thất bại'
            });
        } else {
            res.status(200).json({
                status: 'success',
                message: 'Lấy dữ liệu thành công',
                data: result
            });
        }
    },
}