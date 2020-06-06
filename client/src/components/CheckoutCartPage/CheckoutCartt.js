import React, { useState, useEffect } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { InputNumber, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';

export default function CheckoutCartt() {
    const { Search } = Input;
    const [dataGioHang, setDataGioHang] = useState(JSON.parse(localStorage.getItem('dataGioHang')));
    const [dataGioHangNew, setDataGioHangNew] = useState([]);
    const [dataVoucher, setDataVoucher] = useState('');
    const [cookie, setCookie] = useCookies();
    const dispatch = useDispatch();
    const statusThayDoiGioHang = useSelector(state => state.statusThayDoiGioHang);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    function tinhTongSanPhamTrongGioHang(data) {
        var tong = 0;
        for (let index = 0; index < data.length; index++) {
            tong += data[index].soLuong;
        }
        return parseInt(tong);
    }

    function tienTamTinh(data) {
        var tien = 0;
        for (let index = 0; index < data.length; index++) {
            tien += data[index].soLuong * data[index].giaCuoiCung;
        }
        return parseInt(tien);
    }

    function tienGiamVoucherTheoPhanTram(giaTriGiam, tongTien) {
        var tien = 0;
        tien = tongTien * giaTriGiam / 100;
        return parseInt(tien);
    }

    function tinhThanhTien(tienTamTinh, dataVoucher) {
        var tienGiam = 0;
        if (dataVoucher === '') {
            return tienTamTinh;
        } else {
            if (dataVoucher.loaiGiamGia === 0) {
                tienGiam = parseInt(dataVoucher.giaTriGiam);
                return parseInt(tienTamTinh - tienGiam);
            } else {
                tienGiam = parseInt(tienTamTinh * dataVoucher.giaTriGiam / 100);
                return parseInt(tienTamTinh - tienGiam);
            }
        }
    }

    function getGioHangTheoIDUser() {
        var arrayGioHangNew = [];

        for (let index = 0; index < dataGioHang.length; index++) {
            if (dataGioHang[index].idUser === cookie.userID) {
                arrayGioHangNew.push({
                    giaCuoiCung: dataGioHang[index].giaCuoiCung,
                    giaGoc: dataGioHang[index].giaGoc,
                    idShop: dataGioHang[index].idShop,
                    idUser: dataGioHang[index].idUser,
                    img: dataGioHang[index].img,
                    khuyenMai: dataGioHang[index].khuyenMai,
                    mauSac: dataGioHang[index].mauSac,
                    size: dataGioHang[index].size,
                    soLuong: dataGioHang[index].soLuong,
                    ten: dataGioHang[index].ten,
                    tenShop: dataGioHang[index].tenShop,
                    index: index
                });
            }
        }

        setDataGioHangNew(arrayGioHangNew);
    }

    console.log(dataGioHangNew);


    async function KiemTraVoucher(voucherID) {
        let res = await axios.get('hethong/vouchers-item-show?idShow=' + voucherID);

        if (res.data.status === 'success') {
            setDataVoucher(res.data.data);
            alert(res.data.message);
        } else {
            alert(res.data.message);
            setDataVoucher('');
        }
    }

    useEffect(() => {
        if (statusThayDoiGioHang === true) {
            setDataGioHang(JSON.parse(localStorage.getItem('dataGioHang')));
            dispatch({ type: 'KHONG_THAY_DOI_GIO_HANG' });
        }
    }, [statusThayDoiGioHang])

    useEffect(() => {
        localStorage.setItem('idVoucher', '');
        dispatch({ type: 'SHOW_HEADER' });
        if (cookie.token === undefined) {
            setDataGioHang([]);
        }
        getGioHangTheoIDUser();
    }, []);

    useEffect(() => {
        localStorage.setItem('idVoucher', dataVoucher.idShow);
    }, [dataVoucher]);

    useEffect(() => {
        getGioHangTheoIDUser();
    }, [dataGioHang])



    // useEffect(() => {
    //     tinhThanhTien(tienTamTinh(dataGioHang),dataVoucher);
    // }, [dataVoucher])

    return (
        <div className="container" style={{ marginTop: '50px', backgroundColor: '#F8F9FA', height: 'auto', padding: 20 }}>
            <h4>GIỎ HÀNG ({cookie.token === undefined ? 0 : tinhTongSanPhamTrongGioHang(dataGioHangNew)} sản phẩm)</h4>
            <div className='row' style={{ marginLeft: 5 }}>
                <div className='col-sm-8'>
                    {
                        dataGioHangNew.map((item, i) => {
                            return <div className='row' style={{ backgroundColor: 'white', height: 160, paddingTop: 10, borderRadius: 10, marginTop: 10 }}>
                                <Image src={item.img} style={{ width: 120, height: 140, marginLeft: 20 }}></Image>
                                <div className='col-sm-6' style={{ marginLeft: 20 }}>
                                    <strong>
                                        {
                                            item.mauSac !== '' && item.size !== '' && (
                                                item.ten + ' - ' + item.mauSac + ' - ' + item.size
                                            )
                                        }
                                        {
                                            item.mauSac === '' && item.size !== '' && (
                                                item.ten + ' - ' + item.size
                                            )
                                        }
                                        {
                                            item.mauSac !== '' && item.size === '' && (
                                                item.ten + ' - ' + item.mauSac
                                            )
                                        }
                                        {
                                            item.size === '' && item.mauSac === '' && (
                                                item.ten
                                            )
                                        }
                                    </strong><br></br>
                                    Cung cấp bởi: <Link>{item.tenShop}</Link> <br></br><br></br>
                                    <Link onClick={() => {
                                        dataGioHang.splice(item.index, 1);
                                        setDataGioHang([
                                            ...dataGioHang
                                        ]);
                                        localStorage.setItem('dataGioHang', null);
                                        localStorage.setItem('dataGioHang', JSON.stringify(dataGioHang));
                                        dispatch({ type: 'THAY_DOI_GIO_HANG' });
                                    }}>Xóa</Link>
                                </div>
                                <div className='col-sm-3' style={{ marginLeft: 20 }}>
                                    <div className='col' style={{ float: 'right' }}>
                                        <span style={{ fontSize: 20, fontWeight: 'bold' }}>{format_curency(item.giaCuoiCung.toString())}đ</span><br></br>
                                        <strike>{format_curency(item.giaGoc.toString())}đ</strike> | {item.khuyenMai > 100 ? '-' + format_curency(item.khuyenMai.toString()) + 'đ' : '-' + item.khuyenMai + '%'}
                                    </div>
                                    <div className='col' style={{ float: 'right', marginTop: 30 }}>
                                        <InputNumber min={1} defaultValue={item.soLuong} onChange={(value) => {
                                            dataGioHang[item.index].soLuong = value;
                                            setDataGioHang([
                                                ...dataGioHang
                                            ]);
                                            localStorage.setItem('dataGioHang', null);
                                            localStorage.setItem('dataGioHang', JSON.stringify(dataGioHang));
                                            dispatch({ type: 'THAY_DOI_GIO_HANG' });
                                        }} />
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className='col-sm-3' style={{ backgroundColor: 'white', marginLeft: 40, padding: 10, borderRadius: 10, height: dataVoucher === '' ? 310 : 390, marginTop: 10 }}>
                    <div className='col'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <span style={{ float: 'left', fontSize: 16 }}>Tạm tính</span>
                            </div>
                            <div className='col-sm-6'>
                                <span style={{ float: 'right', fontSize: 16, fontWeight: 'bold' }}>{format_curency(tienTamTinh(dataGioHangNew).toString())}đ</span>
                            </div>
                        </div>

                        {
                            dataVoucher !== '' && (
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <span style={{ float: 'left', fontSize: 16 }}>Mã giảm giá</span>
                                        <span style={{ float: 'left', fontSize: 16, fontWeight: 'bold' }}>{dataVoucher.idShow}</span>
                                    </div>
                                    <div className='col-sm-6'>
                                        <br></br>
                                        <span style={{ float: 'right', fontSize: 16, fontWeight: 'bold' }}>
                                            {
                                                dataVoucher.loaiGiamGia === 0 ? '-' + format_curency(dataVoucher.giaTriGiam.toString()) + 'đ' : '-' + dataVoucher.giaTriGiam + '% (' + format_curency(tienGiamVoucherTheoPhanTram(dataVoucher.giaTriGiam, tienTamTinh(dataGioHangNew)).toString()) + 'đ)'
                                            }
                                        </span>
                                    </div>
                                </div>
                            )
                        }

                        {/* <div className='row'>
                            <div className='col-sm-6'>
                                <span style={{ float: 'left', fontSize: 16 }}>Mã giảm giá</span>
                                <span style={{ float: 'left', fontSize: 16, fontWeight: 'bold'}}>VOUCHER-123123</span>
                            </div>
                            <div className='col-sm-6'>
                                <br></br>
                                <span style={{ float: 'right', fontSize: 16, fontWeight: 'bold' }}>-100.000đ</span>
                            </div>
                        </div> */}

                        <hr></hr>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <span style={{ float: 'left', fontSize: 16 }}>Thành tiền</span>
                            </div>
                            <div className='col-sm-6'>
                                <span style={{ float: 'right', fontSize: 24, fontWeight: 'bold', color: 'red' }}>{format_curency(tinhThanhTien(tienTamTinh(dataGioHangNew), dataVoucher).toString())}đ</span>
                            </div>
                        </div>
                    </div>
                    <Link to='shipping' onClick={(e) => {
                        if (dataGioHang.length === 0) {
                            e.preventDefault();
                            alert('Chưa có sản phẩm nào trong giỏ hàng');
                        } else {
                            if (cookie.token === undefined) {
                                e.preventDefault();
                                dispatch({ type: 'SHOW_MODAL_DANGNHAP_DANGKY' })
                            }
                        }
                    }}>
                        <Button style={{ width: '100%', height: 50, marginTop: 20 }}>Tiến hành đặt hàng</Button>
                    </Link>
                    <div className='col' style={{ marginTop: 20 }}>
                        <span style={{ fontSize: 16, fontWeight: 'bold' }}>Mã giảm giá / Quà tặng</span>
                        <hr></hr>
                        <Search
                            placeholder="Nhập mã ở đây"
                            enterButton="Kiểm tra"
                            size="large"
                            onSearch={(value) => {
                                KiemTraVoucher(value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}