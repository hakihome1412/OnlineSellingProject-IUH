import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Dropdown, Tabs, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { storage } from "../../firebase/firebase";
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { BanHang_TrangChuComponent, BanHang_DanhSachSanPhamComponent, BanHang_TaoMoiSanPhamComponent, BanHang_DonHangComponent } from '../allJS'

export default function BanHang() {
    const { SubMenu } = Menu;
    const match = useRouteMatch();
    const [cookie, setCookie, removeCookies] = useCookies();

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
    const dispatch = useDispatch();
    let history = useHistory();

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
    const idUser = cookie.userID;

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

    useEffect(() => {
        LayDataUserTheoIDUser(idUser);
        dispatch({ type: 'CLOSE_HEADER' });
    }, [])

    useEffect(() => {
        setCookie('shopID', dataUser.thongTinShop.idShop);
    }, [dataUser])

    return (
        <div className='row' style={{ marginRight: 0 }}>
            <Fragment>
                <div className='col-sm-2'>
                    <div style={{ height: 70, width: 310, backgroundColor: '#003366' }}>
                        <Link to='/'>
                            <div className='row' style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <img alt="" src='/logo.png' width="50" height="70" />
                                <span style={{ fontWeight: 'bold', color: 'orange', fontSize: 28 }}>TiemDo</span>
                            </div>
                        </Link>
                    </div>
                    <Menu mode="inline" theme="dark" style={{ width: 310, height: 600 }}>
                        <Menu.Item key="0" onClick={() => {
                            history.push(`${match.url}/trang-chu`);
                        }}>Trang chủ</Menu.Item>
                        <Menu.Item key="1" onClick={() => {
                            history.push(`${match.url}/don-hang`);
                        }}>Đơn hàng</Menu.Item>
                        <SubMenu key="sub1" title="Sản phẩm">
                            <Menu.Item key="2" onClick={() => {
                                history.push(`${match.url}/danh-sach-san-pham`);
                            }}>Danh sách sản phẩm</Menu.Item>
                            <Menu.Item key="3" onClick={() => {
                                history.push(`${match.url}/tao-moi-san-pham`);
                            }}>Tạo mới/ Đăng mới sản phẩm</Menu.Item>
                            <Menu.Item key="4" onClick={() => {
                            }}>Báo cáo tồn kho</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title="Quảng cáo">
                            <Menu.Item key="5">Danh sách giảm giá</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='col-sm-10'>
                    <div className='col'>
                        <div className='row' style={{ float: 'right' }}>
                            <Dropdown overlay={menu} placement="bottomCenter">
                                <Button size='large' style={{ marginTop: 15 }}>
                                    <img alt="" src='/logoshop.png' width="30" height="30" /> &nbsp; {dataUser.email} <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>

                        <div className='row' style={{ width: '95%', height: 'auto', marginLeft: 20 }}>
                            <Switch>
                                <Redirect exact from={match.url} to={`${match.url}/trang-chu`} />
                                <Route exact path={`${match.url}/trang-chu`} component={BanHang_TrangChuComponent}></Route>
                                <Route exact path={`${match.url}/don-hang`} component={BanHang_DonHangComponent}></Route>
                                <Route exact path={`${match.url}/danh-sach-san-pham`} component={BanHang_DanhSachSanPhamComponent}></Route>
                                <Route exact path={`${match.url}/tao-moi-san-pham`} component={BanHang_TaoMoiSanPhamComponent}></Route>
                            </Switch>

                        </div>

                    </div>
                </div>
            </Fragment>
        </div>
    )
}
