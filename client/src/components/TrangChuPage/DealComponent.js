import React, { Fragment} from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DealComponent(props) {
    var dataProductSale = props.dataProductSale;

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

    return (
        <Fragment>
            <div className="row" style={{ height: 'auto', backgroundColor: '#F8F9FA', marginTop: 40, borderRadius: 10, color: 'black', fontWeight: 'lighter', padding: 10 }}>
                <div className="col">
                    <div className="row" style={{ height: 50, width: '100%', padding: 10 }}>
                        <i className="fa fa-bell fa-2x" style={{ marginTop: 15 }}></i>
                        <div className="col">
                            <h5 style={{ color: 'orange' }}><strong>TiemDo Deal</strong></h5>
                            <span>Cập nhật hàng giờ tất cả những deal giảm giá đặc biệt trên TiemDo. Hãy bookmark trang này và quay lại thường xuyên để không bỏ lỡ bạn nhé!</span>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        {
                            dataProductSale.map((item, i) => {
                                return <div key={i} className="col-sm-3 item" style={{ backgroundColor: "white", height: 350, marginTop: 20, width: '95%' }}>
                                    <Link to={'detail/' + item._id + '/' + to_slug(item.ten)} className="a_item">
                                        <div className="row">
                                            <Image style={{ width: '100%', height: 180 }} src={item.img.chinh} />
                                        </div>
                                        <div className="row item-ten">
                                            <span><strong>{item.ten}</strong></span>
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
                            })
                        }
                    </div>

                    <div className="row" style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Link to="/deal"><Button variant="outline-primary">Xem Thêm</Button></Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
