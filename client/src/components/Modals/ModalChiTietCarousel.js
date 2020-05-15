import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';

export default function ModalChiTietCarousel() {

    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietCarouselReducer = useSelector(state => state.showChiTietCarousel);
    const setSpinnerChiTietCarousel = useSelector(state => state.setSpinnerChiTietCarousel);
    const setSpinnerXoaCarousel = useSelector(state => state.setSpinnerXoaCarousel);
    //const setSpinnerSuaCarousel = useSelector(state => state.setSpinnerSuaCarousel);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [carouselNow, setCarouselNow] = useState();
    const [statusSua, setStatusSua] = useState(0);
    const [disableOptions, setDisableOptions] = useState(false);
    const [spinnerSuaCarousel, setSpinnerSuaCarousel] = useState(-1);
    const [carouselSua, setCarouselSua] = useState({
        tieuDe: '',
        moTa: '',
        img: '',
        isLock: ''
    })


    async function XoaCarousel(carouselID) {
        dispatch({ type: 'SPINNER_XOACAROUSEL' });
        let resData = await axios.put('hethong/carousels-xoa', {
            carouselID: carouselID
        });

        if (resData.data.status === 'success') {
            setStatusSua(0);
            setDisableOptions(false);
            dispatch({ type: 'NO_SPINNER_XOACAROUSEL' });
            dispatch({ type: 'RELOAD_DATABASE' });
            dispatch({ type: 'CLOSE_CHITIET_CAROUSEL' });
            alert("Xóa thành công");
        } else {
            setStatusSua(0);
            setDisableOptions(false);
            dispatch({ type: 'NO_SPINNER_XOACAROUSEL' });
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            alert("Xóa thất bại");
        }
    }

    async function SuaCarousel(carouselID) {
        //dispatch({ type: 'SPINNER_SUACAROUSEL' });
        setSpinnerSuaCarousel(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/carousels-sua', {
                _id: carouselID,
                tieuDe: carouselSua.tieuDe,
                moTa: carouselSua.moTa,
                img: carouselSua.img,
                isLock: carouselSua.isLock
            });

            if (resData.data.status === 'success') {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaCarousel(-1);              
                alert("Sửa thành công");
                setDisableOptions(false);
            }
            else {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                setSpinnerSuaCarousel(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                alert("Sửa thất bại");
            }

        } else {
            alert("fail 1");
        }
    }

    async function LayCarouselTheoID(carouselID) {
        dispatch({ type: 'SPINNER_CHITIETCAROUSEL' });
        let resData = await axios.get('hethong/carousels-item/?id=' + carouselID);
        if (resData.data.status === 'success') {
            setCarouselNow(resData.data.data);            
            dispatch({ type: 'NO_SPINNER_CHITIETCAROUSEL' });
        } else {
            alert("Lấy data thất bại");
            dispatch({ type: 'NO_SPINNER_CHITIETCAROUSEL' });
        }
    }

    return (
        <Modal show={showChiTietCarouselReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_CAROUSEL' });
        }}
            onShow={() => {
                LayCarouselTheoID(objectIDDuocChonReducer);
            }}>
            {
                setSpinnerChiTietCarousel === 4 && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                setSpinnerChiTietCarousel === 5 && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Tiêu đề"
                            name="tieude"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề ' }]}>
                            <Input disabled={!disableOptions} defaultValue={carouselNow.tieuDe} onChange={(e) => {
                                setCarouselSua({
                                    ...carouselSua,
                                    tieuDe: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Mô tả"
                            name="mota"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
                            <Input disabled={!disableOptions} defaultValue={carouselNow.moTa} onChange={(e) => {
                                setCarouselSua({
                                    ...carouselSua,
                                    moTa: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập đường link ảnh' }]}>
                            <Input disabled={!disableOptions} defaultValue={carouselNow.img} onChange={(e) => {
                                setCarouselSua({
                                    ...carouselSua,
                                    img: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <Image alt="ảnh show" src={carouselNow.img} style={{ width: 300, height: 200 }}></Image>
                        </Form.Item>

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={carouselNow.ngayTao.toString()} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái khóa">
                            <Select disabled={!disableOptions} defaultValue={carouselNow.isLock === false ? "nolock" : "lock"} onChange={(value) => {
                                setCarouselSua({
                                    ...carouselSua,
                                    isLock: value === "lock" ? true : false
                                });
                            }}>
                                <Option key="lock">Có</Option>
                                <Option key="nolock">Không</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button variant="primary" style={{ width: 300, height: 50, marginLeft: '30%' }} disabled={disableOptions} onClick={() => {
                                XoaCarousel(carouselNow._id);
                            }}>
                                {
                                    setSpinnerXoaCarousel === 6 ? (
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
                                    SuaCarousel(carouselNow._id);
                                }
                                setCarouselSua({
                                    tieuDe: carouselNow.tieuDe,
                                    moTa: carouselNow.moTa,
                                    img: carouselNow.img,
                                    isLock: carouselNow.isLock
                                });
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaCarousel === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaCarousel === 1 && (
                                        <Spinner animation="border" role="status" style={{marginLeft:40}}>
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
