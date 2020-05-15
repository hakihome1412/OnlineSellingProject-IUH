import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';

export default function ModalChiTietBanner() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietBannerReducer = useSelector(state => state.showChiTietBanner);
    const setSpinnerChiTietBanner = useSelector(state => state.setSpinnerChiTietBanner);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerXoaBanner, setSpinnerXoaBanner] = useState(-1);
    const [spinnerSuaBanner, setSpinnerSuaBanner] = useState(-1);
    const [bannerNow, setBannerNow] = useState();
    const [bannerSua, setBannerSua] = useState({
        ten: '',
        img: '',
        positionShow: {
            center: '',
            right: '',
            bottom: ''
        },
        isLock: ''
    });

    async function LayBannerTheoID(bannerID) {
        dispatch({ type: 'SPINNER_CHITIETBANNER' });
        let resData = await axios.get('hethong/banners-item/?id=' + bannerID);
        if (resData.data.status === 'success') {
            setBannerNow(resData.data.data);
            dispatch({ type: 'NO_SPINNER_CHITIETBANNER' });
        } else {
            alert("Lấy data thất bại");
            dispatch({ type: 'NO_SPINNER_CHITIETBANNER' });
        }
    }

    async function XoaBanner(bannerID) {
        setSpinnerXoaBanner(1);
        let resData = await axios.put('hethong/banners-xoa', {
            id: bannerID
        });

        if (resData.data.status === 'success') {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaBanner(0);
            dispatch({ type: 'RELOAD_DATABASE' });
            dispatch({ type: 'CLOSE_CHITIET_BANNER' });
            alert("Xóa thành công");
        } else {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaBanner(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            alert("Xóa thất bại");
        }
    }

    async function SuaBanner(bannerID) {
        //dispatch({ type: 'SPINNER_SUACAROUSEL' });
        setSpinnerSuaBanner(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/banners-sua', {
                _id: bannerID,
                ten: bannerSua.ten,
                img: bannerSua.img,
                positionShow: {
                    center: bannerSua.positionShow.center,
                    right: bannerSua.positionShow.right,
                    bottom: bannerSua.positionShow.bottom
                },
                isLock: bannerSua.isLock
            });

            if (resData.data.status === 'success') {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaBanner(-1);
                alert("Sửa thành công");
                setDisableOptions(false);
            }
            else {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                setSpinnerSuaBanner(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                alert("Sửa thất bại");
            }

        } else {
            alert("fail 1");
        }
    }

    return (
        <Modal show={showChiTietBannerReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_BANNER' });
        }}
            onShow={() => {
                LayBannerTheoID(objectIDDuocChonReducer);
            }}>
            {
                setSpinnerChiTietBanner === 8 && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                setSpinnerChiTietBanner === 9 && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên ' }]}>
                            <Input disabled={!disableOptions} defaultValue={bannerNow.ten} onChange={(e) => {
                                setBannerSua({
                                    ...bannerSua,
                                    ten: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập đường link ảnh' }]}>
                            <Input disabled={!disableOptions} defaultValue={bannerNow.img} onChange={(e) => {
                                setBannerSua({
                                    ...bannerSua,
                                    img: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <Image alt="ảnh show" src={bannerNow.img} style={{ width: 300, height: 200 }}></Image>
                        </Form.Item>

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={bannerNow.ngayTao.toString()} />
                        </Form.Item>

                        <Form.Item
                            label="Vị trí hiển thị">
                            <Select disabled={!disableOptions} defaultValue={() => {
                                if (bannerNow.positionShow.center) {
                                    return "center";
                                } else {
                                    if (bannerNow.positionShow.right) {
                                        return "right"
                                    } else {
                                        return "bottom"
                                    }
                                }
                            }} onChange={(value) => {
                                if (value === "center") {
                                    setBannerSua({
                                        ...bannerSua,
                                        positionShow: {
                                            center: true,
                                            right: false,
                                            bottom: false
                                        }
                                    });
                                } else {
                                    if (value === "right") {
                                        setBannerSua({
                                            ...bannerSua,
                                            positionShow: {
                                                center: false,
                                                right: true,
                                                bottom: false
                                            }
                                        });
                                    } else {
                                        setBannerSua({
                                            ...bannerSua,
                                            positionShow: {
                                                center: false,
                                                right: false,
                                                bottom: true
                                            }
                                        });
                                    }
                                }
                            }}>
                                <Option key="center">Trung tâm</Option>
                                <Option key="right">Bên phải</Option>
                                <Option key="bottom">Bên dưới</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái khóa">
                            <Select disabled={!disableOptions} defaultValue={bannerNow.isLock === false ? "nolock" : "lock"} onChange={(value) => {
                                setBannerSua({
                                    ...bannerSua,
                                    isLock: value === "lock" ? true : false
                                });
                            }}>
                                <Option key="lock">Có</Option>
                                <Option key="nolock">Không</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button variant="primary" style={{ width: 300, height: 50, marginLeft: '30%' }} disabled={disableOptions} onClick={() => {
                                XoaBanner(bannerNow._id);
                            }}>
                                {
                                    spinnerXoaBanner === 1 ? (
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
                                    SuaBanner(bannerNow._id);
                                }
                                setBannerSua({
                                    ten: bannerNow.ten,
                                    img: bannerNow.img,
                                    positionShow: {
                                        center: bannerNow.positionShow.center,
                                        right: bannerNow.positionShow.right,
                                        bottom: bannerNow.positionShow.bottom
                                    },
                                    isLock: bannerNow.isLock
                                });
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaBanner === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaBanner === 1 && (
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
