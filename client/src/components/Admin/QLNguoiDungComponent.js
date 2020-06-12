import React, { Fragment, useState, useEffect } from 'react';
import { Button, Form, Row, Col, Table, Spinner, Image } from 'react-bootstrap';
import { Pagination, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';

export default function QuanLyNguoiDungComponent() {
    const dispatch = useDispatch();
    const { Option } = Select;
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const reloadDatabaseReducer = useSelector(state => state.reloadDatabase);
    const [dataUser, setDataUser] = useState([]);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [dataSearch, setDataSearch] = useState('');
    const [trangThaiOption, setTrangThaiOption] = useState(0);

    function hamChuyenDoiNgay(date) {
        var strDate = '';
        var now = new Date();
        var ngay = date.getDate().toString();
        var thang = (date.getMonth()+1).toString();
        var nam = date.getFullYear().toString();

        strDate = ngay + '/' + thang + '/' + nam;
        return strDate;
    }

    async function LayDataUserTheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users/' + page);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng thất bại");
        }
    }

    async function LayDanhSachUserSearch(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users-search/' + page + '?search=' + dataSearch);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng theo search thất bại");
        }
    }

    async function LayDataUser_ChuaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users-chuakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng chưa khóa thất bại");
        }
    }

    async function LayDataUser_DaKhoa_TheoTrang(page) {
        dispatch({ type: 'SPINNER_DATABASE' });
        let resData = await axios.get('hethong/users-dakhoa/' + page);
        if (resData.data.status === 'success') {
            setDataUser(resData.data.data);
            setTongSoTrang(resData.data.soTrang);
            dispatch({ type: 'NO_SPINNER_DATABASE' });
        } else {
            message.error("Lấy data người dùng đã khóa thất bại");
        }
    }

    async function KhoaUser(userID) {
        let res = await axios.put('hethong/users-khoauser', {
            id: userID
        })

        if (res.data.status === 'success') {
            message.success('Đã khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Khóa thất bại !');
        }
    }

    async function MoKhoaUser(userID) {
        let res = await axios.put('hethong/users-mokhoauser', {
            id: userID
        })

        if (res.data.status === 'success') {
            message.success('Mở khóa thành công');
            dispatch({ type: 'RELOAD_DATABASE' });
        } else {
            message.error('Mở khóa thất bại !');
        }
    }

    useEffect(() => {
        LayDataUserTheoTrang(0);
    }, []);

    useEffect(() => {
        if (reloadDatabaseReducer) {
            LayDataUserTheoTrang(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            setTrangThaiOption(0);
        }
    }, [reloadDatabaseReducer]);

    useEffect(() => {
        if (trangThaiOption === 0) {
            LayDataUserTheoTrang(0);
        }
        if (trangThaiOption === 1) {
            LayDataUser_ChuaKhoa_TheoTrang(0);
        }
        if (trangThaiOption === 2) {
            LayDataUser_DaKhoa_TheoTrang(0);
        }
    }, [trangThaiOption])

    return (
        <Fragment>
            <div className="col-sm-10" style={{ padding: 20 }}>
                <div className="col" style={{ width: '100%' }}>
                    <Form>
                        <Row>
                            <Col>
                                <Input size='large' placeholder='Tìm theo Email/SĐT hoặc Tên khách hàng' onChange={(e) => {
                                    setDataSearch(e.target.value);
                                }}></Input>
                            </Col>
                            <Col>
                                <Button variant="primary" style={{ width: 200 }} onClick={() => {
                                    LayDanhSachUserSearch(0);
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
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Chứng minh thư</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Trạng thái khóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                setSpinnerReducer === 0 && (
                                    dataUser.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{item.ten}</td>
                                            <td>{item.email}</td>
                                            <td>{item.sdt}</td>
                                            <td>{item.cmnd}</td>
                                            <td>{item.gioiTinh === 0 ? 'Nữ' : 'Nam'}</td>
                                            <td>{hamChuyenDoiNgay(new Date(item.ngaySinh))}</td>
                                            <td>{item.isLock === false ?
                                                (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Không</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                KhoaUser(item._id);
                                                            }}>Khóa</Button>
                                                        </center>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <center>
                                                            <strong>Có</strong>
                                                            <br></br>
                                                            <Button onClick={() => {
                                                                MoKhoaUser(item._id);
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
                            LayDataUserTheoTrang(page - 1);
                        }
                        if (trangThaiOption === 1) {
                            LayDataUser_ChuaKhoa_TheoTrang(page - 1);
                        }
                        if (trangThaiOption === 2) {
                            LayDataUser_DaKhoa_TheoTrang(page - 1);
                        }
                    }}>
                    </Pagination>
                </div>
            </div>
        </Fragment>
    )
}
