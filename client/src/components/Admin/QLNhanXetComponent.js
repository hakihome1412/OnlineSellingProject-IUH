import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message } from 'antd';
import { ModalChiTietNhanXet } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLNhanXetComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataComment, setDataComment] = useState([]);
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

    async function LayDataCommentTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/comments-admin/' + page);
        if (resData.data.status === 'success') {
            setDataComment(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data nhận xét khách hàng thất bại");
        }
    }

    async function LayDanhSachCommentSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/comments-admin-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataComment(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data nhận xét theo search thất bại");
        }
    }

    async function LayDataComment_ChuaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/comments-admin-chuaduyet/' + page);
        if (resData.data.status === 'success') {
            setDataComment(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data nhận xét chưa duyệt thất bại");
        }
    }

    async function LayDataComment_DaDuyet_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/comments-admin-daduyet/' + page);
        if (resData.data.status === 'success') {
            setDataComment(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data nhận xét đã duyệt thất bại");
        }
    }

    async function DuyetComment(cauHoiID, idProduct) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.put('hethong/comments-duyet', {
            _id: cauHoiID,
            idProduct: idProduct,
        });
        if (resData.data.status === 'success') {

            dispatch({ type: 'RELOAD_DATABASE' });
            setStatusAcceptOrNoAccept(false);
            dispatch({ type: 'SHOW_CHITIET_COMMENT' });
        } else {
            message.error("Duyệt nhận xét thất bại");
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setStatusAcceptOrNoAccept(false);
        }
    }

    useEffect(() => {
        LayDataCommentTheoTrang(0);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataCommentTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataCommentTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataComment_ChuaDuyet_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataComment_DaDuyet_TheoTrang(0);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalChiTietNhanXet></ModalChiTietNhanXet>
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
                                    LayDanhSachCommentSearch(0);
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
                                <th>Tiêu đề</th>
                                <th>Số sao</th>
                                <th>Ngày tạo</th>
                                <th><center>Trạng thái duyệt</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataComment.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            if (statusAcceptOrNoAccept === false) {
                                                dispatch({ type: 'SHOW_CHITIET_COMMENT' });
                                            }
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idProduct}</td>
                                            <td>{item.tieuDe}</td>
                                            <td>{item.soSao}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td>{item.isAccept === false ?
                                                (
                                                    <Fragment>
                                                        <center>
                                                            <strong style={{ color: 'red' }}>Chưa duyệt</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                DuyetComment(item._id, item.idProduct);
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
                            LayDataCommentTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataComment_ChuaDuyet_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataComment_DaDuyet_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
