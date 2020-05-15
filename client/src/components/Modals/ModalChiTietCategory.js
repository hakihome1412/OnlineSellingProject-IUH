import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';

export default function ModalChiTietCategory() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietCategoryReducer = useSelector(state => state.showChiTietCategory);
    const setSpinnerChiTietCategory = useSelector(state => state.setSpinnerChiTietCategory);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerXoaCategory, setSpinnerXoaCategory] = useState(-1);
    const [spinnerSuaCategory, setSpinnerSuaCategory] = useState(-1);
    const [cateogryNow, setCategoryNow] = useState();
    const [categorySua, setCategorySua] = useState({
        ten: '',
        icon:'',
        img: '',
        isLock:''
    });

    async function SuaCategory(categoryID) {
        //dispatch({ type: 'SPINNER_SUACAROUSEL' });
        setSpinnerSuaCategory(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/categorys-sua', {
                _id: categoryID,
                ten: categorySua.ten,
                icon: categorySua.icon,
                img: categorySua.img,
                isLock: categorySua.isLock
            });

            if (resData.data.status === 'success') {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaCategory(-1);
                alert("Sửa thành công");
                setDisableOptions(false);
            }
            else {
                //dispatch({ type: 'NO_SPINNER_SUACAROUSEL' });
                setSpinnerSuaCategory(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                alert("Sửa thất bại");
            }

        } else {
            alert("fail 1");
        }
    }

    async function XoaCategory(categoryID) {
        setSpinnerXoaCategory(1);
        let resData = await axios.put('hethong/categorys-xoa', {
            id: categoryID
        });

        if (resData.data.status === 'success') {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaCategory(0);
            dispatch({ type: 'RELOAD_DATABASE' });
            dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
            alert("Xóa thành công");
        } else {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaCategory(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            alert("Xóa thất bại");
        }
    }

    async function LayCategoryTheoID(categoryID) {
        dispatch({ type: 'SPINNER_CHITIETCATEGORY' });
        let resData = await axios.get('hethong/categorys-item/?id=' + categoryID);
        if (resData.data.status === 'success') {
            setCategoryNow(resData.data.data);
            dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
        } else {
            alert("Lấy data thất bại");
            dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
        }
    }

    return (
        <Modal show={showChiTietCategoryReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
        }}
            onShow={() => {
                LayCategoryTheoID(objectIDDuocChonReducer);
            }}>
            {
                setSpinnerChiTietCategory === 1 && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                setSpinnerChiTietCategory === 0 && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên ' }]}>
                            <Input disabled={!disableOptions} defaultValue={cateogryNow.ten} onChange={(e) => {
                                setCategorySua({
                                    ...categorySua,
                                    ten: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Icon"
                            name="icon"
                            rrules={[{ required: true, message: 'Vui lòng nhập đường link class của i cho icon ' }]}>
                            <Input disabled={!disableOptions} defaultValue={cateogryNow.img} onChange={(e) => {
                                setCategorySua({
                                    ...categorySua,
                                    img: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="username"
                            rules={[{ required: true, message: 'Vui lòng nhập đường link ảnh' }]}>
                            <Input disabled={!disableOptions} defaultValue={cateogryNow.img} onChange={(e) => {
                                setCategorySua({
                                    ...categorySua,
                                    img: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <Image alt="ảnh show" src={cateogryNow.img} style={{ width: 300, height: 200 }}></Image>
                        </Form.Item>

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={cateogryNow.ngayTao.toString()} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái khóa">
                            <Select disabled={!disableOptions} defaultValue={cateogryNow.isLock === false ? "nolock" : "lock"} onChange={(value) => {
                                setCategorySua({
                                    ...categorySua,
                                    isLock: value === "lock" ? true : false
                                });
                            }}>
                                <Option key="lock">Có</Option>
                                <Option key="nolock">Không</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button variant="primary" style={{ width: 300, height: 50, marginLeft: '30%' }} disabled={disableOptions} onClick={() => {
                                XoaCategory(cateogryNow._id);
                            }}>
                                {
                                    spinnerXoaCategory === 1 ? (
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
                                    SuaCategory(cateogryNow._id);
                                }
                                setCategorySua({
                                    ten: cateogryNow.ten,
                                    icon: cateogryNow.icon,
                                    img: cateogryNow.img,
                                    isLock: cateogryNow.isLock
                                });
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaCategory === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaCategory === 1 && (
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
