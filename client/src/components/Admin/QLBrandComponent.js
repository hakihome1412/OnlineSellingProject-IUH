import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Select, Input, message } from 'antd';
import { ModalThemBrand, ModalChiTietBrand } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLBrandComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataBrand, setDataBrand] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);

    async function LayDataBrandTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu thất bại");
        }
    }

    async function LayDataBrand_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu chưa khóa thất bại");
        }
    }

    async function LayDataBrand_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu đã khóa thất bại");
        }
    }

    async function LayDanhSachBrandSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/brands-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataBrand(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data thương hiệu theo search thất bại");
        }
    }

    useEffect(() => {
        LayDataBrandTheoTrang(0);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataBrandTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataBrandTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataBrand_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataBrand_DaKhoa_TheoTrang(0);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalThemBrand></ModalThemBrand>
            <ModalChiTietBrand></ModalChiTietBrand>
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
                                </Select>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    dispatch({ type: 'SHOW_THEM_BRAND' });
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
                                <th>Tên</th>
                                <th>Hình ảnh</th>
                                <th>Trạng thái khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataBrand.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'SHOW_CHITIET_BRAND' });
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.ten}</td>
                                            {
                                                item.img.length === 0 ? <td><Image src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td> :
                                                    <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            }
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
                            LayDataBrandTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataBrand_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataBrand_DaKhoa_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
