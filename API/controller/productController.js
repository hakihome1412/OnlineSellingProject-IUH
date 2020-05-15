const { DbUrl, DbName, soItemMoiPageAdmin, soItemMoiPage, soItemMoiPageCategory } = require('../config/constant');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');
const ids = require('short-id');
const { BoDau, shuffle } = require('../functionHoTro/index');

module.exports = {
    LayDanhSachProductTheoTrang: async function (req, res) {
        var SoItemMoiPageAdmin = parseInt(soItemMoiPageAdmin);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPageAdmin);
        let arrProduct = await colProduct.find({ isDelete: false }).sort({ _id: -1 }).limit(SoItemMoiPageAdmin).skip(SoItemMoiPageAdmin * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayDanhSachProductTheoTrang_ShowPage: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPage);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPage);
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).sort({ _id: -1 }).limit(SoItemMoiPage).skip(SoItemMoiPage * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayDanhSachProduct_ShowPage_TheoTrang: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPageCategory);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPage);
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).sort({ _id: -1 }).limit(SoItemMoiPage).skip(SoItemMoiPage * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayDanhSachProductAll: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false }).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: allProduct
        });
    },

    LayProductTheoID: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productID = req.query.id;
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let result = await colProduct.find({ _id: ObjectId(productID) }).next();
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

    LayDanhSachProductDangGiamGia_ShowPage: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPage);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true, giaTriGiamGia: { $ne: 0 } }).sort({ _id: -1 }).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray();
        let soTrang = Math.ceil(parseInt(arrProduct.length) / SoItemMoiPage);
        client.close();
        res.status(200).json({
            status: 'success',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayDanhSachProductDangGiamGia_ShowAll_TheoTrang: async function (req, res) {
        var SoItemMoiPage = parseInt(soItemMoiPageCategory);
        const page = req.params.page;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let arrProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true, giaTriGiamGia: { $ne: 0 } }).sort({ _id: -1 }).limit(soItemMoiPage).skip(soItemMoiPage * page).toArray();
        let soTrang = Math.ceil(parseInt(arrProduct.length) / SoItemMoiPage);
        client.close();
        res.status(200).json({
            status: 'success',
            data: shuffle(arrProduct),
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDCategoryTheoTrang: async function (req, res) {
        var SoItemMoiPageCategory = parseInt(soItemMoiPageCategory);
        const page = req.params.page;
        const categoryID = req.query.idCategory;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, isLock: false, isAccept: true }).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / SoItemMoiPageCategory);
        let arrProduct = await colProduct.find({ isDelete: false, idCategory: categoryID, isLock: false, isAccept: true }).sort({ _id: -1 }).limit(soItemMoiPageCategory).skip(soItemMoiPageCategory * page).toArray();
        client.close();

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShopTheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShopTheoTrang_ShowPage: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: true }).sort({ _id: -1 }).limit(soItemMoiPageCategory).skip(soItemMoiPageCategory * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageCategory);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_Search_ChuShop_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const search = BoDau(req.query.search);

        console.log(search);

        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({
            isDelete: false, idShop: shopID, $or: [
                {
                    idShow: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
                {
                    ten: {
                        '$regex': search,
                        '$options': '$i'
                    }
                },
            ]
        }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_ChuaDuyet_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: false }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_DaDuyet_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isAccept: true }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    LayTatCaSanPhamTheoIDShop_DaKhoa_TheoTrang: async function (req, res) {
        const page = req.params.page;
        const shopID = req.query.idShop;
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        let allProduct = await colProduct.find({ isDelete: false, idShop: shopID }).toArray();
        let arrProduct = await colProduct.find({ isDelete: false, idShop: shopID, isLock: true }).sort({ _id: -1 }).limit(soItemMoiPageAdmin).skip(soItemMoiPageAdmin * page).toArray();
        let soTrang = Math.ceil(parseInt(allProduct.length) / soItemMoiPageAdmin);
        client.close();
        console.log(arrProduct + '-' + soTrang);

        res.status(200).json({
            status: 'success',
            data: arrProduct,
            soTrang: soTrang
        });
    },

    ThemProduct_ChuShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productThem = {
            idShow: 'PRODU-' + ids.generate().toUpperCase(),
            ten: req.body.ten,
            img: {
                chinh: req.body.img.chinh,
                phu: req.body.img.phu,
                moTaChiTiet: req.body.img.moTaChiTiet
            },
            gia: req.body.gia,
            noiSanXuat: req.body.noiSanXuat,
            moTa: req.body.moTa,
            moTaNganGon: req.body.moTaNganGon,
            soSao: req.body.soSao,
            giaTriGiamGia: req.body.giaTriGiamGia,
            soLuong: req.body.soLuong,
            thongTinBaoHanh: {
                baoHanh: req.body.thongTinBaoHanh.baoHanh,
                loaiBaoHanh: req.body.thongTinBaoHanh.loaiBaoHanh,
                thoiGianBaoHanh: req.body.thongTinBaoHanh.thoiGianBaoHanh,
                donViBaoHanh: req.body.thongTinBaoHanh.donViBaoHanh
            },
            ngayTao: new Date(req.body.ngayTao),
            idBrand: req.body.idBrand,
            idCategory: req.body.idCategory,
            idShop: req.body.idShop,
            idEvent: req.body.idEvent,
            isAccept: req.body.isAccept,
            isLock: req.body.isLock,
            isDelete: req.body.isDelete
        }

        let phanLoaiThem = {
            mauSac: {
                mauSac1: req.body.phanLoai.mauSac.mauSac1,
                mauSac2: req.body.phanLoai.mauSac.mauSac2,
                mauSac3: req.body.phanLoai.mauSac.mauSac3,
                mauSac4: req.body.phanLoai.mauSac.mauSac4
            },
            size: {
                size1: req.body.phanLoai.size.size1,
                size2: req.body.phanLoai.size.size2,
                size3: req.body.phanLoai.size.size3,
                size4: req.body.phanLoai.size.size4
            }
        }

        let dataPhanLoaiMauSac = [];
        let dataPhanLoaiSize = [];
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac1);
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac2);
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac3);
        dataPhanLoaiMauSac.push(phanLoaiThem.mauSac.mauSac4);
        dataPhanLoaiSize.push(phanLoaiThem.size.size1);
        dataPhanLoaiSize.push(phanLoaiThem.size.size2);
        dataPhanLoaiSize.push(phanLoaiThem.size.size3);
        dataPhanLoaiSize.push(phanLoaiThem.size.size4);

        console.log(dataPhanLoaiMauSac);
        console.log(dataPhanLoaiSize);
        var countMauSac1 = 0;
        var countSize1 = 0;

        var countMauSac2 = 0;
        var countSize2 = 0;

        for (let index = 0; index < dataPhanLoaiMauSac.length; index++) {
            if (dataPhanLoaiMauSac[index] !== '') {
                countMauSac2 += 1;
            }
        }

        for (let index = 0; index < dataPhanLoaiSize.length; index++) {
            if (dataPhanLoaiMauSac[index] !== '') {
                countSize2 += 1;
            }
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colProduct = db.collection('PRODUCTS');
        const colProductClassify = db.collection('PRODUCT_CLASSIFYS');
        let result1 = await colProduct.insertOne(productThem);
        if (result1.insertedCount > 0) {
            console.log('Thêm sản phẩm thành công');
            for (let index = 0; index < dataPhanLoaiMauSac.length; index++) {
                if (dataPhanLoaiMauSac[index] !== '') {
                    await colProductClassify.insertOne({
                        'nhomPhanLoai': 0, 'tenPhanLoai': dataPhanLoaiMauSac[index], 'idProduct': productThem.idShow
                    })
                    countMauSac1 += 1;
                }
            }

            for (let index = 0; index < dataPhanLoaiSize.length; index++) {
                if (dataPhanLoaiMauSac[index] !== '') {
                    await colProductClassify.insertOne({
                        'nhomPhanLoai': 1, 'tenPhanLoai': dataPhanLoaiSize[index], 'idProduct': productThem.idShow
                    })
                    countSize1 += 1;
                }
            }

            client.close();

            if (countMauSac1 === countMauSac2 && countSize1 === countSize2) {
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
    },

    XoaProduct_ChuShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

        let productID = req.body.id;

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('PRODUCTS');
        let result = await colBrand.updateOne({ _id: ObjectId(productID) }, { $set: { isDelete: true } });
        client.close();
        res.status(200).json({
            status: 'success',
            message: 'Xóa thành công !'
        });

    },

    SuaProduct_ChuShop: async function (req, res) {
        const client = new MongoClient(DbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        let productSua = {
            _id: ObjectId(req.body._id),
            ten: req.body.ten,
            img: {
                chinh: req.body.img.chinh,
                phu: req.body.img.phu,
                moTaChiTiet: req.body.img.moTaChiTiet
            },
            gia: req.body.gia,
            noiSanXuat: req.body.noiSanXuat,
            moTa: req.body.moTa,
            moTaNganGon: req.body.moTaNganGon,
            soSao: req.body.soSao,
            giaTriGiamGia: req.body.giaTriGiamGia,
            soLuong: req.body.soLuong,
            thongTinBaoHanh: {
                baoHanh: req.body.thongTinBaoHanh.baoHanh,
                loaiBaoHanh: req.body.thongTinBaoHanh.loaiBaoHanh,
                thoiGianBaoHanh: req.body.thongTinBaoHanh.thoiGianBaoHanh,
                donViBaoHanh: req.body.thongTinBaoHanh.donViBaoHanh
            },
            idBrand: req.body.idBrand,
            idCategory: req.body.idCategory,
            isLock: req.body.isLock,
        }

        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(DbName);
        const colBrand = db.collection('PRODUCTS');
        let result = await colBrand.updateOne({ _id: ObjectId(productSua._id) },
            {
                $set:
                {
                    ten: productSua.ten,
                    img: {
                        chinh: productSua.img.chinh,
                        phu: productSua.img.phu,
                        moTaChiTiet: productSua.img.moTaChiTiet
                    },
                    gia: productSua.gia,
                    noiSanXuat: productSua.noiSanXuat,
                    moTa: productSua.moTa,
                    moTaNganGon: productSua.moTaNganGon,
                    soSao: productSua.soSao,
                    giaTriGiamGia: productSua.giaTriGiamGia,
                    soLuong: productSua.soLuong,
                    thongTinBaoHanh: {
                        baoHanh: productSua.thongTinBaoHanh.baoHanh,
                        loaiBaoHanh: productSua.thongTinBaoHanh.loaiBaoHanh,
                        thoiGianBaoHanh: productSua.thongTinBaoHanh.thoiGianBaoHanh,
                        donViBaoHanh: productSua.thongTinBaoHanh.donViBaoHanh
                    },
                    idBrand: productSua.idBrand,
                    idCategory: productSua.idCategory,
                    isLock: productSua.isLock
                }
            });
        client.close();

        res.status(200).json({
            status: 'success',
            message: 'Sửa thành công'
        });

    }
}