import React, { useState, useEffect } from 'react';
import { InforItemComponent, InforDetailItemComponent, DescriptionItemComponent, QuestAndAnswerComponent } from '../allJS'
import { axios } from '../../config/constant';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { useCookies } from 'react-cookie';

export default function SanPhamDetail(props) {
    const productID = props.match.params.id;
    const [phanLoaiColor, setPhanLoaiColor] = useState([]);
    const [phanLoaiSize, setPhanLoaiSize] = useState([]);
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies();
    const [thongTinProduct, setThongTinProduct] = useState({
        _id: '',
        idShow: '',
        ten: '',
        img: {
            chinh: '',
            phu: [],
            moTaChiTiet: []
        },
        gia: 0,
        noiSanXuat: '',
        moTa: [],
        moTaNganGon: [],
        soSao: '',
        giaTriGiamGia: 0,
        giaCuoiCung: 0,
        soLuong: '',
        thongTinBaoHanh: {
            baoHanh: '',
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        idBrand: '',
        idShop: '',
        idCategory: '',
        idEvent: ''
    });

    const [thongTinBrand, setThongTinBrand] = useState({
        ten: '',
        xuatXu: ''
    })

    async function LayDataProductTheoID(productID) {
        let res = await axios.get('hethong/products-item?id=' + productID);

        if (res.data.status === 'success') {
            setThongTinProduct({
                _id: res.data.data._id,
                idShow: res.data.data.idShow,
                ten: res.data.data.ten,
                img: {
                    chinh: res.data.data.img.chinh,
                    phu: res.data.data.img.phu,
                    moTaChiTiet: res.data.data.img.moTaChiTiet
                },
                gia: res.data.data.gia,
                noiSanXuat: res.data.data.noiSanXuat,
                moTa: res.data.data.moTa,
                moTaNganGon: res.data.data.moTaNganGon,
                soSao: res.data.data.soSao,
                giaTriGiamGia: res.data.data.giaTriGiamGia,
                giaCuoiCung: res.data.data.giaCuoiCung,
                soLuong: res.data.data.soLuong,
                thongTinBaoHanh: {
                    baoHanh: res.data.data.thongTinBaoHanh.baoHanh,
                    loaiBaoHanh: res.data.data.thongTinBaoHanh.loaiBaoHanh,
                    thoiGianBaoHanh: res.data.data.thongTinBaoHanh.thoiGianBaoHanh,
                    donViBaoHanh: res.data.data.thongTinBaoHanh.donViBaoHanh
                },
                idShop: res.data.data.idShop,
                idBrand: res.data.data.idBrand,
                idCategory: res.data.data.idCategory,
                idEvent: res.data.data.idEvent
            })
        } else {
            message.error('Lấy dữ liệu data sản phẩm thất bại');
        }
    }

    async function LayDataBrandTheoID(brandID) {
        let res = await axios.get('hethong/brands-item?id=' + brandID);

        if (res.data.status === 'success') {
            setThongTinBrand({
                ten: res.data.data.ten,
                xuatXu: res.data.data.xuatXu
            })
        } else {
            message.error('Lấy dữ liệu data thương hiệu thất bại');
        }
    }

    async function LayPhanLoaiColor(productID) {
        let res = await axios.get('hethong/product-classify/color?id_product=' + productID);

        if (res.data.status === 'success') {
            setPhanLoaiColor(res.data.data);
        } else {
            message.error('Lấy dữ liệu data phân loại color thất bại');
        }
    }

    async function LayPhanLoaiSize(productID) {
        let res = await axios.get('hethong/product-classify/size?id_product=' + productID);

        if (res.data.status === 'success') {
            setPhanLoaiSize(res.data.data);
        } else {
            message.error('Lấy dữ liệu data phân loại size thất bại');
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
        LayDataProductTheoID(productID);
        KiemTraTokenAdmin();
        dispatch({ type: 'SHOW_HEADER' });
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        LayDataBrandTheoID(thongTinProduct.idBrand);
        LayPhanLoaiColor(thongTinProduct.idShow);
        LayPhanLoaiSize(thongTinProduct.idShow);
    }, [thongTinProduct])
    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <InforItemComponent phanLoaiColor={phanLoaiColor} phanLoaiSize={phanLoaiSize} thongTinProduct={thongTinProduct}></InforItemComponent>
            <InforDetailItemComponent thongTinProduct={thongTinProduct} thongTinBrand={thongTinBrand}></InforDetailItemComponent>
            <DescriptionItemComponent thongTinProduct={thongTinProduct}></DescriptionItemComponent>
            <QuestAndAnswerComponent thongTinProduct={thongTinProduct}></QuestAndAnswerComponent>
        </div>
    )
}
