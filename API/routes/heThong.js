var express = require('express');
var router = express.Router();

const carouselController = require('../controller/carouselController');
const categoryController = require('../controller/categoryController');
const bannerController = require('../controller/bannerController');
const brandController = require('../controller/brandController');
const authController = require('../controller/authController');
const productController = require('../controller/productController');
const voucherController = require('../controller/voucherController');
const userController = require('../controller/userController');
const localController = require('../controller/localController');
const imageController = require('../controller/imageController');
const countriesController = require('../controller/countriesController');
const orderController = require('../controller/orderController');
const orderDetailController = require('../controller/orderDetailController');
const productClassifyController = require('../controller/productClassifyController');

// Phần xử lý Database CAROUSEL
router.get('/carousels', carouselController.LayDanhSachCarouselAll);
router.get('/carousels/:page', carouselController.LayDanhSachCarouselTheoTrang);
router.get('/carousels-item', carouselController.LayCarouselTheoIDD);
router.post('/carousels-them', carouselController.ThemCarousel)
router.put('/carousels-xoa', carouselController.XoaCarousel);
router.put('/carousels-sua', carouselController.SuaCarousel);
router.put('/carousels-khoa', carouselController.KhoaCarousel);
router.put('/carousels-mokhoa', carouselController.MoKhoaCarousel);


// Phần xử lý Database CATEGORY
router.get('/categorys/:page', categoryController.LayDanhSachCategoryTheoTrang);
router.get('/categorys', categoryController.LayDanhSachCategoryAll);
router.get('/categorys-item', categoryController.LayCategoryTheoID);
router.post('/categorys-them', categoryController.ThemCategory)
router.put('/categorys-xoa', categoryController.XoaCategory);
router.put('/categorys-sua', categoryController.SuaCategory);
router.put('/categorys-khoa', categoryController.KhoaCategory);
router.put('/categorys-mokhoa', categoryController.MoKhoaCategory);

// Phần xử lý Database BANNER (EVENT)
router.get('/banners', bannerController.LayDanhSachBannerAll);
router.get('/banners/:page', bannerController.LayDanhSachBannerTheoTrang);
router.get('/banners-item', bannerController.LayBannerTheoID);
router.post('/banners-them', bannerController.ThemBanner)
router.put('/banners-xoa', bannerController.XoaBanner);
router.put('/banners-sua', bannerController.SuaBanner);
router.put('/banners-khoa', bannerController.KhoaBanner);
router.put('/banners-mokhoa', bannerController.MoKhoaBanner);

// Phần xử lý Database BRAND
router.get('/brands', brandController.LayDanhSachBrandAll);
router.get('/brands/:page', brandController.LayDanhSachBrandTheoTrang);
router.get('/brands-item', brandController.LayBrandTheoID);
router.post('/brands-them', brandController.ThemBrand)
router.put('/brands-xoa', brandController.XoaBrand);
router.put('/brands-sua', brandController.SuaBrand);
router.put('/brands-khoa', brandController.KhoaBrand);
router.put('/brands-mokhoa', brandController.MoKhoaBrand);

// Phần xử lý Database VOUCHER
router.get('/vouchers', voucherController.LayDanhSachVoucherAll);
router.get('/vouchers/:page', voucherController.LayDanhSachVoucherTheoTrang);
router.get('/vouchers-item', voucherController.LayVoucherTheoID);
router.get('/vouchers-item-show', voucherController.LayVoucherTheoIDShow);
// router.post('/brands-them', brandController.ThemBrand)
// router.put('/brands-xoa', brandController.XoaBrand);
// router.put('/brands-sua', brandController.SuaBrand);
// router.put('/brands-khoa', brandController.KhoaBrand);
// router.put('/brands-mokhoa', brandController.MoKhoaBrand);

// Phần xử lý Database USERS
//-------------------SHOP-------------------------------------
router.get('/users-item', userController.LayUserTheoID);
router.get('/users/shop-item', userController.LayShopTheoID);
router.post('/users-them', userController.ThemUser);
router.put('/users-taoshop', userController.TaoShop);
router.put('/users-sua-designshop', userController.SuaThietKeShop);
//-------------------NORMAL-------------------------------------
//-------------------ADMIN-------------------------------------

// Phần xử lý Database PRODUCT
router.get('/products', productController.LayDanhSachProductAll);
router.get('/products/:page', productController.LayDanhSachProductTheoTrang);
router.get('/products-showpage/:page', productController.LayDanhSachProductTheoTrang_ShowPage);
router.get('/products-all-showpage/:page', productController.LayDanhSachProduct_ShowPage_TheoTrang);
router.get('/products-category/:page', productController.LayTatCaSanPhamTheoIDCategoryTheoTrang);
router.get('/products-item', productController.LayProductTheoID);
router.get('/products-sale/:page', productController.LayDanhSachProductDangGiamGia_ShowPage);
router.get('/products-sale-show/:page', productController.LayDanhSachProductDangGiamGia_ShowAll_TheoTrang);
router.get('/products-shop/:page', productController.LayTatCaSanPhamTheoIDShopTheoTrang);
router.get('/products-shop-show/:page', productController.LayTatCaSanPhamTheoIDShopTheoTrang_ShowPage);
router.get('/products-search/:page', productController.LayTatCaSanPhamTheoIDShop_Search_ChuShop_TheoTrang);
router.get('/products-shop-chuaduyet/:page', productController.LayTatCaSanPhamTheoIDShop_ChuaDuyet_TheoTrang);
router.get('/products-shop-daduyet/:page', productController.LayTatCaSanPhamTheoIDShop_DaDuyet_TheoTrang);
router.get('/products-shop-dakhoa/:page', productController.LayTatCaSanPhamTheoIDShop_DaKhoa_TheoTrang);
router.post('/products-them-chushop', productController.ThemProduct_ChuShop);
router.put('/products-xoa', productController.XoaProduct_ChuShop);
router.put('/products-sua-chushop', productController.SuaProduct_ChuShop);
// router.post('/products-them', productController.ThemProduct)
// router.put('/products-xoa', productController.XoaProduct);
// router.put('/products-sua', productController.SuaProduct);
// router.put('/products-khoa', productController.KhoaProduct);
// router.put('/products-mokhoa', productController.MoKhoaProduct);

// Phần xử lý Database PRODUCTCLASSIFY
router.get('/product-classify', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct);
router.get('/product-classify/color', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct_MauSac);
router.get('/product-classify/size', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct_Size);

// Phần xử lý Database ORDER
router.post('/orders-them', orderController.ThemDonHang);

// Phần xử lý Database LOCAL
router.get('/locals', localController.LayDanhSachAll);
router.get('/locals-quan', localController.LayQuanTheoIDThanhPho);
router.get('/locals-phuong', localController.LayPhuongTheoIDQuan);
router.get('/locals-address', localController.LayTenThanhPhoQuanPhuongTheoID);

// Phần xử lý Database ACCOUNT
//-------Đăng Nhập
router.post('/auth', authController.KiemTraAccount);
router.get('/auth/token-admin', authController.KiemTraTokenAdmin);
router.get('/auth/token-chushop', authController.KiemTraTokenChuShop);
router.get('/auth/token-normal', authController.KiemTraTokenNormal);

// Phần xử lý Database COUNTRIES
router.get('/countries', countriesController.LayDanhSachCountriesAll);

// Phần xử lý hình ảnh
router.post('/upload-image', imageController.UploadAnh);
router.get('/open-image', imageController.OpenImage);
module.exports = router;