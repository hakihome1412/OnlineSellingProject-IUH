import React, { useState, useEffect } from 'react';
import { MarkettingComponent, DealComponent, HotSearchComponent, ForCustomerComponent } from '../allJS';
import { axios } from '../../config/constant';
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';
import { message } from 'antd';

function TrangChu() {
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBaiViet, setDataBaiViet] = useState([]);
    const [dataProductSale, setDataProductSale] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies();
    const statusDangXuat = useSelector(state => state.statusDangXuat);

    async function getDataCategory() {
        let resData = await axios.get('hethong/categorys-show');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
        } else {
            alert("Lấy dữ liệu data Category thất bại");
        }
    }

    async function getDataSearch() {
        let resData = await axios.get('hethong/datasearch');
        if (resData.data.status === 'success') {
            setDataSearch(resData.data.data);
        } else {
            message.error("Lấy dữ liệu data Search thất bại");
        }
    }

    async function getDataBaiViet() {
        let resData = await axios.get('hethong/baiviet-showtrangchu');
        if (resData.data.status === 'success') {
            setDataBaiViet(resData.data.data);
        } else {
            alert("Lấy dữ liệu data bài viết thất bại");
        }
    }

    async function getDataProductTheoTrang() {
        let resData = await axios.get('hethong/products-showpage/' + 0);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
        } else {
            alert("Lấy dữ liệu data Product thất bại");
        }
    }

    async function getDataProductDangGiamGiaTheoTrang() {
        let resData = await axios.get('hethong/products-sale/' + 0);
        if (resData.data.status === 'success') {
            setDataProductSale(resData.data.data);
        } else {
            alert("Lấy dữ liệu data Product Sale thất bại");
        }
    }

    useEffect(() => {
        getDataCategory();
        getDataBaiViet();
        getDataSearch();
        getDataProductDangGiamGiaTheoTrang();
        getDataProductTheoTrang();
        removeCookie('shopID');
        if (localStorage.getItem('dataGioHang') === null) {
            localStorage.setItem('dataGioHang', '[]');
        }
        if (localStorage.getItem('idVoucher') === null) {
            localStorage.setItem('idVoucher', undefined);
        }
        dispatch({ type: 'SHOW_HEADER' });
    }, []);

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <MarkettingComponent dataBaiViet={dataBaiViet} dataCategory={dataCategory}></MarkettingComponent>
            <DealComponent dataProductSale={dataProductSale}></DealComponent>
            <HotSearchComponent dataSearch={dataSearch}></HotSearchComponent>
            <ForCustomerComponent dataProduct={dataProduct}></ForCustomerComponent>
        </div>
    );
}

export default TrangChu;