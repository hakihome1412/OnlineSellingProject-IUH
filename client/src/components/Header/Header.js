import React, { useState, Fragment, useEffect } from 'react';
import { Navbar, Nav, Form, Button, Modal, Tab, Tabs, Table } from 'react-bootstrap';
import { DangKyComponent, DangNhapComponent, UserComponent } from '../allJS';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Badge, message, Dropdown, Menu } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { axios } from '../../config/constant';

function Header() {
    const dispatch = useDispatch();
    const [cookies, setCookies] = useCookies();
    const [dataGioHang, setDataGioHang] = useState(JSON.parse(localStorage.getItem('dataGioHang')));
    const [dataGioHangNew, setDataGioHangNew] = useState([]);
    const [dataLichSuTimKiem, setDataLichSuTimKiem] = useState([]);
    const [dataTimKiemGoiY, setDataTimKiemGoiY] = useState([]);
    const statusThayDoiGioHang = useSelector(state => state.statusThayDoiGioHang);
    const showModalDangNhapDangKy = useSelector(state => state.showModalDangNhapDangKy);
    const isAdminReducer = useSelector(state => state.isAdmin);
    const [countProductInCart, setCountProductInCart] = useState(0);
    const history = useHistory();
    const [userID, setUserID] = useState('');
    const valueSearch = useSelector(state => state.valueSearch);
    const menu = (
        <Menu>
            <span style={{ padding: 10 }}><strong>TỪ KHÓA HOT</strong></span>
            {
                dataTimKiemGoiY.map((item, i) => {
                    return <Menu.Item key={i} style={{ height: 30 }}>
                        <Link to='/' onClick={(e) => {
                            e.preventDefault();
                            history.push('/timkiem?data=' + item.ten + '&order=newest');
                            dispatch({ type: 'VALUE_SEARCH', valueSearch: item.ten });
                        }}>
                            <div style={{ width: '100%' }}>
                                <span>{item.ten}</span>
                            </div>
                        </Link>
                    </Menu.Item>
                })
            }

            <span style={{ padding: 10 }}><strong>LỊCH SỬ TÌM KIẾM</strong></span>
            {
                cookies.userID !== undefined && (
                    dataLichSuTimKiem.map((item, i) => {
                        return <Menu.Item style={{ height: 30 }}>
                            <Link to='/' onClick={(e) => {
                                e.preventDefault();
                                history.push('/timkiem?data=' + item.ten + '&order=newest');
                                dispatch({ type: 'VALUE_SEARCH', valueSearch: item.ten });
                            }}>
                                <div style={{ width: '100%' }}>
                                    <span>{item.ten}</span>
                                </div>
                            </Link>
                        </Menu.Item>
                    })
                )
            }

        </Menu>
    );

    function getGioHangTheoIDUser() {
        var arrayGioHangNew = [];

        for (let index = 0; index < dataGioHang.length; index++) {
            if (dataGioHang[index].idUser === cookies.userID) {
                arrayGioHangNew.push(dataGioHang[index]);
            }
        }

        setCountProductInCart(tinhTongSanPhamTrongGioHang(arrayGioHangNew));

        setDataGioHangNew(arrayGioHangNew);
    }

    function tinhTongSanPhamTrongGioHang(data) {
        var tong = 0;
        for (let index = 0; index < data.length; index++) {
            tong += data[index].soLuong;
        }
        return parseInt(tong);
    }

    async function LayDataUserTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        if (resData.data.status === 'success') {
            if (resData.data.data.vaiTro === 2) {
                history.push('/dang-ky-gian-hang');
            } else {
                if (resData.data.data.vaiTro === 1) {
                    if (resData.data.data.thongTinShop.isLock === false) {
                        history.push('/banhang');
                    } else {
                        history.push('/error/403');
                    }
                } else {
                    history.push('/admin');
                }
            }
        } else {
            message.error("Lấy data user thất bại");
        }
    }

    async function CapNhatTimKiem() {
        let res = await axios.post('hethong/datasearch-capnhat', {
            search: valueSearch,
            id: cookies.userID
        })

        if (res.data.status === 'success') {
            message.success('Đã cập nhật data search');
        } else {
            message.error('Không cập nhật được trong database');
        }
    }

    async function LayDataTimKiemHot() {
        let res = await axios.get('hethong/datasearch-goiy');

        if (res.data.status === 'success') {
            setDataTimKiemGoiY(res.data.data);
        } else {
            message.error('Lấy data tìm kiếm hot gợi ý thất bại');
        }
    }

    async function LayDataLichSuTimKiem() {
        let res = await axios.get('hethong/datasearch-lichsutimkiem?id=' + cookies.userID);

        if (res.data.status === 'success') {
            setDataLichSuTimKiem(res.data.data);
        } else {
            message.error('Lấy data lịch sử tìm kiếm thất bại');
        }
    }

    async function KiemTraTokenAdmin() {
        if (cookies.token === undefined) {
            dispatch({ type: 'NO_ADMIN' });
        } else {
            await axios.get('hethong/auth/token-admin', { headers: { 'token': cookies.token } }).then(function (res) {
                if (res.data.status === "fail") {
                    dispatch({ type: 'NO_ADMIN' });
                } else {
                    dispatch({ type: 'ADMIN' });
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        if (statusThayDoiGioHang === false) {
            setDataGioHang(JSON.parse(localStorage.getItem('dataGioHang')));
        }
    }, [statusThayDoiGioHang]);

    useEffect(() => {
        if (userID !== '') {
            LayDataUserTheoIDUser(userID);
        }
    }, [userID])

    useEffect(() => {
        getGioHangTheoIDUser();
    }, [dataGioHang])

    useEffect(() => {
        LayDataTimKiemHot();
        KiemTraTokenAdmin();
    }, [])

    return (
        <Fragment>
            <Navbar bg="light" variant="light">
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
                        <Nav.Link onClick={(e) => {
                            if (cookies.token === undefined) {
                                e.preventDefault();
                                dispatch({ type: 'SHOW_MODAL_DANGNHAP_DANGKY' });
                            } else {
                                setUserID(cookies.userID);
                            }
                        }}>{isAdminReducer ? 'Trang Quản Lý' : 'Shop Của Bạn'}</Nav.Link>
                    </Nav>
                    <Form inline style={{ marginLeft: '18%' }}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Form.Control type="text" value={valueSearch} placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn" style={{ width: 480 }} className="mr-sm-1" onChange={(e) => {
                                dispatch({ type: 'VALUE_SEARCH', valueSearch: e.target.value });
                            }}
                                onClick={() => {
                                    if (cookies.userID !== undefined) {
                                        LayDataLichSuTimKiem();
                                    }
                                }} />
                        </Dropdown>
                        <Button variant="outline-success" onClick={() => {
                            if (valueSearch !== '') {
                                CapNhatTimKiem();
                                history.push('/timkiem?data=' + valueSearch + '&order=newest');
                            }
                        }}>Tìm Kiếm</Button>
                    </Form>
                    <Nav style={{ marginLeft: '22%' }}>
                        {
                            isAdminReducer === false && (
                                <Nav.Link href="/checkout/cart">
                                    <Badge count={cookies.token === undefined ? 0 : countProductInCart} style={{ width: 4, height: 16, paddingRight: 20, paddingTop: 3, alignSelf: 'center' }}>
                                        <i className="fa fa-shopping-cart" style={{ fontSize: 25 }}></i>
                                    </Badge>
                                </Nav.Link>
                            )
                        }
                        {cookies.token === undefined ?
                            (<Nav.Link onClick={() => {
                                dispatch({ type: 'SHOW_MODAL_DANGNHAP_DANGKY' });
                            }} >Đăng Ký / Đăng Nhập</Nav.Link>) : (<UserComponent></UserComponent>)
                        }
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