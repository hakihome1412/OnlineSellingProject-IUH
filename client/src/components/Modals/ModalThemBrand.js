import React, { useState } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { axios } from '../../config/constant';

export default function ModalThemBrand() {
    const showModalThemBrandReducer = useSelector(state => state.showModalThemBrand);
    const [spinnerThemBrand, setSpinnerThemBrand] = useState(-1);
    const dispatch = useDispatch();
    const [dataThem, setDataThem] = useState({
        ten: '',
        xuatXu:'',
        img: ''
    });

    async function ThemBrand() {
        setSpinnerThemBrand(1);
        let res = await axios.post('hethong/brands-them', {
            ten: dataThem.ten,
            xuatXu:dataThem.xuatXu,
            img: dataThem.img,
        });

        if (res.data.status === 'success') {
            alert("Thêm thành công");
            dispatch({ type: 'CLOSE_THEM_BRAND' });
            dispatch({ type: 'RELOAD_DATABASE' });
            setSpinnerThemBrand(0);
        } else {
            alert("Thêm thất bại");
            setSpinnerThemBrand(0);
        }
    }

    return (
        <Modal show={showModalThemBrandReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_BRAND' });
        }}>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Tên"
                    name="ten"
                    rules={[{ required: true, message: 'Vui lòng nhập tên Brand ' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            ten: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Xuất xứ"
                    name="=xuatXu"
                    rules={[{ required: true, message: 'Vui lòng nhập nguồn gốc xuất xứ ' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            xuatXu: e.target.value
                        })
                    }} />
                </Form.Item>


                <Form.Item
                    label="Ảnh đại diện"
                    name="img"
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                        ThemBrand();
                    }}>
                        {
                            spinnerThemBrand === 1 ?
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
