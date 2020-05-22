import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Select, Input } from 'antd';
import { ModalThemBanner, ModalChiTietBanner } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
export default function QLBannerComponent() {
    const dispatch = useDispatch();
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataBanner, setDataBanner] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const { Option } = Select;
    const [trangThaiOption, setTrangThaiOption] = useState(0);

    async function LayDataBannerTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/banners/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBanner(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    useEffect(() => {
        LayDataBannerTheoTrang(0);
    }, []);

    async function LayDataBanner_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/banners-chuakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBanner(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataBanner_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/banners-dakhoa/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBanner(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataBanner_ViTriTrungTam_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/banners/vitri-center/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBanner(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataBanner_ViTriBenPhai_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/banners/vitri-right/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBanner(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDataBanner_ViTriBenDuoi_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/banners/vitri-bottom/' + page);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataBanner(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayDanhSachBannerSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/banners-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataBanner(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            alert("Lấy data thất bại");
        }
    }

    useEffect(() => {
        LayDataBannerTheoTrang(0);
    }, []);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataBannerTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataBanner_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataBanner_DaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 3) {
            LayDataBanner_ViTriTrungTam_TheoTrang(0);
        }
        if (trangThaiOption === 4) {
            LayDataBanner_ViTriBenPhai_TheoTrang(0);
        }
        if (trangThaiOption === 5) {
            LayDataBanner_ViTriBenDuoi_TheoTrang(0);
        }
    }, [trangThaiOption])

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataBannerTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    return (
        <Fragment>
            <ModalThemBanner></ModalThemBanner>
            <ModalChiTietBanner></ModalChiTietBanner>
            <div className="col-sm-10" style={{ padding: 20 }}>
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID hoặc Tên Banner' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    LayDanhSachBannerSearch(0);
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
                                    <Option value={3}>Vị trí trung tâm</Option>
                                    <Option value={4}>Vị trí bên phải</Option>
                                    <Option value={5}>Vị trí bên dưới</Option>
                                </Select>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    dispatch({ type: 'SHOW_THEM_BANNER' });
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
                                <th>Vị trí hiển thị</th>
                                <th>Trạng thái khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataBanner.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            dispatch({ type: 'SHOW_CHITIET_BANNER' });
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.ten}</td>
                                            <td><Image src={item.img} style={{ width: 200, height: 100, marginLeft: 30 }}></Image></td>
                                            <td>
                                                {
                                                    item.positionShow.center === true && "Trung tâm"
                                                }
                                                {
                                                    item.positionShow.right === true && "Bên phải"
                                                }
                                                {
                                                    item.positionShow.bottom === true && "Bên dưới"
                                                }
                                            </td>
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
                            LayDataBannerTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataBanner_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataBanner_DaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 3) {
                            LayDataBanner_ViTriTrungTam_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 4) {
                            LayDataBanner_ViTriBenPhai_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 5) {
                            LayDataBanner_ViTriBenDuoi_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
