import React, { Fragment, useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

export default function DangNhapComponent() {
    const [taiKhoan, setTaiKhoan] = useState({
        tenTaikhoan: "",
        matKhau: ""
    });

    const [cookies, setCookies] = useCookies();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [duLieuOK, setDuLieuOK] = useState(false);

    function checkOK(txtTaiKhoan) {
        var filterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filterEmail.test(txtTaiKhoan)) {
            setDuLieuOK(true);
        } else {
            setDuLieuOK(false);
        }
    }

    async function XuLyDangNhap() {
        setLoading(true);
        await axios.post('hethong/auth', {
            tenTaiKhoan: taiKhoan.tenTaikhoan,
            matKhau: taiKhoan.matKhau
        }).then(function (res) {
            if (res.data.status === "success") {
                setLoading(false);
                setCookies('userID', res.data.userID, { path: '/' });
                setCookies('token', res.data.token, { path: '/' });
                if (res.data.vaiTro === 0) {
                    window.location.pathname = "/admin";
                    alert("Đăng nhập thành công");
                } else {
                    alert("Đăng nhập thành công");
                    window.location.reload();              
                }
            } else {
                setLoading(false);
                alert(res.data.message);
            }
        }).catch(function (error) {
            console.log(error);
        })

    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-4" style={{ height: 600, padding: 40 }}>
                    <h3>Đăng Nhập</h3>
                    <span style={{ color: 'grey' }}>Đăng nhập để theo dõi đơn hàng, lưu
                                    danh sách sản phẩm yêu thích, nhận nhiều ưu đãi hấp dẫn.</span>
                </div>
                <div className="col-sm-8" style={{ height: 600, padding: 40 }}>
                    <Form style={{ fontSize: 14, padding: 0, margin: 0 }}>
                        <Form.Group as={Row} controlId="formBasicEmail">
                            <Form.Label column sm={3}>Email</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Nhập email" onChange={(e) => {
                                    setTaiKhoan({
                                        ...taiKhoan,
                                        tenTaikhoan: e.target.value
                                    });
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formBasicPassword">
                            <Form.Label column sm={3}>Mật khẩu</Form.Label>
                            <Col sm={9}>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => {
                                    setTaiKhoan({
                                        ...taiKhoan,
                                        matKhau: e.target.value
                                    });
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm={3}></Form.Label>
                            <Col sm={9}>
                                <Button variant="danger" type="submit" block onClick={(e) => {
                                    e.preventDefault();
                                    if (duLieuOK == true) {
                                        XuLyDangNhap();
                                    } else {
                                        alert("Dữ liệu nhập không hợp lệ");
                                    }
                                }}
                                    onMouseOver={() => {
                                        checkOK(taiKhoan.tenTaikhoan);
                                    }}>
                                    {loading == false ? "Đăng Nhập" : (<Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>)}
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </Fragment>

    )
}
