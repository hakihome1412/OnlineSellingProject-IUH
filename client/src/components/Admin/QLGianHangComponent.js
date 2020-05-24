import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Spinner, Image } from 'react-bootstrap';
import { Pagination, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLGianHangComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataShop, setDataShop] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);

    async function LayDataShopTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataShop_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataShop_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDanhSachGianHangSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/shop-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataShop(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function KhoaShop(shopID) {
        let res = await axios.put('hethong/users/shop-khoashop', {
            id: shopID
        })

        if (res.data.status === 'success') {
            alert('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            alert('Khóa thất bại !');
        }
    }

    async function MoKhoaShop(shopID) {
        let res = await axios.put('hethong/users/shop-mokhoashop', {
            id: shopID
        })

        if (res.data.status === 'success') {
            alert('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            alert('Mở khóa thất bại !');
        }
    }

    useEffect(() => {
        LayDataShopTheoTrang(0);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataShopTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataShopTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataShop_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataShop_DaKhoa_TheoTrang(0);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <div className="col-sm-10" style={{ padding: 20 }}>
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên shop' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    LayDanhSachGianHangSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                        </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' defaultValue={0} onChange={(value) => {
                                    setTrangThaiOption(value);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa khóa</Option>
                                    <Option value={2}>Đã khóa</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên gian hàng</th>
                                <th>Logo</th>
                                <th>Địa chỉ</th>
                                <th>Mô tả gian hàng</th>
                                <th>Ngày tạo</th>
                                <th>Trạng thái khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataShop.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{item.thongTinShop.idShop}</td>
                                            <td>{item.thongTinShop.ten}</td>
                                            <td><Image src={item.thongTinShop.logoShop} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            <td>{item.thongTinShop.diaChi}</td>
                                            <td>{item.thongTinShop.moTa}</td>
                                            <td>{new Date(item.thongTinShop.ngayTao).toString()}</td>
                                            <td>{item.thongTinShop.isLock === false ?
                                                (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Không</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                KhoaShop(item.thongTinShop.idShop);
                                                            }}>Khóa</Button>
                                                        </center>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Có</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                MoKhoaShop(item.thongTinShop.idShop);
                                                            }}>Mở khóa</Button>
                                                        </center>
                                                    </Fragment>
                                                )}</td>
                                        </tr>
                                    })
                                )
                            }
                        </tbody>
                    </Table>
                    {
                        setSpinnerReducer === 1 && (
                            <Spinner animation="border" role="status" style={{ marginLeft: 700 }}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        )
                    }
                    <Pagination defaultPageSize={1} defaultCurrent={1} total={tongSoTrang} onChange={(page) => {
                        dispatch({ type: 'SPINNER_DATABASE' });
                        if (trangThaiOption === 0) {
                            LayDataShopTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataShop_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataShop_DaKhoa_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
