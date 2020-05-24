import React, { useState, useEffect } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { Form, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalChiTietCarousel() {

    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietCarouselReducer = useSelector(state => state.showChiTietCarousel);
    const setSpinnerChiTietCarousel = useSelector(state => state.setSpinnerChiTietCarousel);
    const setSpinnerXoaCarousel = useSelector(state => state.setSpinnerXoaCarousel);
    const [imageAsUrl, setImageAsUrl] = useState([]);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [showButtonHuy, setShowButtonHuy] = useState(false);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [carouselNow, setCarouselNow] = useState({
        _id: '',
        idShow: '',
        tieuDe: '',
        moTa: '',
        img: '',
        ngayTao: '',
        isLock: '',
        isDelete: ''
    });
    const [statusSua, setStatusSua] = useState(0);
    const [disableOptions, setDisableOptions] = useState(false);
    const [spinnerSuaCarousel, setSpinnerSuaCarousel] = useState(-1);
    const [firstTime, setFirstTime] = useState(true);
    const [carouselSua, setCarouselSua] = useState({
        tieuDe: '',
        moTa: '',
        img: '',
        isLock: ''
    })

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
                                setCarouselSua({
                                    ...carouselSua,
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
        dispatch({ type: 'SPINNER_CHITIETCAROUSEL' });
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
                dispatch({ type: 'NO_SPINNER_CHITIETCAROUSEL' });
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaCarousel(-1);
                alert("Sửa thành công");
                setDisableOptions(false);
                dispatch({ type: 'CLOSE_CHITIET_CAROUSEL' });
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
            setCarouselNow({
                _id: resData.data.data._id,
                idShow: resData.data.data.idShow,
                tieuDe: resData.data.data.tieuDe,
                moTa: resData.data.data.moTa,
                img: resData.data.data.img,
                ngayTao: resData.data.data.ngayTao,
                isLock: resData.data.data.isLock,
                isDelete: resData.data.data.isDelete
            });
            dispatch({ type: 'NO_SPINNER_CHITIETCAROUSEL' });
        } else {
            alert("Lấy data thất bại");
            dispatch({ type: 'NO_SPINNER_CHITIETCAROUSEL' });
        }
    }

    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                alert('Vui lòng chọn ảnh cho Carousel')
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    alert('Upload ảnh carousel thành công');
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

    useEffect(() => {
        if (setSpinnerChiTietCarousel === false) {
            LayCarouselTheoID(objectIDDuocChonReducer);
        }
    }, [setSpinnerChiTietCarousel])

    return (
        <Modal show={showChiTietCarouselReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_CAROUSEL' });
        }}
            onShow={() => {
                setDisableOptions(false);
                setStatusSua(0);
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
                                    <img style={{ marginLeft: 20 }} src={carouselNow.img} alt={'ảnh'} width='200' height='150'></img>
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
                            <Input disabled={true} defaultValue={new Date(carouselNow.ngayTao).toString()} />
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
