import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';

export default function ModalChiTietBrand() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietBrandReducer = useSelector(state => state.showChiTietBrand);
    const setSpinnerChiTietBrand = useSelector(state => state.setSpinnerChiTietBrand);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerXoaBrand, setSpinnerXoaBrand] = useState(-1);
    const [spinnerSuaBrand, setSpinnerSuaBrand] = useState(-1);
    const [brandNow, setBrandNow] = useState();
    const [brandSua, setBrandSua] = useState({
        ten: '',
        xuatXu: '',
        img: '',
        isLock: ''
    });

    async function SuaBrand(brandID) {
        //dispatch({ type: 'SPINNER_SUACAROUSEL' });
        setSpinnerSuaBrand(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/brands-sua', {
                _id: brandID,
                ten: brandSua.ten,
                xuatXu: brandSua.xuatXu,
                img: brandSua.img,
                isLock: brandSua.isLock
            });

            if (resData.data.status === 'success') {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaBrand(-1);
                alert("Sửa thành công");
                setDisableOptions(false);
            }
            else {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                setSpinnerSuaBrand(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                alert("Sửa thất bại");
            }

        } else {
            alert("fail 1");
        }
    }

    async function XoaBrand(brandID) {
        setSpinnerXoaBrand(1);
        let resData = await axios.put('hethong/brands-xoa', {
            id: brandID
        });

        if (resData.data.status === 'success') {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaBrand(0);
            dispatch({ type: 'RELOAD_DATABASE' });
            dispatch({ type: 'CLOSE_CHITIET_BRAND' });
            alert("Xóa thành công");
        } else {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaBrand(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            alert("Xóa thất bại");
        }
    }

    async function LayBrandTheoID(brandID) {
        dispatch({ type: 'SPINNER_CHITIETBRAND' });
        let resData = await axios.get('hethong/brands-item/?id=' + brandID);
        if (resData.data.status === 'success') {
            setBrandNow(resData.data.data);
            dispatch({ type: 'NO_SPINNER_CHITIETBRAND' });
        } else {
            alert("Lấy data thất bại");
            dispatch({ type: 'NO_SPINNER_CHITIETBRAND' });
        }
    }

    return (
        <Modal show={showChiTietBrandReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_BRAND' });
        }}
            onShow={() => {
                LayBrandTheoID(objectIDDuocChonReducer);
            }}>
            {
                setSpinnerChiTietBrand === 1 && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                setSpinnerChiTietBrand === 0 && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên ' }]}>
                            <Input disabled={!disableOptions} defaultValue={brandNow.ten} onChange={(e) => {
                                setBrandSua({
                                    ...brandSua,
                                    ten: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Xuất xứ"
                            name="xuatXu"
                            rules={[{ required: true, message: 'Vui lòng nhập nguồn gốc xuất xứ ' }]}>
                            <Input disabled={!disableOptions} defaultValue={brandNow.xuatXu} onChange={(e) => {
                                setBrandSua({
                                    ...brandSua,
                                    xuatXu: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập đường link ảnh' }]}>
                            <Input disabled={!disableOptions} defaultValue={brandNow.img} onChange={(e) => {
                                setBrandSua({
                                    ...brandSua,
                                    img: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <Image alt="ảnh show" src={brandNow.img} style={{ width: 300, height: 200 }}></Image>
                        </Form.Item>

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={brandNow.ngayTao.toString()} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái khóa">
                            <Select disabled={!disableOptions} defaultValue={brandNow.isLock === false ? "nolock" : "lock"} onChange={(value) => {
                                setBrandSua({
                                    ...brandSua,
                                    isLock: value === "lock" ? true : false
                                });
                            }}>
                                <Option key="lock">Có</Option>
                                <Option key="nolock">Không</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button variant="primary" style={{ width: 300, height: 50, marginLeft: '30%' }} disabled={disableOptions} onClick={() => {
                                XoaBrand(brandNow._id);
                            }}>
                                {
                                    spinnerXoaBrand === 1 ? (
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>) : "Xóa"
                                }
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                if (statusSua === 0) {
                                    setStatusSua(1);
                                    setDisableOptions(true);
                                } else {
                                    SuaBrand(brandNow._id);
                                }
                                setBrandSua({
                                    ten: brandNow.ten,
                                    xuatXu:brandNow.xuatXu,
                                    img: brandNow.img,
                                    isLock: brandNow.isLock
                                });
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaBrand === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaBrand === 1 && (
                                        <Spinner animation="border" role="status" style={{ marginLeft: 40 }}>
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    )
                                }
                            </Button>
                        </Form.Item>
                    </Form>
                )
            }
        </Modal>
    )
}
