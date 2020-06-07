import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Select, Input, message } from 'antd';
import { ModalThemBaiViet, ModalChiTietBaiViet } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLBaiVietComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataBaiViet, setDataBaiViet] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [statusLockOrNoLock, setStatusLockOrNoLock] = useState(false);

    async function LayDataBaiViet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let res = await axios.get('hethong/baiviet-showadmin/' + page);

        if (res.data.status === 'success') {
            setDataBaiViet(res.data.data);
            setTongSoTrang(res.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error('Lấy data bài viết từ admin thất bại');
        }
    }

    async function LayDanhSachBaiVietSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/baiviet-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataBaiViet(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataBaiViet_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/baiviet-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBaiViet(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataBaiViet_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/baiviet-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBaiViet(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function KhoaBaiViet(id) {
        let res = await axios.put('hethong/baiviet-khoa', {
            id: id
        })

        if (res.data.status === 'success') {
            alert('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            alert('Khóa thất bại !');
        }
    }

    async function MoKhoaBaiViet(id) {
        let res = await axios.put('hethong/baiviet-mokhoa', {
            id: id
        })

        if (res.data.status === 'success') {
            alert('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            alert('Mở khóa thất bại !');
        }
    }


    useEffect(() => {
        LayDataBaiViet_TheoTrang(0);
    }, [])

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataBaiViet_TheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataBaiViet_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataBaiViet_DaKhoa_TheoTrang(0);
        }
    }, [trangThaiOption])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataBaiViet_TheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    return (
        <Fragment>
            <ModalThemBaiViet ></ModalThemBaiViet>
            <ModalChiTietBaiViet></ModalChiTietBaiViet>
            <div className="col-sm-10" style={{ padding: 20 }}>
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên thương hiệu' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    LayDanhSachBaiVietSearch(0);
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
                                </Select>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    dispatch({ type: 'SHOW_THEM_BAIVIET' });
                                }}>
                                    Thêm mới +
                            </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tiêu đề</th>
                                <th>Hình ảnh</th>
                                <th>Loại bài viết</th>
                                <th>Trạng thái khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataBaiViet.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                            if (statusLockOrNoLock === false) {
                                                dispatch({ type: 'SHOW_CHITIET_BAIVIET' });
                                            }
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.tieuDe}</td>
                                            <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            <td>{item.loaiBaiViet === 0 ? "Chương trình/sự kiện" : "Giới thiệu"}</td>
                                            <td>{item.isLock === false ?
                                                (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Không</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                KhoaBaiViet(item._id);
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
                                                                MoKhoaBaiViet(item._id);
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
                            LayDataBaiViet_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataBaiViet_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataBaiViet_DaKhoa_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
