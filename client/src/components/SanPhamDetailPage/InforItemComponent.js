import React, { useState, useEffect, Fragment } from 'react';
import { Image, Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';
import ReactImageMagnify from 'react-image-magnify';
import { InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

export default function InforItemComponent(props) {
    var dataProduct = props.thongTinProduct;
    var dataColor = props.phanLoaiColor;
    var dataSize = props.phanLoaiSize;
    const [cookies, setCookie] = useCookies();
    const [dataShop, setDataShop] = useState({
        idShop: '',
        tenShop: '',
        logoShop: ''
    });
    const [dataGioHangTruocDo, setDataGioHangTruocDo] = useState([]);
    const dispatch = useDispatch();
    const [srcHinhLon, setSrcHinhLon] = useState('');
    const [changeDivColor, setChangeDivColor] = useState(-1);
    const [changeDivSize, setChangeDivSize] = useState(-1);
    const [thongTinMuaSanPham, setThongTinMuaSanPham] = useState({
        ten: '',
        giaCuoiCung: '',
        giaGoc: '',
        khuyenMai: '',
        mauSac: '',
        size: '',
        soLuong: '',
        img: '',
        idShop: '',
        tenShop: '',
        idUser: ''
    });
    const statusThayDoiGioHang = useSelector(state => state.statusThayDoiGioHang);

    useEffect(() => {
        setSrcHinhLon(dataProduct.img.chinh);
        setThongTinMuaSanPham({
            ten: dataProduct.ten,
            giaCuoiCung: parseInt(tinh_tien(dataProduct.gia, dataProduct.giaTriGiamGia)),
            giaGoc: dataProduct.gia,
            khuyenMai: dataProduct.giaTriGiamGia,
            mauSac: '',
            size: '',
            soLuong: '',
            img: dataProduct.img.chinh,
            idShop: dataProduct.idShop,
            tenShop: '',
            idUser: cookies.userID
        });
        LayShopTheoID(dataProduct.idShop);
    }, [dataProduct]);

    useEffect(() => {
        setThongTinMuaSanPham({
            ...thongTinMuaSanPham,
            tenShop: dataShop.tenShop
        })
    }, [dataShop])

    useEffect(() => {
        if (statusThayDoiGioHang === false) {
            setDataGioHangTruocDo(JSON.parse(localStorage.getItem('dataGioHang')));
        } else {
            localStorage.setItem('dataGioHang', JSON.stringify(dataGioHangTruocDo));
            dispatch({ type: 'KHONG_THAY_DOI_GIO_HANG' });
        }
    }, [statusThayDoiGioHang]);

    async function LayShopTheoID(shopID) {
        let res = await axios.get('hethong/users/shop-item?idShop=' + shopID);
        if (res.data.status === 'success') {
            setDataShop({
                idShop: res.data.data.thongTinShop.idShop,
                tenShop: res.data.data.thongTinShop.ten,
                logoShop: res.data.data.thongTinShop.logoShop
            });
        }
    }



    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a.toString();
    }

    function tinh_tien(giaGoc, giaTriGiamGia) {
        var tien = 0;
        if (giaTriGiamGia > 100) {
            tien = giaGoc - giaTriGiamGia;
        } else {
            tien = giaGoc - (giaGoc * giaTriGiamGia / 100);
        }

        return tien.toString();
    }

    function to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    function ThemVaoGioHang(data) {
        if (dataGioHangTruocDo.length === 0) {
            setDataGioHangTruocDo(
                [...dataGioHangTruocDo,
                    data]
            )
            dispatch({ type: 'THAY_DOI_GIO_HANG' });
        } else {
            for (let index = 0; index < dataGioHangTruocDo.length; index++) {
                if (data.ten === dataGioHangTruocDo[index].ten) { // Sản phẩm vừa mới thêm vào giỏ hàng trùng tên với sản phẩm đã có trong giỏ hàng trước đó
                    if (data.mauSac !== dataGioHangTruocDo[index].mauSac) { // Trùng tên mà khác màu sắc
                        setDataGioHangTruocDo(
                            [...dataGioHangTruocDo,
                                data]
                        )
                        dispatch({ type: 'THAY_DOI_GIO_HANG' });
                    } else {
                        if (data.size !== dataGioHangTruocDo[index].size) { // Trùng tên mà khác size
                            setDataGioHangTruocDo(
                                [...dataGioHangTruocDo,
                                    data]
                            )
                            dispatch({ type: 'THAY_DOI_GIO_HANG' });
                        } else { // Trùng tên , trùng màu , trùng size
                            dataGioHangTruocDo[index].soLuong += data.soLuong;
                            setDataGioHangTruocDo(
                                [...dataGioHangTruocDo]
                            )
                            dispatch({ type: 'THAY_DOI_GIO_HANG' });
                        }
                    }

                }
                else {
                    setDataGioHangTruocDo(
                        [...dataGioHangTruocDo,
                            data]
                    )
                    dispatch({ type: 'THAY_DOI_GIO_HANG' });
                }
            }
        }
    }

    return (
        <div className="row">
            <div className="col-sm-5">
                <ReactImageMagnify enlargedImagePosition={'over'} {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: srcHinhLon
                    },
                    largeImage: {
                        src: srcHinhLon,
                        width: 1200,
                        height: 1800
                    }
                }} />
                <div className="col">
                    <div className="row" style={{ marginTop: 10 }}>
                        <div className="border border-dark showimg_little">
                            <Image src={dataProduct.img.chinh} className="img_little"
                                onMouseOver={() => {
                                    setSrcHinhLon(dataProduct.img.chinh);
                                }}></Image>
                        </div>
                        {
                            dataProduct.img.phu.map((src, i) => {
                                return <div key={i} className="border border-dark showimg_little">
                                    <Image src={src} className="img_little"
                                        onMouseOver={() => {
                                            setSrcHinhLon(src);
                                        }}></Image>
                                </div>
                            })
                        }

                    </div>
                </div>
            </div>
            <div className="col-sm-7 infor-item">
                <h3>{dataProduct.ten}</h3>
                <hr></hr>
                <h5 style={{ color: 'red' }}><strong>{format_curency(tinh_tien(dataProduct.gia, dataProduct.giaTriGiamGia))} VNĐ</strong></h5>
                {
                    dataProduct.giaTriGiamGia > 0 && (
                        <Fragment>
                            <p>Khuyến mãi: {dataProduct.giaTriGiamGia > 100 ? format_curency(dataProduct.giaTriGiamGia.toString()) + 'VNĐ' : dataProduct.giaTriGiamGia + '%'}</p>
                            <p>Giá gốc: {format_curency(dataProduct.gia.toString())} VNĐ</p>
                        </Fragment>
                    )
                }

                <hr></hr>
                <div className='row'>
                    <div className='col-sm-8' style={{ height: 'auto' }}>
                        {
                            dataProduct.moTaNganGon.map((item, i) => {
                                return <Fragment>
                                    -{item}<br></br>
                                </Fragment>
                            })
                        }
                    </div>
                    <div className='col-sm-4' style={{ height: 'auto' }}>
                        <div style={{ width: 200, height: 150, backgroundColor: '#EEEEEE' }}>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col-sm-3' style={{ padding: 5, margin: 0 }}>
                                        <img src={dataShop.logoShop} width='50' height='60' style={{ marginRight: 50 }}></img>
                                    </div>
                                    <div className='col-sm-9'>
                                        <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.tenShop)}>{dataShop.tenShop}</Link><br></br>
                                        <span style={{ fontSize: 10 }}>Cam kết chính hãng 100%</span><br></br>
                                        <span style={{ fontSize: 10 }}>Hợp tác cùng TiemDo</span><br></br>
                                        <span style={{ fontSize: 10 }}>Chứng nhận bởi TiemDo</span>
                                    </div>
                                </div>

                                <Link to={'/shop/' + dataShop.idShop + '/' + to_slug(dataShop.tenShop)}>
                                    <Button style={{ width: '100%', height: 30, marginTop: 10 }}>Xem shop</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                {
                    dataColor.length > 0 && (
                        <div className='col'>
                            <p>Màu sắc:</p>
                            {dataColor.map((item, i) => {
                                return <label key={i}>
                                    <input type='radio' name='color' className='radio-color' value={i}></input>
                                    <div className='phanloai' style={{ width: 60, height: 30, backgroundColor: changeDivColor === i ? "orange" : "blue", borderRadius: 5, marginLeft: 10, textAlign: 'center', color: 'white' }} onClick={(e) => {
                                        setChangeDivColor(i);
                                        setThongTinMuaSanPham({
                                            ...thongTinMuaSanPham,
                                            mauSac: item.tenPhanLoai
                                        })
                                    }}>{item.tenPhanLoai}</div>
                                </label>
                            })}
                        </div>
                    )
                }

                {
                    dataSize.length > 0 && (
                        <div className='col'>
                            <p>Size:</p>
                            {dataSize.map((item, i) => {
                                return <label key={i}>
                                    <input type='radio' name='color' className='radio-color' value={i}></input>
                                    <div className='phanloai' style={{ width: 60, height: 30, backgroundColor: changeDivSize === i ? "orange" : "blue", borderRadius: 5, marginLeft: 10, textAlign: 'center', color: 'white' }} onClick={(e) => {
                                        setChangeDivSize(i);
                                        setThongTinMuaSanPham({
                                            ...thongTinMuaSanPham,
                                            size: item.tenPhanLoai
                                        })
                                    }}>{item.tenPhanLoai}</div>
                                </label>
                            })}
                        </div>
                    )
                }

                <br></br>
                <div className="row">
                    <div className="col">
                        <p>Số lượng:</p>
                        <InputNumber min={0} defaultValue={0} onChange={(value) => {
                            setThongTinMuaSanPham({
                                ...thongTinMuaSanPham,
                                soLuong: value
                            })
                        }} />
                    </div>
                    <Button style={{ width: 300, marginRight: 150 }} onClick={() => {
                        if (cookies.token === undefined) {
                            dispatch({ type: 'SHOW_MODAL_DANGNHAP_DANGKY' });
                        } else {
                            ThemVaoGioHang(thongTinMuaSanPham);
                        }
                    }}>
                        <div className="row" style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <FaCartPlus size={30}></FaCartPlus>&nbsp;<strong>CHỌN MUA</strong>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}
