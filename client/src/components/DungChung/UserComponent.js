import React, { Fragment, useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function UserComponent() {
    const [cookies, setCookies, removeCookies] = useCookies();
    const isAdmin = useSelector(state => state.isAdmin);
    const [dataUser,setDataUser]=useState({});

    async function LayDataUserTheoID(userID){
        let res = await axios.get('hethong/users-item?idUser='+userID);
        if(res.data.status ==='success'){
            setDataUser(res.data.data);
        }
    }

    useEffect(()=>{
        LayDataUserTheoID(cookies.userID)
    },[])

    return (
        <Fragment>
            <NavDropdown title={dataUser.email} id="basic-nav-dropdown">
                <NavDropdown.Item>Đơn hàng của tôi</NavDropdown.Item>
                <NavDropdown.Item>Thông báo của tôi</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    alert(isAdmin);
                }}>Tài khoản của tôi</NavDropdown.Item>
                <NavDropdown.Item onClick={() => {
                    removeCookies('token');
                    removeCookies('userID');      
                    window.location.pathname = '/';
                }}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
        </Fragment>
    )
}
