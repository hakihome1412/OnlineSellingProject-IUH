import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select } from 'antd';
import { ModalThemCarousel, ModalChiTietCarousel } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLCarouselComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const [dataCarousel, setDataCarousel] = useState([]);
    const [dataSearch, setDataSearch] = useState('');
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const [trangThaiOption, setTrangThaiOption] = useState(0);

    async function LayDataCarouselTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/carousels/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataCarousel(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataCarousel_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/carousels-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataCarousel(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDanhSachCarouselSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/carousels-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataCarousel(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataCarousel_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/carousels-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataCarousel(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    useEffect(() => {
        LayDataCarouselTheoTrang(0);
    }, []);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataCarouselTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataCarousel_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataCarousel_DaKhoa_TheoTrang(0);
        }
    }, [trangThaiOption])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataCarouselTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    return (
        <Fragment>
            <ModalThemCarousel></ModalThemCarousel>
            <ModalChiTietCarousel></ModalChiTietCarousel>
            <div className="col-sm-10" style={{ padding: 20 }}>
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tiêu đề Carousel' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    LayDanhSachCarouselSearch(0);
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
                                    dispatch({ type: 'SHOW_THEM_CAROUSEL' });
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
                                <th>Mô tả</th>
                                <th>Hình ảnh</th>
                                <th>Trạng thái khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataCarousel.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'SHOW_CHITIET_CAROUSEL' });
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.tieuDe}</td>
                                            <td>{item.moTa}</td>
                                            <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            <td>{item.isLock === false ? "Không" : "Có"}</td>
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
                            LayDataCarouselTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataCarousel_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataCarousel_DaKhoa_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
