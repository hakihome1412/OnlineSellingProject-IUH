import React, { useState, useEffect } from 'react';
import { MarkettingComponent, DealComponent, HotIndustryComponent, ForCustomerComponent } from '../allJS';
import { axios } from '../../config/constant';
import { useDispatch, useSelector } from 'react-redux'
import { useCookies } from 'react-cookie';

function TrangChu() {
    const [dataCarousel, setDataCarousel] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataBanner, setDataBanner] = useState([]);
    const [dataProductSale, setDataProductSale] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const dispatch = useDispatch();
    const[cookies,setCookie,removeCookie] = useCookies();
    const statusDangXuat = useSelector(state => state.statusDangXuat);
    
    async function getDataCarousel() {
        let resData = await axios.get('hethong/carousels');

        if (resData.data.status === 'success') {
            setDataCarousel(resData.data.data);
        } else {
            alert('Lấy dữ liệu data Carousel thất bại');
        }
    }

    async function getDataCategory() {
        let resData = await axios.get('hethong/categorys-show');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
        } else {
            alert("Lấy dữ liệu data Category thất bại");
        }
    }

    async function getDataBanner() {
        let resData = await axios.get('hethong/banners');
        if (resData.data.status === 'success') {
            setDataBanner(resData.data.data);
        } else {
            alert("Lấy dữ liệu data Banner thất bại");
        }
    }

    async function getDataProductTheoTrang() {
        let resData = await axios.get('hethong/products-showpage/'+0);
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
        getDataCarousel();
        getDataCategory();
        getDataBanner();
        getDataProductDangGiamGiaTheoTrang();
        getDataProductTheoTrang();
        removeCookie('shopID');
        dispatch({type:'SHOW_HEADER'});
    }, []);

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <MarkettingComponent dataBanner={dataBanner} dataCategory={dataCategory} dataCarousel={dataCarousel}></MarkettingComponent>
            <DealComponent dataProductSale={dataProductSale}></DealComponent>
            <ForCustomerComponent dataProduct={dataProduct}></ForCustomerComponent>
        </div>
    );
}

export default TrangChu;