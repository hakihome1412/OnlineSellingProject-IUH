import React, { useState } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select} from 'antd';
import { axios } from '../../config/constant';

export default function ModalThemCarousel() {

    const showModalThemCarouselReducer = useSelector(state => state.showModalThemCarousel);
    const setSpinnerThemCarousel = useSelector(state => state.setSpinnerThemCarousel);

    const dispatch = useDispatch();
    const { Option } = Select;

    const [dataThem, setDataThem] = useState({
        tieuDe: "",
        moTa: "",
        img: "",
        ngayTao: new Date(),
    })

    async function ThemCarousel() {
        dispatch({ type: 'SPINNER_THEMCAROUSEL' });
        let res = await axios.post('hethong/carousels-them', {
            tieuDe: dataThem.tieuDe,
            moTa: dataThem.moTa,
            img: dataThem.img,
            ngayTao: dataThem.ngayTao,
            isLock: false,
            isDelete: false
        });

        if (res.data.status === 'success') {
            alert("Thêm thành công");
            dispatch({ type: 'CLOSE_THEM_CAROUSEL' });
            dispatch({ type: 'RELOAD_DATABASE' });
            dispatch({ type: 'NO_SPINNER_THEMCAROUSEL' });
        } else {
            alert("Thêm thất bại");
            dispatch({ type: 'NO_SPINNER_THEMCAROUSEL' });
        }
    }

    return (
        <Modal show={showModalThemCarouselReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_CAROUSEL' });
        }}>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ padding: 40 }}>
                <Form.Item
                    label="Tiêu đề"
                    name="tieude"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề ' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            tieuDe: e.target.value
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="mota"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                    <Input onChange={(e) => {
                        setDataThem({
                            ...dataThem,
                            moTa: e.target.value
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
                        ThemCarousel();
                    }}>
                        {
                            setSpinnerThemCarousel === 2 ?
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
