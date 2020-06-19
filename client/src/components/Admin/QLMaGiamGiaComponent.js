import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Image, Spinner } from 'react-bootstrap';
import { Pagination, Input, Select, message } from 'antd';
import { ModalThemVoucher } from '../Modals/index';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QLMaGiamGiaComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataVoucher, setDataVoucher] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);
    const [statusLockOrNoLock, setStatusLockOrNoLock] = useState(false);

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var ngay = date.getDate().toString();
        var thang = (date.getMonth() + 1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataVoucherTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-admin/' + page);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data mã giảm giá thất bại");
        }
    }

    async function LayDanhSachVoucherSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-admin-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data mã giảm giá theo search thất bại");
        }
    }

    async function LayDataVoucher_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-admin-chuakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data mã giảm giá chưa khóa thất bại");
        }
    }

    async function LayDataVoucher_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/vouchers-admin-dakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataVoucher(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data câu hỏi đã duyệt thất bại");
        }
    }

    async function KhoaVoucher(cauHoiID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.put('hethong/vouchers-khoa', {
            _id: cauHoiID
        });
        if (resData.data.status === 'success') {
            message.success("Khóa thành công");
            dispatch({ type: 'RELOAD_DATABASE' })
            setStatusLockOrNoLock(false);
        } else {
            message.error("Khóa thất bại");
            dispatch({ type: 'NO_RELOAD_DATABASE' })
            setStatusLockOrNoLock(false);
        }
    }

    async function MoKhoaVoucher(cauHoiID) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.put('hethong/vouchers-mokhoa', {
            _id: cauHoiID
        });
        if (resData.data.status === 'success') {
            message.success("Mở khóa thành công");
            dispatch({ type: 'RELOAD_DATABASE' })
            setStatusLockOrNoLock(false);
        } else {
            message.error("Mở khóa thất bại");
            dispatch({ type: 'NO_RELOAD_DATABASE' })
            setStatusLockOrNoLock(false);
        }
    }

    useEffect(() => {
        LayDataVoucherTheoTrang(0);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataVoucherTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataVoucherTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataVoucher_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataVoucher_DaKhoa_TheoTrang(0);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <ModalThemVoucher></ModalThemVoucher>
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
                                    LayDataVoucherTheoTrang(0);
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
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    dispatch({ type: 'SHOW_THEM_VOUCHER' });
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
                                <th>Loại giảm</th>
                                <th>Giá trị giảm</th>
                                <th>Ngày bắt đầu</th>
                                <th>Ngày kết thúc</th>
                                <th>Ngày tạo</th>
                                <th><center>Trạng thái khóa</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataVoucher.map((item, i) => {
                                        return <tr key={item._id} onClick={(e) => {
                                            if (statusLockOrNoLock === false) {
                                                dispatch({ type: 'SHOW_CHITIET_VOUCHER' });
                                            }
                                            dispatch({ type: 'OBJECT_ID_NOW', id: item._id });
                                        }}>
                                            <td>{item.idShow}</td>
                                            <td>{item.ten}</td>
                                            <td>{item.loaiGiamGia === 0 ? 'Theo thành tiền' : 'Theo phần trăm'}</td>
                                            {
                                                item.loaiGiamGia === 0 && (
                                                    <td>{format_curency(item.giaTriGiam.toString())} đ</td>
                                                )
                                            }
                                            {
                                                item.loaiGiamGia === 1 && (
                                                    <td>{item.giaTriGiam}%</td>
                                                )
                                            }
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayBatDau))}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayKetThuc))}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngayTao))}</td>
                                            <td>{item.isLock === false ?
                                                (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Không</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                KhoaVoucher(item._id);
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
                                                                MoKhoaVoucher(item._id);
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
                            LayDataVoucherTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataVoucher_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataVoucher_DaKhoa_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
