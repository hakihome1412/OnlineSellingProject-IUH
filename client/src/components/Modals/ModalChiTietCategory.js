import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalChiTietCategory() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietCategoryReducer = useSelector(state => state.showChiTietCategory);
    const setSpinnerChiTietCategory = useSelector(state => state.setSpinnerChiTietCategory);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [imageAsUrl, setImageAsUrl] = useState([]);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const [firstTime, setFirstTime] = useState(true);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerXoaCategory, setSpinnerXoaCategory] = useState(-1);
    const [spinnerSuaCategory, setSpinnerSuaCategory] = useState(-1);
    const [cateogryNow, setCategoryNow] = useState({
        _id: '',
        ten: '',
        icon: '',
        img: '',
        ngayTao: '',
        isLock: ''
    });
    const [categorySua, setCategorySua] = useState({
        ten: '',
        icon: '',
        img: '',
        isLock: ''
    });

    const handleChangeIMG = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile(listFile);

        if (listFile.length === 0) {
            console.log('Không có file nào được upload');
        } else {
            for (let index = 0; index < soLuongFile; index++) {
                console.log('start of upload');
                // async magic goes here...
                if (listFile[index] === '') {
                    console.error(`not an image, the image file is a ${typeof (listFile[index])}`);
                }
                const uploadTask = storage.ref(`/images/${listFile[index].name}`).put(listFile[index]);
                uploadTask.on('state_changed',
                    (snapShot) => {
                        //takes a snap shot of the process as it is happening
                        console.log(snapShot);
                    }, (err) => {
                        //catches the errors
                        console.log(err)
                    }, () => {
                        // gets the functions from storage refences the image storage in firebase by the children
                        // gets the download url then sets the image from firebase as the value for the imgUrl key:
                        storage.ref('images').child(listFile[index].name).getDownloadURL()
                            .then(fireBaseUrl => {
                                // setImageAsUrl(prevObject => ({ ...prevObject, imageAsUrl: fireBaseUrl }))
                                setCategorySua({
                                    ...categorySua,
                                    img: fireBaseUrl
                                });
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl(listUrl);
    }

    async function SuaCategory(categoryID) {
        dispatch({ type: 'SPINNER_CHITIETCATEGORY' });
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
                dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaCategory(-1);
                alert("Sửa thành công");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
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
            setCategoryNow({
                _id: resData.data.data._id,
                ten: resData.data.data.ten,
                icon: resData.data.data.icon,
                img: resData.data.data.img,
                ngayTao: resData.data.data.ngayTao,
                isLock: resData.data.data.isLock
            });
            dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
        } else {
            alert("Lấy data thất bại");
            dispatch({ type: 'NO_SPINNER_CHITIETCATEGORY' });
        }
    }

    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                alert('Vui lòng chọn ảnh cho Category')
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    alert('Upload ảnh category thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong])

    useEffect(() => {
        if (statusSua === 1) {
            setShowButtonHuy(true)
        } else {
            setShowButtonHuy(false)
        }
    }, [statusSua])


    return (
        <Modal show={showChiTietCategoryReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_CATEGORY' });
        }}
            onShow={() => {
                setDisableOptions(false);
                setStatusSua(0);
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
                            <Input disabled={!disableOptions} defaultValue={cateogryNow.icon} onChange={(e) => {
                                setCategorySua({
                                    ...categorySua,
                                    img: e.target.value
                                });
                            }} />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="anhchinh"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                            <input type='file'
                                disabled={!disableOptions}
                                onChange={(e) => {
                                    handleChangeIMG(e);
                                    setCountAnhDaUploadThanhCong(0);
                                    setFirstTime(false);
                                }}>
                            </input>
                        </Form.Item>

                        <Form.Item
                            name='showanhchinh'
                            label="Show ảnh đại diện">
                            {
                                statusSua === 0 && (
                                    <img style={{ marginLeft: 20 }} src={cateogryNow.img} alt={'ảnh'} width='200' height='150'></img>
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
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

                        {
                            showButtonHuy === true && (
                                <Form.Item>
                                    <Button variant="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                                        setDisableOptions(false);
                                        setStatusSua(0);
                                    }}>Hủy</Button>
                                </Form.Item>
                            )
                        }
                    </Form>
                )
            }
        </Modal>
    )
}
