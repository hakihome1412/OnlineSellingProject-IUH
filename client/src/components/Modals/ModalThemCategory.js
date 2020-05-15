import React, { useState } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button} from 'antd';
import { axios } from '../../config/constant';

export default function ModalThemCategory() {
    const showModalThemCategoryReducer = useSelector(state => state.showModalThemCategory);
    const [spinnerThemCategory, setSpinnerThemCategory] = useState(-1);
    const dispatch = useDispatch();
    const [dataThem, setDataThem] = useState({
        ten: '',
        icon:'',
        img: ''
    });

    async function ThemCategory() {
        setSpinnerThemCategory(1);
        let res = await axios.post('hethong/categorys-them', {
            ten: dataThem.ten,
            icon:dataThem.icon,
            img: dataThem.img,
        });

        if (res.data.status === 'success') {
            alert("Thêm thành công");
            dispatch({ type: 'CLOSE_THEM_CATEGORY' });
            dispatch({ type: 'RELOAD_DATABASE' });
            setSpinnerThemCategory(0);
        } else {
            alert("Thêm thất bại");
            setSpinnerThemCategory(0);
        }
    }
    return (
        <Modal show={showModalThemCategoryReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_CATEGORY' });
        }}>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Tên"
                    name="ten"
                    rules={[{ required: true, message: 'Vui lòng nhập tên Category ' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            ten: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Icon"
                    name="icon"
                    rules={[{ required: true, message: 'Vui lòng nhập đường link class của i cho icon ' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            icon: e.target.value
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                        ThemCategory();
                    }}>
                        {
                            spinnerThemCategory === 1 ?
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
