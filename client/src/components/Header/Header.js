import React, { useState, Fragment, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { DangKyComponent, DangNhapComponent, UserComponent } from '../allJS';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Badge } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { axios } from '../../config/constant';

function Header() {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies();
    const [dataGioHang, setDataGioHang] = useState(JSON.parse(localStorage.getItem('dataGioHang')));
    const statusThayDoiGioHang = useSelector(state => state.statusThayDoiGioHang);
    const showModalDangNhapDangKy = useSelector(state => state.showModalDangNhapDangKy);
    const history = useHistory();

    useEffect(() => {
        setDataGioHang(JSON.parse(localStorage.getItem('dataGioHang')));
    }, [statusThayDoiGioHang]);

    function tinhTongSanPhamTrongGioHang(data) {
        var tong = 0;
        for (let index = 0; index < data.length; index++) {
            tong += data[index].soLuong;
        }
        return parseInt(tong);
    }

    return (
        <Fragment>
            <Navbar bg="light" variant="light" fixed="top">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src='/logo.png'
                        width="40"
                        height="40"
                        style={{ marginRight: 5 }}
                        className="d-inline-block"
                    />
                    <span style={{ fontWeight: 'bold', color: 'orange' }}>TiemDo</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Trang Chủ</Nav.Link>
                        <Nav.Link href="/banhang" onClick={(e) => {
                            if (cookies.token === undefined) {
                                e.preventDefault();
                                dispatch({ type: 'SHOW_MODAL_DANGNHAP_DANGKY' });
                            }
                        }}>Shop Của Bạn</Nav.Link>
                    </Nav>
                    <Form inline style={{ marginLeft: '18%' }}>
                        <FormControl type="text" placeholder="Search" style={{ width: 300 }} className="mr-sm-1" />
                        <Button variant="outline-success">Tìm Kiếm</Button>
                    </Form>
                    <Nav style={{ marginLeft: '22%' }}>
                        <Nav.Link href="/checkout/cart"><Badge count={tinhTongSanPhamTrongGioHang(dataGioHang)} style={{ width: 4, height: 16, paddingRight: 20, paddingTop: 3, alignSelf: 'center' }}><i className="fa fa-shopping-cart" style={{ fontSize: 25 }}></i></Badge></Nav.Link>
                        {/* <Nav.Link onClick={handleShowModal} >Đăng Ký / Đăng Nhập</Nav.Link> */}

                        {cookies.token === undefined ?
                            (<Nav.Link onClick={() => {
                                dispatch({ type: 'SHOW_MODAL_DANGNHAP_DANGKY' });
                            }} >Đăng Ký / Đăng Nhập</Nav.Link>) : (<UserComponent></UserComponent>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Modal show={showModalDangNhapDangKy} size="lg" onHide={() => {
                dispatch({ type: 'CLOSE_MODAL_DANGNHAP_DANGKY' });
            }} animation={false}>
                <Tabs defaultActiveKey="dangnhap" id="uncontrolled-tab-example">
                    <Tab eventKey="dangnhap" title="Đăng Nhập">
                        <DangNhapComponent></DangNhapComponent>
                    </Tab>
                    <Tab eventKey="dangky" title="Đăng Ký">
                        <DangKyComponent></DangKyComponent>
                    </Tab>
                </Tabs>
            </Modal>
        </Fragment>
    );
}

export default Header;