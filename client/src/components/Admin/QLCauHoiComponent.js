import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message } from 'antd';
import { ModalChiTietCauHoi } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLCauHoiComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataCauHoi, setDataCauHoi] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [statusAcceptOrNoAccept, setStatusAcceptOrNoAccept] = useState(false);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataCauHoiTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin/' + page);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi khách hàng thất bại");
        }
    }

    async function LayDanhSachCauHoiSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi theo search thất bại");
        }
    }

    async function LayDataCauHoi_ChuaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin-chuaduyet/' + page);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi chưa duyệt thất bại");
        }
    }

    async function LayDataCauHoi_DaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/questanswer-admin-daduyet/' + page);
        if (resData.data.status === 'success') {
            setDataCauHoi(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi đã duyệt thất bại");
        }
    }

    async function DuyetCauHoi(cauHoiID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.put('hethong/questanswer-duyet', {
            _id: cauHoiID
        });
        if (resData.data.status === 'success') {

            dispatch({ type: 'RELOAD_DATABASE' });
            setStatusAcceptOrNoAccept(false);
            dispatch({ type: 'SHOW_CHITIET_CAUHOI' });
        } else {
            message.error("Duyệt câu hỏi thất bại");
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setStatusAcceptOrNoAccept(false);
        }
    }

    useEffect(() => {
        LayDataCauHoiTheoTrang(0);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataCauHoiTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataCauHoiTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataCauHoi_ChuaDuyet_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataCauHoi_DaDuyet_TheoTrang(0);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalChiTietCauHoi></ModalChiTietCauHoi>
            <div className="col-sm-10" style={{ padding: 20 }}>
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo ID sản phẩm' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    LayDanhSachCauHoiSearch(0);
                                }}>
                                    <i className="fa fa-search"></i> &nbsp; Tìm kiếm
                                        </Button>
                            </Col>
                            <Col>
                                <Select style={{ width: 300 }} size='large' value={trangThaiOption} onChange={(value) => {
                                    setTrangThaiOption(value);
                                }}>
                                    <Option value={0}>Tất cả</Option>
                                    <Option value={1}>Chưa duyệt</Option>
                                    <Option value={2}>Đã duyệt</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className="col" style={{ width: '100%', marginTop: 20 }}>
                    <Table bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID sản phẩm</th>
                                <th>Câu hỏi</th>
                                <th>Ngày tạo</th>
                                <th><center>Trạng thái duyệt</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataCauHoi.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            if (statusAcceptOrNoAccept === false) {
                                                dispatch({ type: 'SHOW_CHITIET_CAUHOI' });
                                            }
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idProduct}</td>
                                            <td>{item.question}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td>{item.isAccept === false ?
                                                (
                                                    <Fragment>
                                                        <center>
                                                            <strong style={{ color: 'red' }}>Chưa duyệt</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                DuyetCauHoi(item._id);
                                                            }}
                                                                onMouseOver={() => {
                                                                    setStatusAcceptOrNoAccept(true);
                                                                }}
                                                                onMouseLeave={() => {
                                                                    setStatusAcceptOrNoAccept(false);
                                                                }}>Duyệt</Button>
                                                        </center>
                                                    </Fragment>
                                                ) : <center><span style={{ color: 'blue', fontWeight: 'bold' }}>Đã duyệt</span></center>}</td>
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
                            LayDataCauHoiTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataCauHoi_ChuaDuyet_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataCauHoi_DaDuyet_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
