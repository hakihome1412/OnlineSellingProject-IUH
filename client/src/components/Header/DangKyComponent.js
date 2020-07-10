import React, { Fragment, useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { message } from 'antd';
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';

export default function DangKyComponent() {
    const dataNgay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const dataThang = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const dataNam = [];
    const [statusMessageError, setStatusMessageError] = useState(-1);
    const [tenLoi, setTenLoi] = useState('');
    const dispatch = useDispatch()
    let maxOffset = 120;
    let thisYear = (new Date()).getFullYear();
    for (let x = 0; x <= maxOffset; x++) {
        dataNam.push(thisYear - x)
    }
    const [dataNgaySinh, setDataNgaySinh] = useState({
        ngay: 0,
        thang: -1,
        nam: 0
    })
    const [dataDangKy, setDataDangKy] = useState({
        ten: '',
        email: '',
        sdt: '',
        cmnd: '',
        ngaySinh: '',
        gioiTinh: '',
        matKhau: '',
        vaiTro: 2
    })


    function KiemTraDuLieuNhap(data) {
        const regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const regSDT = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
        const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
        const dateNow = new Date();
        const dateNow_SoSanh = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate());
        var dateNgaySinh;
        if (data.ten.trim().length === 0 || data.email === '' || data.sdt === '' || data.cmnd === '' || data.gioiTinh === '' || data.matKhau === '' || dataNgaySinh.ngay === 0 || dataNgaySinh.thang === -1 || dataNgaySinh.nam === 0) {
            setStatusMessageError(0);
        } else {
            dateNgaySinh = new Date(dataNgaySinh.nam, dataNgaySinh.thang, dataNgaySinh.ngay);
            if (!regEmail.test(data.email)) {
                setStatusMessageError(1);
            } else {
                if (!regSDT.test(data.sdt)) {
                    setStatusMessageError(2);
                } else {
                    if (dateNgaySinh > dateNow_SoSanh) {
                        setStatusMessageError(3);
                    } else {
                        if (!regPass.test(data.matKhau)) {
                            setStatusMessageError(4);
                        } else {
                            setStatusMessageError(-1);
                            KhoiTaoTaiKhoan();
                            setTenLoi("");
                        }
                    }

                }
            }

        }
    }

    async function KhoiTaoTaiKhoan() {
        let res = await axios.post('hethong/auth/register', {
            ten: dataDangKy.ten,
            email: dataDangKy.email,
            sdt: dataDangKy.sdt,
            cmnd: dataDangKy.cmnd,
            ngaySinh: dataDangKy.ngaySinh,
            gioiTinh: dataDangKy.gioiTinh,
            taiKhoan: {
                tenTaiKhoan: dataDangKy.email,
                matKhau: dataDangKy.matKhau
            },
            vaiTro: 2,
            isLock: false,
            isDelete: false
        })

        if (res.data.status === 'success') {
            message.success(res.data.message);
            dispatch({ type: 'CLOSE_MODAL_DANGNHAP_DANGKY' });
        } else {
            dispatch({ type: 'CLOSE_MODAL_DANGNHAP_DANGKY' });
            message.error(res.data.message);
        }
    }

    useEffect(() => {
        setStatusMessageError(-1);
    }, [])

    useEffect(() => {
        if (statusMessageError !== -1) {
            if (statusMessageError === 0) {
                setTenLoi("Thông tin đăng ký tài khoản không hợp lệ. Vui lòng kiểm tra lại");
            }
            if (statusMessageError === 1) {
                setTenLoi("Thông tin email không hợp lệ");
            }
            if (statusMessageError === 2) {
                setTenLoi("Thông tin số điện thoại không hợp lệ");
            }
            if (statusMessageError === 3) {
                setTenLoi("Ngày sinh phải nhỏ hơn ngày hiện tại");
            }
            if (statusMessageError === 4) {
                setTenLoi("Mật khẩu không đúng định dạng");
            }
        }
    }, [statusMessageError])

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-4" style={{ height: 'auto', padding: 40 }}>
                    <h3>Đăng Ký</h3>
                    <span style={{ color: 'grey' }}>Tạo tài khoản để theo dõi đơn hàng, lưu
                                    danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</span>
                </div>
                <div className="col-sm-8" style={{ height: 'auto', padding: 40, borderLeft: 1 }}>
                    <Form>
                        <Form.Group as={Row} controlId="formBasicHoTen">
                            <Form.Label column sm={3}>Họ tên</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nhập họ tên" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        ten: e.target.value
                                    })
                                }} />
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicSdt">
                            <Form.Label column sm={3}>SĐT</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nhập số điện thoại" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        sdt: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="email" placeholder="Nhập email" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        email: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicCMND">
                            <Form.Label column sm={3}>Chứng minh thư</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nhập chứng minh nhân dân" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        cmnd: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPass">
                            <Form.Label column sm={3}>Mật khẩu</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password" placeholder="Nhập mật khẩu" onChange={(e) => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        matKhau: e.target.value
                                    })
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}>Giới tính</Form.Label>
                            <Col sm={9}>
                                <Row>
                                    <Form.Check type="radio" label="Nữ" name="radioGioiTinh" id="formHorizontalRadios2" style={{ marginLeft: 100 }} onClick={() => {
                                        setDataDangKy({
                                            ...dataDangKy,
                                            gioiTinh: 0
                                        })
                                    }} />
                                    <Form.Check type="radio" label="Nam" name="radioGioiTinh" id="formHorizontalRadios1" style={{ marginLeft: 15 }} onClick={() => {
                                        setDataDangKy({
                                            ...dataDangKy,
                                            gioiTinh: 1
                                        })
                                    }} />
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPass">
                            <Form.Label column sm={3}>Ngày sinh</Form.Label>
                            <Col sm={9}>
                                <Row>
                                    <Col sm={4}>
                                        <Form.Control as="select" value={dataNgaySinh.ngay} onChange={(e) => {
                                            setDataNgaySinh({
                                                ...dataNgaySinh,
                                                ngay: e.target.value
                                            })
                                        }}>
                                            <option value={0}>Ngày</option>
                                            {
                                                dataNgay.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Control as="select" value={dataNgaySinh.thang} onChange={(e) => {
                                            setDataNgaySinh({
                                                ...dataNgaySinh,
                                                thang: e.target.value
                                            })
                                        }}>
                                            <option value={-1}>Tháng</option>
                                            {
                                                dataThang.map((item, i) => {
                                                    return <option key={i} value={item}>{(item + 1).toString()}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col sm={4}>
                                        <Form.Control as="select" value={dataNgaySinh.nam} onChange={(e) => {
                                            setDataNgaySinh({
                                                ...dataNgaySinh,
                                                nam: e.target.value
                                            })
                                        }}>
                                            <option value={0}>Năm</option>
                                            {
                                                dataNam.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}></Form.Label>
                            <Col sm={9}>

                                <p style={{ color: 'red', lineHeight: 1.5 }}>{tenLoi}</p>

                                <Button variant="danger" block onMouseOver={() => {
                                    setDataDangKy({
                                        ...dataDangKy,
                                        ngaySinh: new Date(dataNgaySinh.nam, dataNgaySinh.thang, dataNgaySinh.ngay)
                                    })
                                }}
                                    onClick={() => {
                                        KiemTraDuLieuNhap(dataDangKy);
                                    }}>
                                    Đăng Ký
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
