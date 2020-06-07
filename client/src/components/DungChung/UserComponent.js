import React, { Fragment, useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { useHistory } from 'react-router-dom';

export default function UserComponent() {
    const [cookies, setCookies, removeCookie] = useCookies();
    const isAdminReducer = useSelector(state => state.isAdmin);
    const [dataUser, setDataUser] = useState({});
    var history = useHistory();
    const dispatch = useDispatch();

    async function LayDataUserTheoID(userID) {
        let res = await axios.get('hethong/users-item?idUser=' + userID);
        if (res.data.status === 'success') {
            setDataUser(res.data.data);
        } else {
            alert('Lấy data User thất bại');
        }
    }


    useEffect(() => {
        LayDataUserTheoID(cookies.userID);
    }, [])

    return (
        <Fragment>
            <NavDropdown title={dataUser.email} id="basic-nav-dropdown">
                {
                    isAdminReducer && (
                        <NavDropdown.Item onClick={() => {
                            history.push('/admin');
                        }}>Trang quản lý</NavDropdown.Item>
                    )
                }
                <NavDropdown.Item onClick={() => {
                    history.push('/customer/account');
                }}>Tài khoản của tôi</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    history.push('/customer/order');
                }}>Đơn hàng của tôi</NavDropdown.Item>
                <NavDropdown.Item>Thông báo của tôi</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    removeCookie('token');
                    removeCookie('userID');
                    window.location.pathname = '/';
                }}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
        </Fragment>
    )
}
