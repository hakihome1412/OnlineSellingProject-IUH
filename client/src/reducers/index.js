import {combineReducers} from 'redux';
import taiKhoanDaDangNhap from '../reducers/DungChung/taiKhoanDaDangNhapReducer';
import trangThaiDangNhap from '../reducers/DungChung/trangThaiDaDangNhapThanhCong';
import showMainComponent from '../reducers/DungChung/showMainComponentAdminReducer';
import showModalThemCarousel from '../reducers/DungChung/showModalThemCarouselReducer';
import reloadDatabase from '../reducers/DungChung/reloadDatabaseReducer';
import setSpinner from '../reducers/DungChung/setSpinnerReducer';
import isAdmin from '../reducers/DungChung/isAdminReducer';
import showChiTietCarousel from '../reducers/DungChung/showChiTietCarouselReducer';
import objectIDDuocChon from '../reducers/DungChung/objectIDDangDuocChonReducer';
import setSpinnerThemCarousel from '../reducers/DungChung/setSpinnerThemCarouselReducer';
import setSpinnerXoaCarousel from '../reducers/DungChung/setSpinnerXoaCarouselReducer';
import setSpinnerChiTietCarousel from '../reducers/DungChung/setSpinnerChiTietCarouselReducer';
import showModalThemBanner from '../reducers/DungChung/showModalThemBannerReducer';
import showChiTietBanner from '../reducers/DungChung/showChiTietBannerReducer';
import setSpinnerChiTietBanner from '../reducers/DungChung/setSpinnerChiTietBannerReducer';
import showModalThemCategory from '../reducers/DungChung/showModalThemCategoryReducer';
import showChiTietCategory from '../reducers/DungChung/showChiTietCategoryReducer';
import setSpinnerChiTietCategory from '../reducers/DungChung/setSpinnerChiTietCategoryReducer';
import showModalThemBrand from '../reducers/DungChung/showModalThemBrandReducer';
import showChiTietBrand from '../reducers/DungChung/showChiTietBrandReducer';
import setSpinnerChiTietBrand from '../reducers/DungChung/setSpinnerChiTietBrandReducer';
import showModalThemProduct from '../reducers/DungChung/showModalThemProductReducer';
import showChiTietProduct from '../reducers/DungChung/showChiTietProductReducer';
import tongSoSanPham from '../reducers/DungChung/tongSoSanPhamTrongGioHangReducer';
import statusThayDoiGioHang from '../reducers/DungChung/statusThayDoiGioHangReducer';
import showModalDangNhapDangKy from '../reducers/DungChung/showModalDangNhapDangKyReducer';
import showHeader from '../reducers/DungChung/showHeaderReducer';
import thongTinDatHang from '../reducers/DungChung/thongTinDatHangKhachHangReducer';
import thongTinVoucher from '../reducers/DungChung/thongTinVoucherReducer';
import setKeyMenuBanHang from '../reducers/DungChung/setKeyMenu_BanHangReducer';
import reloadAnh from '../reducers/DungChung/reloadAnhReducer';
import showChiTietProduct_ChuShop from '../reducers/DungChung/showChiTietProduct_ChuShopReducer';

const allReducers = combineReducers({
    taiKhoanDaDangNhap,
    trangThaiDangNhap,
    showMainComponent,
    showModalThemCarousel,
    reloadDatabase,
    setSpinner,
    isAdmin,
    showChiTietCarousel,
    objectIDDuocChon,
    setSpinnerThemCarousel,
    setSpinnerXoaCarousel,
    setSpinnerChiTietCarousel,
    showModalThemBanner,
    showChiTietBanner,
    setSpinnerChiTietBanner,
    showModalThemCategory,
    showChiTietCategory,
    setSpinnerChiTietCategory,
    showModalThemBrand,
    showChiTietBrand,
    setSpinnerChiTietBrand,
    showModalThemProduct,
    showChiTietProduct,
    tongSoSanPham,
    statusThayDoiGioHang,
    showModalDangNhapDangKy,
    showHeader,
    thongTinDatHang,
    thongTinVoucher,
    setKeyMenuBanHang,
    reloadAnh,
    showChiTietProduct_ChuShop
})

export default allReducers;