import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message } from 'antd';
import { ModalChiTietProduct_Admin } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLProductComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataProduct, setDataProduct] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [statusLockOrNoLock, setStatusLockOrNoLock] = useState(false);
    const [statusAccecptOrNoAccept, setStatusAccecptOrNoAccept] = useState(false);

    async function LayDataProductTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm thất bại");
        }
    }

    async function LayDataProduct_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm chưa khóa thất bại");
        }
    }

    async function LayDataProduct_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm đã khóa thất bại");
        }
    }

    async function LayDataProduct_ChuaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-chuaduyet/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm chưa duyệt thất bại");
        }
    }

    async function LayDataProduct_DaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-admin-daduyet/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data sản phẩm đã duyệt thất bại");
        }
    }

    async function DuyetSanPham(idProduct) {
        let res = await axios.put('hethong/products-duyetsanpham', {
            id: idProduct
        });
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (res.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success('Duyệt sản phẩm thành công');
            setStatusAccecptOrNoAccept(false);
        } else {
            message.error("Duyệt sản phẩm thất bại");
            setStatusAccecptOrNoAccept(false);
        }
    }

    async function KhoaSanPham(idProduct) {
        let res = await axios.put('hethong/products-khoasanpham', {
            id: idProduct
        });
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (res.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success('Khóa sản phẩm thành công');
            setStatusAccecptOrNoAccept(false);
        } else {
            message.error("Khóa sản phẩm thất bại !");
            setStatusAccecptOrNoAccept(false);
        }
    }

    async function MoKhoaSanPham(idProduct) {
        let res = await axios.put('hethong/products-mokhoasanpham', {
            id: idProduct
        });
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (res.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            dispatch({ type: 'RELOAD_DATABASE' });
            message.success('Mở khóa sản phẩm thành công');
            setStatusAccecptOrNoAccept(false);
        } else {
            message.error("Mở khóa sản phẩm thất bại !");
            setStatusAccecptOrNoAccept(false);
        }
    }

    async function LayDanhSachBrandSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/products-search-admin/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataProduct(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu thất bại");
        }
    }

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    useEffect(() => {
        LayDataProductTheoTrang(0);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataProductTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataProductTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataProduct_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataProduct_DaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 3) {
            LayDataProduct_ChuaDuyet_TheoTrang(0);
        }
        if (trangThaiOption === 4) {
            LayDataProduct_DaDuyet_TheoTrang(0);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalChiTietProduct_Admin></ModalChiTietProduct_Admin>
            <div className="col-sm-10" style={{ padding: 20 }}>
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên sản phẩm' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    LayDanhSachBrandSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                        </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' value={trangThaiOption} onChange={(value) => {
                                    setTrangThaiOption(value);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa khóa</Option>
                                    <Option value={2}>Đã khóa</Option>
                                    <Option value={3}>Chưa duyệt</Option>
                                    <Option value={4}>Đã duyệt</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên</th>
                                <th>Hình ảnh</th>
                                <th>Giá</th>
                                <th>Trạng thái duyệt</th>
                                <th>Trạng thái khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataProduct.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            if(statusAccecptOrNoAccept === false && statusLockOrNoLock === false){
                                                dispatch({ type: 'SHOW_CHITIET_PRODUCT_ADMIN' });
                                            }
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.ten}</td>
                                            <td><Image src={item.img.chinh} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            <td>{format_curency(item.gia.toString())}</td>
                                            <td><span style={{ color: item.isAccept === false ? 'red' : 'blue' }}><strong>{item.isAccept === false ?
                                                <Button style={{ height: 40, width: 200, marginTop: 30 }} onClick={() => {
                                                    DuyetSanPham(item._id);
                                                }}
                                                    onMouseOver={() => {
                                                        setStatusAccecptOrNoAccept(true);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setStatusAccecptOrNoAccept(false);
                                                    }}>Duyệt</Button> : 'Đã duyệt'}</strong></span></td>
                                            <td>{item.isLock === false ?
                                                (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Không</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                KhoaSanPham(item._id);
                                                            }}
                                                                onMouseOver={() => {
                                                                    setStatusLockOrNoLock(true);
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setStatusLockOrNoLock(false);
                                                                }}>Khóa</Button>
                                                        </center>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Có</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                MoKhoaSanPham(item._id);
                                                            }}
                                                                onMouseOver={() => {
                                                                    setStatusLockOrNoLock(true);
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setStatusLockOrNoLock(false);
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
                            LayDataProductTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataProduct_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataProduct_DaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 3) {
                            LayDataProduct_ChuaDuyet_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 4) {
                            LayDataProduct_DaDuyet_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
