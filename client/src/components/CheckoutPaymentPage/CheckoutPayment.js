import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { Steps, Radio } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ids from 'short-id';
import { useCookies } from 'react-cookie';

export default function CheckoutPayment() {
    const dispatch = useDispatch();
    const [cookies,setCookie,removeCookie] = useCookies();
    const { Step } = Steps;
    const [valueRadioGiaoHang, setValueRadioGiaoHang] = useState(0);
    const [valueRadioThanhToan, setValueRadioThanhToan] = useState(0);
    const thongTinDatHang = useSelector(state => state.thongTinDatHang);
    const [dataVoucher, setDataVoucher] = useState({
        idShow: '',
        loaiGiamGia: '',
        giaTriGiam: ''
    });
    const [idVoucher, setIdVoucher] = useState(localStorage.getItem('idVoucher'));
    const [dataGioHang, setDataGioHang] = useState(JSON.parse(localStorage.getItem('dataGioHang')));
    const steps = [
        {
            title: 'Đăng nhập',
        },
        {
            title: 'Địa chỉ giao hàng',
        },
        {
            title: 'Thanh toán & Đặt mua',
        },
    ];
    const [thongTinDonHang, setThongTinDonHang] = useState({
        idShow: '',
        thongTinNguoiMua: {
            hoTen: '',
            sdt: '',
            diaChi: ''
        },
        tongTien: '',
        soLuongSanPham: '',
        ngayTao: ''
    })

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    function tinhThanhTien(tienTamTinh, dataVoucher, tienShip) {
        var tienGiam = 0;
        if (dataVoucher === '') {
            return tienTamTinh;
        } else {
            if (dataVoucher.loaiGiamGia === 0) {
                tienGiam = parseInt(dataVoucher.giaTriGiam);
                return parseInt(tienTamTinh - tienGiam - tienShip);
            } else {
                tienGiam = parseInt(tienTamTinh * dataVoucher.giaTriGiam / 100);
                return parseInt(tienTamTinh - tienGiam - tienShip);
            }
        }
    }

    function tinhTienMoiSanPham(giaCuoiCung, soLuong) {
        var tien = parseInt(giaCuoiCung * soLuong);
        return tien;

    }

    function tienTamTinh(data) {
        var tien = 0;
        for (let index = 0; index < data.length; index++) {
            tien += data[index].soLuong * data[index].giaCuoiCung;
        }
        return parseInt(tien);
    }

    function tinhTongSanPhamTrongGioHang(data) {
        var tong = 0;
        for (let index = 0; index < data.length; index++) {
            tong += data[index].soLuong;
        }
        return parseInt(tong);
    }

    async function KiemTraVoucher(voucherID) {
        if (idVoucher !== undefined) {
            let res = await axios.get('hethong/vouchers-item-show?idShow=' + voucherID);

            if (res.data.status === 'success') {
                setDataVoucher({
                    idShow: res.data.data.idShow,
                    loaiGiamGia: res.data.data.loaiGiamGia,
                    giaTriGiam: res.data.data.giaTriGiam
                });
            }
        }

    }

    async function TaoDonHang(e, dataGioHang) {
        let res = await axios.post('hethong/orders-them', {
            idShow: thongTinDonHang.idShow,
            thongTinNguoiMua: {
                hoTen: thongTinDonHang.thongTinNguoiMua.hoTen,
                sdt: thongTinDonHang.thongTinNguoiMua.sdt,
                diaChi: thongTinDonHang.thongTinNguoiMua.diaChi
            },
            tongTien: thongTinDonHang.tongTien,
            soLuongSanPham: thongTinDonHang.soLuongSanPham,
            ngayTao: thongTinDonHang.ngayTao,
            idUser: cookies.userID,
            dataGioHang: dataGioHang
        });

        if (res.data.status === 'success') {
            alert('Đã tạo đơn hàng thành công');
            localStorage.setItem('dataGioHang','[]');
        } else {
            alert('Đã tạo đơn hàng thất bại');
            e.preventDefault();
        }
    }

    useEffect(() => {
        KiemTraVoucher(idVoucher);
        dispatch({ type: 'CLOSE_HEADER' });
    }, []);

    useEffect(() => {
        setThongTinDonHang({
            ...thongTinDonHang,
            idShow: 'ORDER-' + ids.generate().toUpperCase(),
            thongTinNguoiMua: {
                hoTen: thongTinDatHang.hoTen,
                sdt: thongTinDatHang.sdt,
                diaChi: thongTinDatHang.diaChi + ', phường ' + thongTinDatHang.phuong + ', ' + thongTinDatHang.quan + ', ' + thongTinDatHang.thanhPho
            },
            tongTien: tinhThanhTien(tienTamTinh(dataGioHang), dataVoucher, 0),
            soLuongSanPham: tinhTongSanPhamTrongGioHang(dataGioHang),
            ngayTao: new Date()
        })
    }, [dataGioHang])

    return (
        <div className="container" style={{ height: 'auto', padding: 20 }}>
            <div className='col'>
                <div>
                    <Steps current={2}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>
                <br></br>
                <br></br>
                <div className='row'>
                    <div className='col-sm-9'>
                        <div>
                            <h6>1. Chọn hình thức giao hàng</h6>
                            <div style={{ height: 'auto', paddingLeft: 20 }}>
                                <Radio.Group onChange={(e) => {
                                    setValueRadioGiaoHang(e.target.value);
                                }} value={valueRadioGiaoHang}>
                                    <Radio style={radioStyle} value={0}>
                                        Giao hàng tiêu chuẩn
                                </Radio>
                                    <Radio style={radioStyle} value={1} disabled>
                                        Giao hàng bằng GoViet
                                </Radio>
                                    <Radio style={radioStyle} value={2} disabled>
                                        Giao hàng bằng Grab
                                </Radio>
                                </Radio.Group>
                            </div>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <h6>2. Chọn hình thức thanh toán</h6>
                            <div style={{ height: 'auto', paddingLeft: 20 }}>
                                <Radio.Group onChange={(e) => {
                                    setValueRadioThanhToan(e.target.value);
                                }} value={valueRadioThanhToan}>
                                    <Radio style={radioStyle} value={0}>
                                        Thanh toán tiền mặt khi nhận hàng
                                </Radio>
                                    <Radio style={radioStyle} value={1} disabled>
                                        Thanh toán bằng thẻ quốc tế Visa,Master,JCB
                                </Radio>
                                    <Radio style={radioStyle} value={2} disabled>
                                        Thẻ ATM nội địa/Internet Banking
                                </Radio>
                                    <Radio style={radioStyle} value={3} disabled>
                                        Thanh toán bằng MoMo
                                </Radio>
                                </Radio.Group>
                            </div>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <h6 style={{ color: 'gray' }}>Thông tin người mua</h6>
                            <div className='col' style={{ height: 'auto', paddingLeft: 20 }}>
                                <div className='row'>
                                    <div className='col-sm-2'>
                                        <strong>Họ tên:</strong>
                                    </div>
                                    <div className='col-sm-6'>
                                        {thongTinDatHang.hoTen}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-sm-2'>
                                        <strong>Số điện thoại:</strong>
                                    </div>
                                    <div className='col-sm-6'>
                                        {thongTinDatHang.sdt}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-sm-2'>
                                        <strong>Địa chỉ:</strong>
                                    </div>
                                    <div className='col-sm-6'>
                                        {
                                            thongTinDatHang.diaChi + ', phường ' + thongTinDatHang.phuong + ', ' + thongTinDatHang.quan + ', ' + thongTinDatHang.thanhPho
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col' style={{ marginTop: 20 }}>
                            <Link to={'payment/success/'+thongTinDonHang.idShow} onClick={(e) => {
                                TaoDonHang(e, dataGioHang);
                            }}>
                                <Button style={{ width: 300 }} variant="danger" size='lg'>ĐẶT MUA</Button>
                            </Link>

                            <p style={{ marginTop: 5 }}>(Xin vui lòng kiểm tra lại đơn hàng trước khi Đặt mua)</p>
                        </div>
                    </div>
                    <div className='col-sm-3' style={{ height: 'auto', backgroundColor: '#F8F9FA' }}>
                        <div className='row' style={{ padding: 10 }}>
                            <span>Đơn hàng ({tinhTongSanPhamTrongGioHang(dataGioHang)} sản phẩm)</span>
                            <Link to='/checkout/cart' style={{ marginLeft: 85 }}>Sửa</Link>
                        </div>
                        <hr style={{ marginTop: 5 }}></hr>
                        <div className='col'>
                            {
                                dataGioHang.map((item, i) => {
                                    return <div className='row'>
                                        <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                            <strong>x{item.soLuong}</strong> {item.ten} {item.mauSac !== '' ? ' - ' + item.mauSac : ''} {item.size !== '' ? ' - ' + item.size : ''}
                                        </div>
                                        <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                            <span style={{ float: 'right', fontWeight: 'bold' }}>{format_curency(tinhTienMoiSanPham(item.giaCuoiCung, item.soLuong).toString())}đ</span>
                                        </div>
                                    </div>
                                })
                            }

                        </div>
                        <hr></hr>
                        <div className='col'>
                            <div className='row'>
                                <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                    Tạm tính
                                </div>
                                <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                    <span style={{ float: 'right', fontWeight: 'bold' }}>{format_curency(tienTamTinh(dataGioHang).toString())}đ</span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                    Voucher
                                </div>
                                <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                    <span style={{ float: 'right', fontWeight: 'bold' }}>
                                        {dataVoucher.idShow !== '' && (
                                            dataVoucher.loaiGiamGia === 0 ? '-' + format_curency(dataVoucher.giaTriGiam.toString()) + 'đ' : '-' + dataVoucher.giaTriGiam + '%'
                                        )}
                                        {
                                            dataVoucher.idShow === '' && ('-0đ')
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                    Phí vận chuyển
                                </div>
                                <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                    <span style={{ float: 'right', fontWeight: 'bold' }}>0đ</span>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='col'>
                            <div className='row'>
                                <div className='col-sm-8' style={{ height: 'auto', marginLeft: 0 }}>
                                    Thành tiền
                                </div>
                                <div className='col-sm-4' style={{ paddingRight: 10 }}>
                                    <span style={{ float: 'right', color: 'red', fontSize: 20, fontWeight: 'bold' }}>{format_curency(tinhThanhTien(tienTamTinh(dataGioHang), dataVoucher, 0).toString())}đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
