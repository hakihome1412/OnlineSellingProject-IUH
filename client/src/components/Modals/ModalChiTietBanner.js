import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalChiTietBanner() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietBannerReducer = useSelector(state => state.showChiTietBanner);
    const setSpinnerChiTietBanner = useSelector(state => state.setSpinnerChiTietBanner);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [firstTime, setFirstTime] = useState(true);
    const [imageAsUrl, setImageAsUrl] = useState([]);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [spinnerXoaBanner, setSpinnerXoaBanner] = useState(-1);
    const [spinnerSuaBanner, setSpinnerSuaBanner] = useState(-1);
    const [bannerNow, setBannerNow] = useState({
        _id: '',
        ten: '',
        img: '',
        positionShow: {
            center: '',
            right: '',
            bottom: ''
        },
        ngayTao: '',
        isLock: ''
    });
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
                                setBannerSua({
                                    ...bannerSua,
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

    async function LayBannerTheoID(bannerID) {
        dispatch({ type: 'SPINNER_CHITIETBANNER' });
        let resData = await axios.get('hethong/banners-item/?id=' + bannerID);
        if (resData.data.status === 'success') {
            setBannerNow({
                _id: resData.data.data._id,
                ten: resData.data.data.ten,
                img: resData.data.data.img,
                positionShow: {
                    center: resData.data.data.positionShow.center,
                    right: resData.data.data.positionShow.right,
                    bottom: resData.data.data.positionShow.bottom
                },
                ngayTao: resData.data.data.ngayTao,
                isLock: resData.data.data.isLock
            });
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
                dispatch({ type: 'CLOSE_CHITIET_BANNER' });
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

    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                alert('Vui lòng chọn ảnh cho Banner')
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    alert('Upload ảnh banner thành công');
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
        <Modal show={showChiTietBannerReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_BANNER' });
        }}
            onShow={() => {
                LayBannerTheoID(objectIDDuocChonReducer);
                setDisableOptions(false);
                setStatusSua(0);
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
                                    <img style={{ marginLeft: 20 }} src={bannerNow.img} alt={'ảnh'} width='200' height='150'></img>
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
                            <Input disabled={true} defaultValue={new Date(bannerNow.ngayTao).toString()} />
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
