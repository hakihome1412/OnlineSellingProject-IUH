import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { DatePicker } from 'antd';
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

export default function DangKyComponent() {
    const dataNgay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const dataThang = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const dataNam = [];
    const [cookies,setCookies] = useCookies();
    const dispatch = useDispatch()
    let minOffset = 0, maxOffset = 120;
    let thisYear = (new Date()).getFullYear();
    for (let x = 0; x <= maxOffset; x++) {
        dataNam.push(thisYear - x)
    }
    const [dataNgaySinh, setDataNgaySinh] = useState({
        ngay: 0,
        thang: 0,
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

    function KiemTraDuLieuNhap(data){
        if(data.ten === '' || data.email === '' || data.sdt ==='' || data.cmnd === '' || data.gioiTinh === '' || data.matKhau === ''){
            return false
        }

        return true
    }

    async function XuLyDangNhap() {
        await axios.post('hethong/auth', {
            tenTaiKhoan: dataDangKy.email,
            matKhau: dataDangKy.matKhau
        }).then(function (res) {
            if (res.data.status === "success") {
                setCookies('userID', res.data.userID, { path: '/' });
                setCookies('token', res.data.token, { path: '/' });
                if (res.data.vaiTro === 0) {
                    window.location.pathname = "/admin";
                } else {
                    window.location.reload();              
                }
            } else {
                alert(res.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        })

    }

    async function TaoTaiKhoan(){
        let res = await axios.post('hethong/users-them',{
        ten: dataDangKy.ten,
        email: dataDangKy.email,
        sdt: dataDangKy.sdt,
        cmnd: dataDangKy.cmnd,
        ngaySinh: dataDangKy.ngaySinh,
        gioiTinh: dataDangKy.gioiTinh,
        taiKhoan:{
            tenTaiKhoan:dataDangKy.email,
            matKhau:dataDangKy.matKhau
        },
        vaiTro: 2,
        isLock:false,
        isDelete:false
        })

        if(res.data.status === 'success'){
            alert('Đăng ký thành công');
            dispatch({type:'CLOSE_MODAL_DANGNHAP_DANGKY'});
            XuLyDangNhap();
        }else{
            alert(res.data.message);
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-4" style={{ height: 600, padding: 40 }}>
                    <h3>Đăng Ký</h3>
                    <span style={{ color: 'grey' }}>Tạo tài khoản để theo dõi đơn hàng, lưu
                                    danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</span>
                </div>
                <div className="col-sm-8" style={{ height: 600, padding: 40, borderLeft: 1 }}>
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
                                            <option value={0}>Tháng</option>
                                            {
                                                dataThang.map((item, i) => {
                                                    return <option key={i} value={item}>{item}</option>
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
                                <Button variant="danger" block onMouseOver={()=>{
                                    setDataDangKy({
                                        ...dataDangKy,
                                        ngaySinh: new Date(dataNgaySinh.nam,dataNgaySinh.thang,dataNgaySinh.ngay)
                                    })
                                }}
                                onClick={()=>{
                                    if(KiemTraDuLieuNhap(dataDangKy) === false){
                                        alert('Vui lòng nhập đủ dữ liệu');
                                    }else{
                                        TaoTaiKhoan()
                                        console.log(dataDangKy);
                                    }
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
