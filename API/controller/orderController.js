const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');


module.exports = {
    ThemDonHang: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let donHangThem = {
            idShow: req.body.idShow,
            thongTinNguoiMua: {
                ten: req.body.thongTinNguoiMua.hoTen,
                sdt: req.body.thongTinNguoiMua.sdt,
                diaChi: req.body.thongTinNguoiMua.diaChi
            },
            tongTien: req.body.tongTien,
            soLuongSanPham: req.body.soLuongSanPham,
            ngayTao: req.body.ngayTao,
            isDelete: req.body.isDelete
        }

        let dataGioHang = req.body.dataGioHang;
        var countGioHang = dataGioHang.length;
        var countResultThemChiTiet = 0;

        console.log(dataGioHang);
        console.log(donHangThem);

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colOrder = db.collection('ORDERS');
        const colOrderDetail = db.collection('ORDER_DETAILS');
        let result = await colOrder.insertOne(donHangThem);
        console.log('Thêm đơn hàng thành công');

        if (result.insertedCount > 0) {
            for (let index = 0; index < dataGioHang.length; index++) {
                var chitiet = {
                    idShow: 'ORDDE-'+ids.generate().toUpperCase(),
                    ten: dataGioHang[index].ten,
                    tongTien: dataGioHang[index].giaCuoiCung,
                    soLuong: dataGioHang[index].soLuong,
                    mauSac: dataGioHang[index].mauSac,
                    size: dataGioHang[index].size,
                    img: dataGioHang[index].img,
                    idShop: dataGioHang[index].idShop,
                    idUser: dataGioHang[index].idUser,
                    trangThai: 0,
                    ghiChu: '',
                    ghiChuHuy: '',
                    isDelete: false
                }

                await colOrderDetail.insertOne(chitiet);
                countResultThemChiTiet += 1;
            }

            if (countResultThemChiTiet === countGioHang) {
                res.status(200).json({
                    status: 'success',
                    message: 'Thêm thành công'
                })
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Thêm thất bại!'
            })
        }
        client.close();
    }
}