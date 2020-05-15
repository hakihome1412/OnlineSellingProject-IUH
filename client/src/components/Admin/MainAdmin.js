import React, { Fragment, useState, useEffect } from 'react';
import { ListGroup, Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { axios } from '../../config/constant';
import { useDispatch, useSelector } from 'react-redux';
import { QLCarouselComponent, QLBannerComponent, QLCategoryComponent, QLBrandComponent,QLProductComponent } from '../allJS';


export default function MainAdmin() {
    const [cookies, setCookies, removeCookies] = useCookies();
    const isAdminReducer = useSelector(state => state.isAdmin);
    const dispatch = useDispatch();
    const [useChucNangAd, setUseChucNangAd] = useState({
        QlCarousel: false,
        QlBanner: false,
        QlCategory: false,
        QlBrand: false,
        QlProduct:false
    });


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
    }, [])



    return (
        <Fragment>


            <div className="container-fluid" style={{ marginTop: '100px' }}>
                <div className="row">
                    <div className="col-sm-2" style={{ height: 800, backgroundColor: '#3399FF', borderRadius: 20 }}>
                        <div style={{ padding: 20, color: 'white' }}>
                            <h4><center>Chức năng Admin</center></h4>
                        </div>
                        <div>
                            <ListGroup>
                                <Link to="/admin/qlcarousel" style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                    setUseChucNangAd({
                                        QlCarousel: true,
                                        QlBanner: false,
                                        QlCategory: false,
                                        QlBrand: false,
                                        QlProduct:false
                                    });
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Carousel
                                    </ListGroup.Item>
                                </Link>


                                <Link to="/admin/qlbanner" style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                    setUseChucNangAd({
                                        QlCarousel: false,
                                        QlBanner: true,
                                        QlCategory: false,
                                        QlBrand: false,
                                        QlProduct:false
                                    });
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Banner
                                    </ListGroup.Item>
                                </Link>


                                <Link to="/admin/qlcategory" style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                    setUseChucNangAd({
                                        QlCarousel: false,
                                        QlBanner: false,
                                        QlCategory: true,
                                        QlBrand: false,
                                        QlProduct:false
                                    });
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Category
                                    </ListGroup.Item>
                                </Link>

                                <Link to="/admin/brands" style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                    setUseChucNangAd({
                                        QlCarousel: false,
                                        QlBanner: false,
                                        QlCategory: false,
                                        QlBrand: true,
                                        QlProduct:false
                                    });
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Brand
                                    </ListGroup.Item>
                                </Link>


                                <Link to="/admin/products" style={{ textDecoration: 'none' }} onClick={(e) => {
                                    if (cookies.userID === undefined) {
                                        e.preventDefault();
                                        alert("Vui lòng đăng nhập để sử dụng chức năng");
                                    } else {
                                        if (isAdminReducer === false) {
                                            e.preventDefault();
                                            alert("Vui lòng đăng nhập tài khoản Admin để sử dụng chức năng này")
                                        }

                                    }
                                    setUseChucNangAd({
                                        QlCarousel: false,
                                        QlBanner: false,
                                        QlCategory: false,
                                        QlBrand: false,
                                        QlProduct:true
                                    });
                                }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Sản Phẩm
                                    </ListGroup.Item>
                                </Link>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý Shop
                                    </ListGroup.Item>
                                </Link>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <ListGroup.Item style={{ marginTop: 10 }}>
                                        Quản lý User
                                    </ListGroup.Item>
                                </Link>
                            </ListGroup>
                        </div>
                    </div>
                    {
                        isAdminReducer === true && useChucNangAd.QlCarousel === true && (
                            <QLCarouselComponent></QLCarouselComponent>
                        )
                    }

                    {
                        isAdminReducer === true && useChucNangAd.QlBanner === true && (
                            <QLBannerComponent></QLBannerComponent>
                        )
                    }

                    {
                        isAdminReducer === true && useChucNangAd.QlCategory === true && (
                            <QLCategoryComponent></QLCategoryComponent>
                        )
                    }

                    {
                        isAdminReducer === true && useChucNangAd.QlBrand === true && (
                            <QLBrandComponent></QLBrandComponent>
                        )
                    }

{
                        isAdminReducer === true && useChucNangAd.QlProduct === true && (
                            <QLProductComponent></QLProductComponent>
                        )
                    }

                </div>
            </div>
        </Fragment>
    )
}
