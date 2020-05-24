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
const lichSu_CTDonHangController = require('../controller/lichsuCTDonHangController');

// Phần xử lý Database CAROUSEL
router.get('/carousels', carouselController.LayDanhSachCarouselAll);
router.get('/carousels-search/:page', carouselController.LayDanhSachCarousel_Search_TheoTrang);
router.get('/carousels/:page', carouselController.LayDanhSachCarouselTheoTrang);
router.get('/carousels-chuakhoa/:page', carouselController.LayDanhSachCarousel_ChuaKhoa_TheoTrang);
router.get('/carousels-dakhoa/:page', carouselController.LayDanhSachCarousel_DaKhoa_TheoTrang);
router.get('/carousels-item', carouselController.LayCarouselTheoIDD);
router.post('/carousels-them', carouselController.ThemCarousel)
router.put('/carousels-xoa', carouselController.XoaCarousel);
router.put('/carousels-sua', carouselController.SuaCarousel);
router.put('/carousels-khoa', carouselController.KhoaCarousel);
router.put('/carousels-mokhoa', carouselController.MoKhoaCarousel);


// Phần xử lý Database CATEGORY
router.get('/categorys/:page', categoryController.LayDanhSachCategoryTheoTrang);
router.get('/categorys-search/:page', categoryController.LayDanhSachCategory_Search_TheoTrang);
router.get('/categorys-chuakhoa/:page', categoryController.LayDanhSachCategory_ChuaKhoa_TheoTrang);
router.get('/categorys-dakhoa/:page', categoryController.LayDanhSachCategory_DaKhoa_TheoTrang);
router.get('/categorys', categoryController.LayDanhSachCategoryAll);
router.get('/categorys-show', categoryController.LayDanhSachCategoryChuaKhoa);
router.get('/categorys-item', categoryController.LayCategoryTheoID);
router.post('/categorys-them', categoryController.ThemCategory)
router.put('/categorys-xoa', categoryController.XoaCategory);
router.put('/categorys-sua', categoryController.SuaCategory);
router.put('/categorys-khoa', categoryController.KhoaCategory);
router.put('/categorys-mokhoa', categoryController.MoKhoaCategory);

// Phần xử lý Database BANNER (EVENT)
router.get('/banners', bannerController.LayDanhSachBannerAll);
router.get('/banners-search/:page', bannerController.LayDanhSachBanner_Search_TheoTrang);
router.get('/banners/:page', bannerController.LayDanhSachBannerTheoTrang);
router.get('/banners-chuakhoa/:page', bannerController.LayDanhSachBanner_ChuaKhoa_TheoTrang);
router.get('/banners-dakhoa/:page', bannerController.LayDanhSachBanner_DaKhoa_TheoTrang);
router.get('/banners/vitri-center/:page', bannerController.LayDanhSachBanner_ViTriTrungTam_TheoTrang);
router.get('/banners/vitri-right/:page', bannerController.LayDanhSachBanner_ViTriBenPhai_TheoTrang);
router.get('/banners/vitri-bottom/:page', bannerController.LayDanhSachBanner_ViTriBenDuoi_TheoTrang);
router.get('/banners-item', bannerController.LayBannerTheoID);
router.post('/banners-them', bannerController.ThemBanner)
router.put('/banners-xoa', bannerController.XoaBanner);
router.put('/banners-sua', bannerController.SuaBanner);
router.put('/banners-khoa', bannerController.KhoaBanner);
router.put('/banners-mokhoa', bannerController.MoKhoaBanner);

// Phần xử lý Database BRAND
router.get('/brands', brandController.LayDanhSachBrandAll);
router.get('/brands-search/:page', brandController.LayDanhSachBrand_Search_TheoTrang);
router.get('/brands/:page', brandController.LayDanhSachBrandTheoTrang);
router.get('/brands-chuakhoa/:page', brandController.LayDanhSachBrand_ChuaKhoa_TheoTrang);
router.get('/brands-dakhoa/:page', brandController.LayDanhSachBrand_DaKhoa_TheoTrang);
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

// Phần xử lý Database USERS
router.get('/users-item', userController.LayUserTheoID);
router.get('/users/shop-item', userController.LayShopTheoID);
router.get('/users/:page', userController.LayUserTheoTrang);
router.get('/users-chuakhoa/:page', userController.LayUser_ChuaKhoa_TheoTrang);
router.get('/users-dakhoa/:page', userController.LayUser_DaKhoa_TheoTrang);
router.get('/users/shop/:page', userController.LayShopTheoTrang);
router.get('/users/shop-chuakhoa/:page', userController.LayShop_ChuaKhoa_TheoTrang);
router.get('/users/shop-dakhoa/:page', userController.LayShop_DaKhoa_TheoTrang);
router.get('/users-search/:page', userController.LayDanhSachUser_Search_TheoTrang);
router.get('/users/shop-search/:page', userController.LayDanhSachShop_Search_TheoTrang);
//-------------------SHOP-------------------------------------
router.put('/users-sua-designshop', userController.SuaThietKeShop);
router.put('/users-sua-thongtinshop', userController.SuaThongTinShop);
//-------------------NORMAL-------------------------------------
router.put('/users-taoshop', userController.TaoShop);
router.post('/users-them', userController.ThemUser);
//-------------------ADMIN-------------------------------------
router.put('/users-khoauser', userController.KhoaUser);
router.put('/users-mokhoauser', userController.MoKhoaUser);
router.put('/users/shop-khoashop', userController.KhoaShop);
router.put('/users/shop-mokhoashop', userController.MoKhoaShop);

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
router.get('/products-search-admin/:page', productController.LayDanhSachProduct_Search_TheoTrang);
router.get('/products-shop-chuaduyet/:page', productController.LayTatCaSanPhamTheoIDShop_ChuaDuyet_TheoTrang);
router.get('/products-shop-daduyet/:page', productController.LayTatCaSanPhamTheoIDShop_DaDuyet_TheoTrang);
router.get('/products-shop-chuakhoa/:page', productController.LayTatCaSanPhamTheoIDShop_ChuaKhoa_TheoTrang);
router.get('/products-shop-dakhoa/:page', productController.LayTatCaSanPhamTheoIDShop_DaKhoa_TheoTrang);
router.get('/products-admin-chuaduyet/:page', productController.LayTatCaSanPham_ChuaDuyet_TheoTrang);
router.get('/products-admin-daduyet/:page', productController.LayTatCaSanPham_DaDuyet_TheoTrang);
router.get('/products-admin-chuakhoa/:page', productController.LayTatCaSanPham_ChuaKhoa_TheoTrang);
router.get('/products-admin-dakhoa/:page', productController.LayTatCaSanPham_DaKhoa_TheoTrang);
router.post('/products-them-chushop', productController.ThemProduct_ChuShop);
router.put('/products-xoa', productController.XoaProduct_ChuShop);
router.put('/products-duyetsanpham', productController.DuyetSanPham);
router.put('/products-sua-chushop', productController.SuaProduct_ChuShop);
router.put('/products-sua-admin', productController.SuaProduct_Admin);

// Phần xử lý Database PRODUCTCLASSIFY
router.get('/product-classify', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct);
router.get('/product-classify/color', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct_MauSac);
router.get('/product-classify/size', productClassifyController.LayDanhSachPhanLoaiTheoIDProduct_Size);

// Phần xử lý Database ORDER
router.get('/orders/:page', orderController.LayDonHangTheoTrang);
router.get('/orders-user', orderController.LayDonHangTheoIDUser);
router.get('/orders-item', orderController.LayDonHangTheoID);
router.post('/orders-them', orderController.ThemDonHang);
router.get('/orders-search/:page', orderController.LayDanhSachOrder_Search_TheoTrang);

// Phần xử lý Database LICHSU_CTDONHANG
router.get('/lichsu-ctdonhang', lichSu_CTDonHangController.LayLichSuCTDonHang);
router.put('/lichsu-capnhat',lichSu_CTDonHangController.CapNhatLichSu);

// Phần xử lý Database ORDER DETAILS
router.get('/order-details', orderDetailController.LayChiTietDonHangTheoIdDonHang);
router.get('/order-details-item', orderDetailController.LayChiTietDonHangTheoID);
router.get('/order-details-all', orderDetailController.LayChiTietDonHangAll);
router.get('/order-details-shop/:page', orderDetailController.LayChiTietDonHangTheoIdShop_TheoTrang);
router.get('/order-details-shop-choduyet/:page', orderDetailController.LayChiTietDonHangTheoIdShop_ChoDuyet_TheoTrang);
router.get('/order-details-shop-daduyet/:page', orderDetailController.LayChiTietDonHangTheoIdShop_DaDuyet_TheoTrang);
router.get('/order-details-shop-dangvanchuyen/:page', orderDetailController.LayChiTietDonHangTheoIdShop_DangVanChuyen_TheoTrang);
router.get('/order-details-shop-khachnhanhang/:page', orderDetailController.LayChiTietDonHangTheoIdShop_KhachNhanHang_TheoTrang);
router.get('/order-details-shop-hoanthanh/:page', orderDetailController.LayChiTietDonHangTheoIdShop_HoanThanh_TheoTrang);
router.get('/order-details-shop-huy/:page', orderDetailController.LayChiTietDonHangTheoIdShop_Huy_TheoTrang);
router.put('/order-details-sua-daduyet', orderDetailController.SuaTrangThaiThanhDaDuyet);
router.put('/order-details-sua', orderDetailController.SuaChiTietDonHang);

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