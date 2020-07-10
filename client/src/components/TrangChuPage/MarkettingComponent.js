import React, { Fragment } from 'react';
import { Nav, Carousel, Image } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';

export default function MarkettingComponent(props) {
    const dataCategory = props.dataCategory;
    const dataBaiViet = props.dataBaiViet;
    const history = useHistory();

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
                            return <NavLink key={item._id} to={'category/' + item._id + '/' + to_slug(item.ten)} className="navMenu">
                                <i className={item.icon} style={{ marginRight: 10 }}></i>{item.ten}
                            </NavLink>
                        })}
                    </Nav>
                </div>
                <div className="col-sm-6">
                    <Carousel interval={2000}>
                        {dataBaiViet.map((item, i) => {
                            if (i < 6) {
                                return <Carousel.Item key={item._id}>
                                    <Link to='/' onClick={(e) => {
                                        e.preventDefault();
                                        history.push('/baiviet/' + item.idShow + '/' + to_slug(item.tieuDe))
                                    }}>
                                        <Image style={{ width: '100%', height: 300 }} src={item.img} />
                                    </Link>
                                    <Carousel.Caption>
                                        <h3 style={{ color: '#FF6666', fontSize: 20 }}>{item.tieuDe}</h3>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            }
                        })}
                    </Carousel>
                    <br />
                    {dataBaiViet.map((item, i) => {
                        if (i > 5 && i < 8) {
                            return <Tooltip title={item.tieuDe} placement={'right'} color={'orange'} key={i}>
                                <Link key={item._id} to={'baiviet/' + item.idShow + '/' + to_slug(item.tieuDe)}>
                                    <Image id="itemQuangCao" style={{ width: '48%', height: 150, marginLeft: 10 }} src={item.img} rounded />
                                </Link>
                            </Tooltip>

                        }
                    })}
                </div>
                <div className="col-sm-3">
                    {dataBaiViet.map((item, i) => {
                        if (i > 7 && i < 12) {
                            return <div key={item._id} className="col" style={{ marginTop: 10 }}>
                                <Tooltip title={item.tieuDe} placement={'right'} color={'orange'} key={i}>
                                    <Link key={item._id} to={'baiviet/' + item.idShow + '/' + to_slug(item.tieuDe)}>
                                        <Image id="itemQuangCao" style={{ width: '100%', height: 108 }} src={item.img} rounded />
                                    </Link>
                                </Tooltip>
                            </div>
                        }
                    })}
                </div>
            </div>
            <div className="row" style={{ marginTop: 20 }}>
                {dataBaiViet.map((item, i) => {
                    if (i > 11 && i < 16) {
                        return <div className="col-sm-3" key={item._id}>
                            <Tooltip title={item.tieuDe} placement={'right'} color={'orange'} key={i}>
                                <Link key={item._id} to={'baiviet/' + item.idShow + '/' + to_slug(item.tieuDe)}>
                                    <Image id="itemQuangCao" style={{ width: '100%', height: 150 }} src={item.img} rounded />
                                </Link>
                            </Tooltip>

                        </div>
                    }
                })}
            </div>
        </Fragment>
    )
}
