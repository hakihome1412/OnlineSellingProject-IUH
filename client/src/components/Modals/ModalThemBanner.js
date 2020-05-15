import React, { useState } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import { axios } from '../../config/constant';

export default function ModalThemBanner() {
    const showModalThemBannerReducer = useSelector(state => state.showModalThemBanner);
    const [spinnerThemBanner, setSpinnerThemBanner] = useState(-1);
    const dispatch = useDispatch();
    const { Option } = Select;
    const [dataThem, setDataThem] = useState({
        ten: "",
        img: "",
        ngayTao: new Date(),
        positionShow: {
            center: '',
            right: '',
            bottom: ''
        }
    })

    async function ThemBanner() {
        setSpinnerThemBanner(1);
        let res = await axios.post('hethong/banners-them', {
            ten: dataThem.ten,
            img: dataThem.img,
            ngayTao: dataThem.ngayTao,
            positionShow: {
                center: dataThem.positionShow.center,
                right: dataThem.positionShow.right,
                bottom: dataThem.positionShow.bottom
            },
            isLock: false,
            isDelete: false
        });

        if (res.data.status === 'success') {
            alert("Thêm thành công");
            dispatch({ type: 'CLOSE_THEM_BANNER' });
            dispatch({ type: 'RELOAD_DATABASE' });
            setSpinnerThemBanner(0);
        } else {
            alert("Thêm thất bại");
            setSpinnerThemBanner(0);
        }
    }
    return (
        <Modal show={showModalThemBannerReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_BANNER' });
        }}>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Tên"
                    name="ten"
                    rules={[{ required: true, message: 'Vui lòng nhập tên Banner ' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            ten: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Ảnh đại diện"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập đường link ảnh' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            img: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item>
                    <Image alt="ảnh show" src={dataThem.img} style={{ width: 300, height: 200 }}></Image>
                </Form.Item>

                <Form.Item
                    label="Vị trí hiển thị">
                    <Select onChange={(value) => {
                        if (value === 'center') {
                            setDataThem({
                                ...dataThem,
                                positionShow: {
                                    center: true,
                                    right: false,
                                    bottom: false
                                }
                            });
                        } else {
                            if (value === 'right') {
                                setDataThem({
                                    ...dataThem,
                                    positionShow: {
                                        center: false,
                                        right: true,
                                        bottom: false
                                    }
                                });
                            } else {
                                setDataThem({
                                    ...dataThem,
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                        ThemBanner();
                    }}>
                        {
                            spinnerThemBanner === 1 ?
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner> : "Thêm"

                        }
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
