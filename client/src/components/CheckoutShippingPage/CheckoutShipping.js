import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axios } from '../../config/constant';
import { Steps, Select, Input } from 'antd';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CheckoutShipping() {
    const dispatch = useDispatch();
    const { Step } = Steps;
    const { Option } = Select;
    const [dataThanhPho, setDataThanhPho] = useState([]);
    const [dataQuan, setDataQuan] = useState([]);
    const [dataPhuong, setDataPhuong] = useState([]);
    const [checkDuLieuNhap, setCheckDuLieuNhap] = useState(false);
    const [thongTin, setThongTin] = useState({
        hoTen: '',
        sdt: '',
        diaChi: '',
        phuong: '',
        quan: '',
        thanhPho: ''
    });
    const [diaChi, setDiaChi] = useState({
        idThanhPho: '-1',
        idQuan: '-1',
        idPhuong: '-1',
        diaChi: ''
    });
    const steps = [
        {
            title: 'Đăng nhập',
        },
        {
            title: 'Địa chỉ giao hàng',
        },
        {
            title: 'Thanh toán & Đặt mua',
        },
    ];

    function KiemTraThongTinNhap(data) {
        if (data.hoTen === '' || data.sdt === '' || data.diaChi === '' || data.phuong === '' || data.quan === '' || data.thanhPho === '') {
            return false;
        }
        return true;
    }

    async function LayDataThanhPho() {
        let res = await axios.get('hethong/locals');

        if (res.data.status === 'success') {
            setDataThanhPho(res.data.data);
        }
    }

    async function LayDataQuanTheoIDThanhPho(thanhPhoID) {
        let res = await axios.get('hethong/locals-quan?idThanhPho=' + thanhPhoID);

        if (res.data.status === 'success') {
            setDataQuan(res.data.data);
        }
    }

    async function LayDataPhuongTheoIDQuan(thanhPhoID, quanID) {
        let res = await axios.get('hethong/locals-phuong?idThanhPho=' + thanhPhoID + '&idQuan=' + quanID);

        if (res.data.status === 'success') {
            setDataPhuong(res.data.data);
        }
    }

    async function LayTenLocalTheoID(thanhPhoID, quanID, phuongID) {
        if (thanhPhoID !== '' && quanID !== '' && phuongID !== '') {
            let res = await axios.get('hethong/locals-address?idThanhPho=' + thanhPhoID + '&idQuan=' + quanID + '&idPhuong=' + phuongID);

            if (res.data.status === 'success') {
                setThongTin({
                    ...thongTin,
                    phuong: res.data.tenPhuong,
                    quan: res.data.tenQuan,
                    thanhPho: res.data.tenThanhPho,
                })
            }
        }
    }

    useEffect(() => {
        dispatch({ type: 'CLOSE_HEADER' });
        LayDataThanhPho();
    }, [])

    useEffect(() => {
        LayDataQuanTheoIDThanhPho(diaChi.idThanhPho);
    }, [diaChi.idThanhPho])

    useEffect(() => {
        LayDataPhuongTheoIDQuan(diaChi.idThanhPho, diaChi.idQuan);
    }, [diaChi.idQuan])

    useEffect(() => {
        LayTenLocalTheoID(diaChi.idThanhPho, diaChi.idQuan, diaChi.idPhuong);
    }, [diaChi])

    useEffect(() => {
        setCheckDuLieuNhap(KiemTraThongTinNhap(thongTin));
    }, [thongTin])

    return (
        <div className="container" style={{ height: 'auto', padding: 20 }}>
            <div className='col'>
                <div>
                    <Steps current={1}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </div>

                <div style={{ marginTop: 50, padding: 20 }}>
                    <p><strong>2. Địa chỉ giao hàng</strong></p>
                    <div className='row'>
                        <div className='col-sm-2'>

                        </div>
                        <div className='col-sm-8' style={{ backgroundColor: '#F8F9FA', padding: 10 }}>
                            <Form>
                                <Form.Group as={Row} controlId="formHorizontalEmail">
                                    <Form.Label column sm={3}>
                                        Họ tên
                                </Form.Label>
                                    <Col sm={9}>
                                        <Input required size='large' placeholder='Nhập họ tên' onChange={(e) => {
                                            setThongTin({
                                                ...thongTin,
                                                hoTen: e.target.value
                                            });
                                        }}></Input>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Số điện thoại
                                </Form.Label>
                                    <Col sm={9}>
                                        <Input required size='large' placeholder='Nhập số điện thoại' onChange={(e) => {
                                            setThongTin({
                                                ...thongTin,
                                                sdt: e.target.value
                                            });
                                        }}></Input>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Tỉnh/Thành phố
                                </Form.Label>
                                    <Col sm={9}>
                                        <Select
                                            allowClear
                                            style={{ width: '100%' }}
                                            size='large'
                                            value={diaChi.idThanhPho}
                                            onChange={(value) => {
                                                setDiaChi({
                                                    idThanhPho: value,
                                                    idPhuong: '-1',
                                                    idQuan: '-1'
                                                });
                                            }}
                                        >
                                            <Option value={'-1'}>Chọn Tỉnh/Thành phố</Option>
                                            {
                                                dataThanhPho.map((item, i) => {
                                                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Quận/Huyện
                                </Form.Label>
                                    <Col sm={9}>
                                        <Select
                                            allowClear
                                            value={diaChi.idQuan}
                                            style={{ width: '100%' }}
                                            size='large'
                                            onChange={(value) => {
                                                setDiaChi({
                                                    ...diaChi,
                                                    idQuan: value,
                                                    idPhuong:'-1'
                                                });
                                            }}
                                        >
                                            <Option value={'-1'}>Chọn Quận/Huyện</Option>
                                            {
                                                dataQuan.map((item, i) => {
                                                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Phường/Xã
                                </Form.Label>
                                    <Col sm={9}>
                                        <Select
                                            allowClear
                                            value={diaChi.idPhuong}
                                            style={{ width: '100%' }}
                                            size='large'
                                            onChange={(value) => {
                                                setDiaChi({
                                                    ...diaChi,
                                                    idPhuong: value
                                                });
                                            }}
                                        >
                                            <Option value={'-1'}>Chọn Phường/Xã</Option>
                                            {
                                                dataPhuong.map((item, i) => {
                                                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Địa chỉ
                                </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control as='textarea' rows='3' onChange={(e) => {
                                            setThongTin({
                                                ...thongTin,
                                                diaChi: e.target.value
                                            })
                                        }}>
                                        </Form.Control>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Col sm={{ span: 8, offset: 3 }}>
                                        <Link to='payment' onClick={(e) => {
                                            if (checkDuLieuNhap === false) {
                                                e.preventDefault();
                                                alert('Vui lòng nhập đầy đủ thông tin');
                                            } else {
                                                dispatch({ type: 'THONGTIN_DATHANG', thongTin: thongTin });
                                            }
                                        }}>
                                            <Button>Giao đến địa chỉ này</Button>
                                        </Link>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='col-sm-2'>

                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

