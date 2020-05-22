import React, { useState, useEffect } from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import { axios } from '../../config/constant';
import { storage } from '../../firebase/firebase';

export default function ModalThemBanner() {
    const [firstTime, setFirstTime] = useState(true);
    const [imageAsFile, setImageAsFile] = useState([]);
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const showModalThemBannerReducer = useSelector(state => state.showModalThemBanner);
    const [spinnerThemBanner, setSpinnerThemBanner] = useState(-1);
    const dispatch = useDispatch();
    const { Option } = Select;
    const [dataThem, setDataThem] = useState({
        ten: "",
        img: "",
        ngayTao: new Date(),
        positionShow: {
            center: false,
            right: false,
            bottom: false
        }
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
        if (data.ten === '' || data.img === '') {
            alert('Vui lòng nhập đủ dữ liệu cần thiết');
        } else {
            ThemBanner()
        }
    }

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

    return (
        <Modal show={showModalThemBannerReducer} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_THEM_BANNER' });
        }} onShow={() => {
            setImageAsFile([]);
            setFirstTime(true);
            setCountAnhDaUploadThanhCong(0);
            setDataThem({
                ten: "",
                img: "",
                ngayTao: new Date(),
                positionShow: {
                    center: false,
                    right: false,
                    bottom: false
                }
            })
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
                    rules={[{ required: true, message: 'Vui lòng chọn ảnh ảnh' }]}>
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
                        KiemTraDuLieuNhap(dataThem);
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
