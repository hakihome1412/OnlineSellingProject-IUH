import React, { Fragment, useState, useEffect } from 'react';
import { ListGroup, Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { axios } from '../../config/constant';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {QLBaiVietComponent,  QLGianHangComponent, QLNguoiDungComponent, QLCategoryComponent, QLBrandComponent, QLProductComponent, QLDonHangComponent } from '../allJS';
import { Dropdown, Menu } from 'antd';


export default function MainAdmin() {
    const [cookies, setCookies, removeCookies] = useCookies();
    const isAdminReducer = useSelector(state => state.isAdmin);
    const match = useRouteMatch();
    const dispatch = useDispatch();


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
        dispatch({ type: 'SHOW_HEADER' });
    }, [])



    return (
        <Fragment>
            <div className="container-fluid" style={{ marginTop: '50px' }}>
                <div className="row">
                    <div className="col-sm-2" style={{ height: 800, backgroundColor: '#3399FF', borderRadius: 20 }}>
                        <div style={{ padding: 20, color: 'white' }}>
                            <h4><center>Chức năng Admin</center></h4>
                        </div>
                        <div>
                            <ListGroup>
                                <Link to={`${match.url}/qlbaiviet`} style={{ textDecoration: 'none' }} onClick={(e) => {
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
                                        Quản lý Bài viết
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
                                        Quản lý Danh mục
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
                                        Quản lý Thương hiệu
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
                                        Quản lý Sản phẩm
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
                                        Quản lý Đơn hàng
                                    </ListGroup.Item>
                                </Link>

                                <Link to={`${match.url}/qlgianhang`} style={{ textDecoration: 'none' }} onClick={(e) => {
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
                                        Quản lý Gian hàng
                                    </ListGroup.Item>
                                </Link>
                                <Link to={`${match.url}/qlnguoidung`} style={{ textDecoration: 'none' }} onClick={(e) => {
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
                                        Quản lý Người dùng
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </div>
                    </div>
                    {
                        isAdminReducer === true && (
                            <Switch>
                                <Route exact path={`${match.url}/qlcategory`} component={QLCategoryComponent}></Route>
                                <Route exact path={`${match.url}/qlbrand`} component={QLBrandComponent}></Route>
                                <Route exact path={`${match.url}/qlproduct`} component={QLProductComponent}></Route>
                                <Route exact path={`${match.url}/qldonhang`} component={QLDonHangComponent}></Route>
                                <Route exact path={`${match.url}/qlgianhang`} component={QLGianHangComponent}></Route>
                                <Route exact path={`${match.url}/qlnguoidung`} component={QLNguoiDungComponent}></Route>
                                <Route exact path={`${match.url}/qlbaiviet`} component={QLBaiVietComponent}></Route>
                            </Switch>
                        )
                    }
                </div>
            </div>
        </Fragment >
    )
}
