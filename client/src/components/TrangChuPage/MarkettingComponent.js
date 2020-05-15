import React, { Fragment } from 'react';
import { Nav, Carousel, Image, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link, NavLink } from 'react-router-dom';

export default function MarkettingComponent(props) {
    var dataCarousel = props.dataCarousel;
    var dataCategory = props.dataCategory;
    var dataBanner = props.dataBanner;

    const [cookies, setCookies] = useCookies();

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

    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-3" style={{ backgroundColor: "#F8F9FA" }}>
                    <Nav className="flex-column">
                        {dataCategory.map((item, i) => {
                            return <NavLink key={item._id} to={'category/' + item._id + '/' + to_slug(item.ten)} className="navMenu"><i className={item.icon} style={{ marginRight: 10 }}></i>{item.ten}</NavLink>
                        })}
                    </Nav>
                </div>
                <div className="col-sm-6">
                    <Carousel interval={2000}>
                        {dataCarousel.map((item, i) => {
                            if (item.isShow === true)
                                return <Carousel.Item key={item._id}>
                                    <Image style={{ width: '100%', height: 300 }} src={item.img} />
                                    <Carousel.Caption>
                                        <h3>{item.tieuDe}</h3>
                                        <p>{item.moTa}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                        })}
                    </Carousel>
                    <br />
                    {dataBanner.map((item, i) => {
                        if (item.isShow === true && item.positionShow.center === true) {
                            return <Link key={item._id} to={'event/' + item._id + '/' + to_slug(item.ten)}>
                                <Image id="itemQuangCao" style={{ width: '48%', height: 150, marginLeft: 10 }} src={item.img} rounded />
                            </Link>
                        }
                    })}
                </div>
                <div className="col-sm-3">
                    {dataBanner.map((item, i) => {
                        if (item.isShow === true && item.positionShow.right === true) {
                            return <div key={item._id} className="col" style={{ marginTop: 10 }}>
                                <Link to={'event/' + item._id + '/' + to_slug(item.ten)}>
                                    <Image id="itemQuangCao" style={{ width: '100%', height: 110 }} src={item.img} rounded />
                                </Link>
                            </div>
                        }
                    })}
                </div>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
                {dataBanner.map((item, i) => {
                    if (item.isShow === true && item.positionShow.bottom === true) {
                        return <div className="col-sm-3" key={item._id}>
                            <Link to={'event/' + item._id + '/' + to_slug(item.ten)}>
                                <Image id="itemQuangCao" style={{ width: '100%', height: 150 }} src={item.img} rounded />
                            </Link>
                        </div>
                    }
                })}

            </div>
        </Fragment>
    )
}
