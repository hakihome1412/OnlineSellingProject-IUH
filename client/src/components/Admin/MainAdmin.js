import React, { Fragment, useState, useEffect } from 'react';
import { ListGroup, Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { axios } from '../../config/constant';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { QLCarouselComponent, QLBannerComponent, QLGianHangComponent, QLNguoiDungComponent, QLCategoryComponent, QLBrandComponent, QLProductComponent, QLDonHangComponent } from '../allJS';
import { Dropdown, Menu } from 'antd';


export default function MainAdmin() {
    const [cookies, setCookies, removeCookies] = useCookies();
    const isAdminReducer = useSelector(state => state.isAdmin);
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const [dataUser, setDataUser] = useState({
        _id: '',
        email: '',
        thongTinShop: {
            idShop: '',
            ten: '',
            moTa: '',
            diaChi: '',
            logoShop: '',
            img: {
                carousel: [],
                banner1: '',
                banner2: ''
            }
        }
    });
    const idUser = cookies.userID;
    const [useChucNangAd, setUseChucNangAd] = useState({
        QlCarousel: false,
        QlBanner: false,
        QlCategory: false,
        QlBrand: false,
        QlProduct: false
    });
    const menu = (
        <Menu>
            <Menu.Item >
                Đổi mật khẩu
          </Menu.Item>
            <Menu.Item onClick={() => {
                removeCookies('token');
                removeCookies('userID');
                window.location.pathname = '/';
            }}>
                Đăng xuất
          </Menu.Item>
        </Menu>
    );

    async function LayDataUserTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataUser({
                _id: resData.data.data._id,
                email: resData.data.data.email,
                thongTinShop: {
                    idShop: resData.data.data.thongTinShop.idShop,
                    ten: resData.data.data.thongTinShop.ten,
                    moTa: resData.data.data.thongTinShop.moTa,
                    diaChi: resData.data.data.thongTinShop.diaChi,
                    logoShop: resData.data.data.thongTinShop.logoShop,
                    img: {
                        carousel: resData.data.data.thongTinShop.img.carousel,
                        banner1: resData.data.data.thongTinShop.img.banner1,
                        banner2: resData.data.data.thongTinShop.img.banner2
                    }
                }
            });
        } else {
            alert("Lấy data thất bại");
        }
    }


    async function KiemTraTokenAdmin() {
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

    useEffect(() => {
        KiemTraTokenAdmin();
        LayDataUserTheoIDUser(idUser);
        dispatch({ type: 'SHOW_HEADER' });
    }, [])



    return (
        <Fragment>
            <div className="container-fluid" style={{ marginTop: '100px' }}>
                {/* <div className='row' style={{ float: 'right', marginRight: 20 }}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button size='large' style={{ marginTop: 15 }}>
                            {dataUser.email} <DownOutlined />
                        </Button>
                    </Dropdown>
                </div> */}
                <div className="row">
                    <div className="col-sm-2" style={{ height: 800, backgroundColor: '#3399FF', borderRadius: 20 }}>
                        <div style={{ padding: 20, color: 'white' }}>
                            <h4><center>Chức năng Admin</center></h4>
                        </div>
                        <div>
                            <ListGroup>
                                <Link to={`${match.url}/qlcarousel`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Carousel
                                    </ListGroup.Item>
                                </Link>


                                <Link to={`${match.url}/qlbanner`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Banner
                                    </ListGroup.Item>
                                </Link>


                                <Link to={`${match.url}/qlcategory`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Category
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlbrand`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Brand
                                    </ListGroup.Item>
                                </Link>


                                <Link to={`${match.url}/qlproduct`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Sản Phẩm
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qldonhang`} style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Đơn Hàng
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlgianhang`} style={{ textDecoration: 'none' }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Gian Hàng
                                    </ListGroup.Item>
                                </Link>
                                <Link to={`${match.url}/qlnguoidung`} style={{ textDecoration: 'none' }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Người Dùng
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </div>
                    </div>
                    {
                        isAdminReducer === true && (
                            <Switch>
                                <Route exact path={`${match.url}/qlcategory`} component={QLCategoryComponent}></Route>
                                <Route exact path={`${match.url}/qlcarousel`} component={QLCarouselComponent}></Route>
                                <Route exact path={`${match.url}/qlbrand`} component={QLBrandComponent}></Route>
                                <Route exact path={`${match.url}/qlbanner`} component={QLBannerComponent}></Route>
                                <Route exact path={`${match.url}/qlproduct`} component={QLProductComponent}></Route>
                                <Route exact path={`${match.url}/qldonhang`} component={QLDonHangComponent}></Route>
                                <Route exact path={`${match.url}/qlgianhang`} component={QLGianHangComponent}></Route>
                                <Route exact path={`${match.url}/qlnguoidung`} component={QLNguoiDungComponent}></Route>
                            </Switch>
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}
