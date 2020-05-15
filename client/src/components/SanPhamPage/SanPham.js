import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { ItemComponent, SideBarComponent } from '../allJS';
import { Pagination, Image, Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function SanPham(props) {
    const dispatch = useDispatch();
    const categoryID = props.match.params.id;
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataCategory, setDataCategory] = useState({
        _id: '',
        ten: ''
    });

    function setLongString(str) {
        var stringNew = str;
        if (str.length > 54) {
            stringNew = str.substring(0, 54) + '...'
        }
        return stringNew;
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    function to_slug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    function tinh_tien(giaGoc, giaTriGiamGia) {
        var tien = 0;
        if (giaTriGiamGia > 100) {
            tien = giaGoc - giaTriGiamGia;
        } else {
            tien = giaGoc - (giaGoc * giaTriGiamGia / 100);
        }

        return tien.toString();
    }

    async function LayCategoryTheoID(categoryID) {
        let res = await axios.get('hethong/categorys-item?id=' + categoryID);
        if (res.data.status === 'success') {
            setDataCategory({
                _id: res.data.data._id,
                ten: res.data.data.ten
            })
        } else {
            alert('Lấy data Category thất bại');
        }
    }

    async function LayTatCaSanPhamTheoIDCategoryTheoTrang(categoryID, page) {
        let res = await axios.get('hethong/products-category/' + page + '?idCategory=' + categoryID);
        if (res.data.status === 'success') {
            setDataProduct(res.data.data);
            setTongSoTrang(res.data.soTrang);
        } else {
            alert('Lấy data Category thất bại');
        }
    }

    useEffect(() => {
        LayCategoryTheoID(categoryID);
        LayTatCaSanPhamTheoIDCategoryTheoTrang(categoryID, 0);
        dispatch({type:'SHOW_HEADER'});
    }, [])

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <div className="row">
                <div className="col-sm-3 sidebar">
                    <div className="danhmuc-sidebar">
                        <h5>DANH MỤC SẢN PHẨM</h5>
                        <div className="danhmucchinh-sidebar">
                            <p><strong><Link to='#'>{dataCategory.ten}</Link></strong></p>
                        </div>
                    </div>
                    <hr style={{ width: 240 }}></hr>
                    <div className="danhgia-sidebar">
                        <h5>ĐÁNH GIÁ</h5>
                        <div className="danhgia-5sao-sidebar">
                            {[...Array(5)].map((item,i) => {
                                return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                            })}
                            <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 5 sao)</span>
                        </div>
                        <div className="danhgia-4sao-sidebar">
                            {[...Array(4)].map((item,i) => {
                                return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                            })}
                            <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                            <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 4 sao)</span>
                        </div>
                        <div className="danhgia-3sao-sidebar">
                            {[...Array(3)].map((item,i) => {
                                return <FaStar key={i} color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                            })}
                            <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                            <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                            <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 3 sao)</span>
                        </div>
                    </div>
                    <hr style={{ width: 240 }}></hr>
                    <div className="thuonghieu-sidebar">
                        <h5>THƯƠNG HIỆU</h5>
                        <div className="thuonghieu-items-sidebar">
                            <p>Nike</p>
                            <p>Adidas</p>
                            <p>Reebok</p>
                            <p>Gucci</p>
                        </div>
                    </div>
                    <hr style={{ width: 240 }}></hr>
                    <div className="nhacungcap-sidebar">
                        <h5>NHÀ CUNG CẤP</h5>
                        <div className="nhacungcap-items-sidebar">
                            <p>G-LAB</p>
                            <p>GRIMM DC</p>
                            <p>CEASAR</p>
                            <p>DEGREY</p>
                            <p>HIGHCLUB</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="row maincontent">
                        <div className="row showitems-maincontent">
                            {
                                dataProduct.map((item, i) => {
                                    if (item.giaTriGiamGia === 0) {
                                        return <div key={item._id} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                            <Link to={'/detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                                <div className="row">
                                                    <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                </div>
                                                <div className="row item-ten">
                                                    <span>{setLongString(item.ten)}</span>
                                                </div>
                                                <div className="row item-gia">
                                                    <h5><strong>{format_curency(item.gia.toString())} VNĐ</strong></h5>
                                                </div>
                                            </Link>
                                        </div>
                                    } else {
                                        return <div key={item._id} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                            <Link to={'/detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                                <div className="row">
                                                    <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                                </div>
                                                <div className="row item-ten">
                                                    <span>{setLongString(item.ten)}</span>
                                                </div>
                                                <div className="row item-gia">
                                                    <h5><strong>{format_curency(tinh_tien(item.gia, item.giaTriGiamGia))} VNĐ</strong></h5>&nbsp;<span className="percent">{
                                                        item.giaTriGiamGia > 100 ? '-' + format_curency(item.giaTriGiamGia.toString()) + 'VNĐ' : '-' + item.giaTriGiamGia + '%'
                                                    }</span>
                                                </div>
                                                <div className="row item-giagoc">
                                                    <strike><span className="original">{format_curency(item.gia.toString())} VNĐ</span></strike>
                                                </div>
                                            </Link>
                                        </div>
                                    }
                                })
                            }
                        </div>
                        <div className="pagination-maincontent">
                            {
                                dataProduct.length !== 0 && (
                                    <Pagination defaultPageSize={1} defaultCurrent={1} total={tongSoTrang} onChange={(page) => {
                                        LayTatCaSanPhamTheoIDCategoryTheoTrang(categoryID, page - 1);
                                    }}>
                                    </Pagination>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
