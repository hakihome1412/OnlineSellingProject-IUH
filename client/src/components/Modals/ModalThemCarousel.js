import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalThemCarousel() {
    const [firstTime, setFirstTime] = useState(true);
    const [imageAsFile, setImageAsFile] = useState([]);
    const showModalThemCarouselReducer = useSelector(state => state.showModalThemCarousel);
    const setSpinnerThemCarousel = useSelector(state => state.setSpinnerThemCarousel);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const dispatch = useDispatch();

    const [dataThem, setDataThem] = useState({
        tieuDe: '',
        moTa: '',
        img: '',
        ngayTao: new Date(),
    })

    const handleChange = (e) => {
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
                                setDataThem({
                                    ...dataThem,
                                    img: fireBaseUrl
                                })
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong(countPrev => countPrev + 1);
                            })
                    })
            }
        }
    }

    function KiemTraDuLieuNhap(data) {
        if (data.tieuDe === '' || data.moTa === '' || data.img === '') {
            alert('Vui lòng nhập đủ dữ liệu cần thiết');
        } else {
            ThemCarousel()
        }
    }

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

    return (
        <Modal show={showModalThemCarouselReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_CAROUSEL' });
        }} onShow={() => {
            setImageAsFile([]);
            setFirstTime(true);
            setCountAnhDaUploadThanhCong(0);
            setDataThem({
                tieuDe: '',
                moTa: '',
                img: '',
                ngayTao: new Date(),
            })
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
                    name="img"
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                    <input type='file'
                        onChange={(e) => {
                            handleChange(e);
                            setCountAnhDaUploadThanhCong(0);
                            setFirstTime(false);
                        }}>
                    </input>
                </Form.Item>

                <Form.Item>
                    {
                        dataThem.img === '' ? <Image alt="ảnh show" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg" style={{ width: 300, height: 200 }}></Image> : <Image alt="ảnh show" src={dataThem.img} style={{ width: 300, height: 200 }}></Image>
                    }
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginLeft: '30%', width: 300, height: 50 }}
                        onClick={() => {
                            KiemTraDuLieuNhap(dataThem);
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
