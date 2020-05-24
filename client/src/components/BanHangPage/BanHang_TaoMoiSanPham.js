import React, { Fragment, useState, useEffect } from 'react';
import { Form, Input, Tabs, Select } from 'antd';
import { axios } from '../../config/constant';
import { Link } from 'react-router-dom';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { storage } from "../../firebase/firebase";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';

export default function BanHang_TaoMoiSanPham(props) {
    const [cookies, setCookie] = useCookies();
    const [shopID, setShopID] = useState(cookies.shopID);
    const { TabPane } = Tabs;
    const { Option } = Select;
    const [countAnhDaUploadThanhCong, setCountAnhDaUploadThanhCong] = useState(0);
    const [countAnhDaUploadThanhCong_MoTaChiTiet, setCountAnhDaUploadThanhCong_MoTaChiTiet] = useState(0);
    const [countAnhDaUploadThanhCong_Chinh, setCountAnhDaUploadThanhCong_Chinh] = useState(0);
    const [countAnhDaUploadThanhCong_Phu, setCountAnhDaUploadThanhCong_Phu] = useState(0);
    const [firstTime, setFirstTime] = useState(true);
    const [firstTime2, setFirstTime2] = useState(true);
    const [firstTime3, setFirstTime3] = useState(true);
    const [firstTime4, setFirstTime4] = useState(true);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCountries, setDataCountries] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [spinnerBrand, setSpinnerBrand] = useState(false);
    const [disableFieldBaoHanh, setDisableFieldBaoHanh] = useState(false);
    const [dataPhanLoai, setDataPhanLoai] = useState({
        mauSac: {
            mauSac1: '',
            mauSac2: '',
            mauSac3: '',
            mauSac4: ''
        },
        size: {
            size1: '',
            size2: '',
            size3: '',
            size4: ''
        }
    })
    const [dataTaoMoiSanPham, setDataTaoMoiSanPham] = useState({
        ten: '',
        img: {
            chinh: '',
            phu: [],
            moTaChiTiet: []
        },
        gia: '',
        noiSanXuat: '',
        moTa: [],
        moTaNganGon: [],
        soSao: 0,
        giaTriGiamGia: 0,
        soLuong: '',
        thongTinBaoHanh: {
            baoHanh: true,
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        ngayTao: new Date(),
        idBrand: '',
        idCategory: '',
        idShop: '',
        idEvent: '',
        isAccept: false,
        isLock: false,
        isDelete: false
    });
    const [imageAsFile, setImageAsFile] = useState([]);
    const [imageAsFile_MoTaChiTiet, setImageAsFile_MoTaChiTiet] = useState([]);
    const [imageAsFile_Chinh, setImageAsFile_Chinh] = useState([]);
    const [imageAsFile_Phu, setImageAsFile_Phu] = useState([]);
    const [imageAsUrl, setImageAsUrl] = useState([]);
    const [imageAsUrl_MoTaChiTiet, setImageAsUrl_MoTaChiTiet] = useState([]);
    const [imageAsUrl_Chinh, setImageAsUrl_Chinh] = useState([]);
    const [imageAsUrl_Phu, setImageAsUrl_Phu] = useState([]);
    const [dataThem, setDataThem] = useState({
        ten: '',
        xuatXu: '',
        img: ''
    });
    const [showModalTaoMoiBrand, setShowModalTaoMoiBrand] = useState(false);
    const [showModalTaoPhanLoai, setShowModalTaoPhanLoai] = useState(false);
    const layout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 3, span: 16 },
    };

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

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
                                listUrl.push(fireBaseUrl);

                                setCountAnhDaUploadThanhCong(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl(listUrl);
    }

    const handleChangeIMG_MotaChiTiet = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_MoTaChiTiet(listFile);

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
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong_MoTaChiTiet(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_MoTaChiTiet(listUrl);
    }

    const handleChangeIMG_Chinh = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Chinh(listFile);

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
                                listUrl.push(fireBaseUrl);
                                setCountAnhDaUploadThanhCong_Chinh(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Chinh(listUrl);
    }

    const handleChangeIMG_Phu = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Phu(listFile);

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
                                listUrl.push(fireBaseUrl);
                                setDataThem({
                                    ...dataThem,
                                    img:fireBaseUrl
                                });
                                setCountAnhDaUploadThanhCong_Phu(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Phu(listUrl);
    }

    async function LayDataCategoryAll() {
        let resData = await axios.get('hethong/categorys');
        if (resData.data.status === 'success') {
            setDataCategory(resData.data.data);
        } else {
            alert("Lấy data Category thất bại");
        }
    }

    async function LayDataBrandAll() {
        let resData = await axios.get('hethong/brands');
        if (resData.data.status === 'success') {
            setDataBrand(resData.data.data);
        } else {
            alert("Lấy data Brand thất bại");
        }
    }

    async function LayDataCountriesAll() {
        let resData = await axios.get('hethong/countries');
        if (resData.data.status === 'success') {
            setDataCountries(resData.data.data);
        } else {
            alert("Lấy data Countries thất bại");
        }
    }

    async function ThemBrand() {
        let res = await axios.post('hethong/brands-them', {
            ten: dataThem.ten,
            xuatXu: dataThem.xuatXu,
            img: dataThem.img,
        });

        if (res.data.status === 'success') {
            alert("Thêm thành công");
            setSpinnerBrand(true);
            setShowModalTaoMoiBrand(false);
        } else {
            alert("Thêm thất bại");
            setShowModalTaoMoiBrand(false);
        }
    }

    async function ThemSanPham() {
        let res = await axios.post('hethong/products-them-chushop', {
            phanLoai: {
                mauSac: {
                    mauSac1: dataPhanLoai.mauSac.mauSac1,
                    mauSac2: dataPhanLoai.mauSac.mauSac2,
                    mauSac3: dataPhanLoai.mauSac.mauSac3,
                    mauSac4: dataPhanLoai.mauSac.mauSac4
                },
                size: {
                    size1: dataPhanLoai.size.size1,
                    size2: dataPhanLoai.size.size2,
                    size3: dataPhanLoai.size.size3,
                    size4: dataPhanLoai.size.size4,
                }
            },
            ten: dataTaoMoiSanPham.ten,
            img: {
                chinh: dataTaoMoiSanPham.img.chinh,
                phu: dataTaoMoiSanPham.img.phu,
                moTaChiTiet: dataTaoMoiSanPham.img.moTaChiTiet
            },
            gia: dataTaoMoiSanPham.gia,
            noiSanXuat: dataTaoMoiSanPham.noiSanXuat,
            moTa: dataTaoMoiSanPham.moTa,
            moTaNganGon: dataTaoMoiSanPham.moTaNganGon,
            soSao: dataTaoMoiSanPham.soSao,
            giaTriGiamGia: dataTaoMoiSanPham.giaTriGiamGia,
            soLuong: dataTaoMoiSanPham.soLuong,
            thongTinBaoHanh: {
                baoHanh: dataTaoMoiSanPham.thongTinBaoHanh.baoHanh,
                loaiBaoHanh: dataTaoMoiSanPham.thongTinBaoHanh.loaiBaoHanh,
                thoiGianBaoHanh: dataTaoMoiSanPham.thongTinBaoHanh.thoiGianBaoHanh,
                donViBaoHanh: dataTaoMoiSanPham.thongTinBaoHanh.donViBaoHanh
            },
            ngayTao: dataTaoMoiSanPham.ngayTao,
            idBrand: dataTaoMoiSanPham.idBrand,
            idCategory: dataTaoMoiSanPham.idCategory,
            idShop: dataTaoMoiSanPham.idShop,
            idEvent: dataTaoMoiSanPham.idEvent,
            isAccept: dataTaoMoiSanPham.isAccept,
            isLock: dataTaoMoiSanPham.isLock,
            isDelete: dataTaoMoiSanPham.isDelete
        });

        if (res.data.status === 'success') {
            alert("Thêm thành công");
            window.location.reload();
        } else {
            alert("Thêm thất bại");
        }
    }

    useEffect(() => {
        LayDataCategoryAll();
        LayDataBrandAll();
        LayDataCountriesAll();
    }, []);

    useEffect(() => {
        setDataTaoMoiSanPham({
            ...dataTaoMoiSanPham,
            idShop: shopID
        })
    }, [shopID]);

    useEffect(() => {
        if (spinnerBrand === true) {
            LayDataBrandAll();
            setSpinnerBrand(false);
        }
    }, [spinnerBrand]);


    useEffect(() => {
        if (firstTime === false) {
            if (imageAsFile.length === 0) {
                alert('Vui lòng chọn ảnh cho Thương hiệu')
            } else {
                if (countAnhDaUploadThanhCong === imageAsFile.length) {
                    alert('Upload ảnh thương hiệu thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong])

    useEffect(() => {
        if (firstTime2 === false) {
            if (imageAsFile_MoTaChiTiet.length === 0) {
                alert('Vui lòng chọn ảnh cho Mô tả chi tiết')
            } else {
                if (countAnhDaUploadThanhCong_MoTaChiTiet === imageAsFile_MoTaChiTiet.length) {
                    alert('Upload các ảnh mô tả chi tiết thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_MoTaChiTiet])

    useEffect(() => {
        if (firstTime3 === false) {
            if (imageAsFile_Chinh.length === 0) {
                alert('Vui lòng chọn ảnh chính cho sản phẩm')
            } else {
                if (countAnhDaUploadThanhCong_Chinh === imageAsFile_Chinh.length) {
                    alert('Upload ảnh chính cho sản phẩm thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Chinh])

    useEffect(() => {
        if (firstTime4 === false) {
            if (imageAsFile_Phu.length === 0) {
                alert('Vui lòng chọn ảnh phụ cho sản phẩm')
            } else {
                if (countAnhDaUploadThanhCong_Phu === imageAsFile_Phu.length) {
                    alert('Upload các ảnh phụ cho sản phẩm thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Phu])



    return (
        <Fragment>
            <Modal show={showModalTaoMoiBrand} size="lg" animation={false} onHide={() => {
                setShowModalTaoMoiBrand(false);
            }}>
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    style={{ padding: 40 }}>
                    <Form.Item
                        label="Tên"
                        name="ten"
                        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu ' }]}>
                        <Input onChange={(e) => {
                            setDataThem({
                                ...dataThem,
                                ten: e.target.value
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Xuất xứ"
                        name="xuatxu"
                        rules={[{ required: true, message: 'Vui lòng chọn xuất xứ' }]}
                    >
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Chọn xuất xứ"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(value) => {
                                setDataThem({
                                    ...dataThem,
                                    xuatXu: value
                                })
                            }}
                        >
                            {
                                dataCountries.map((item, i) => {
                                    return <Option key={item._id} value={item.name}>
                                        {item.name}
                                    </Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Ảnh đại diện"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                        <div className='row' style={{ marginLeft: 2 }}>
                            <input type='file'
                                onChange={(e) => {
                                    handleChange(e);
                                    setCountAnhDaUploadThanhCong(0);
                                    setFirstTime(false);
                                }}>
                            </input>
                        </div>
                    </Form.Item>

                    <Form.Item
                        name='showanhdaidien'
                        label="Show ảnh đại diện">
                        {
                            imageAsUrl.map((src, i) => {
                                return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                            })
                        }
                    </Form.Item>

                    <Form.Item
                        name='buttontaomoibrand'>
                        <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                            ThemBrand();
                        }}>Tạo Mới</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal show={showModalTaoPhanLoai} size="lg" animation={false} onHide={() => {
                setShowModalTaoPhanLoai(false);
            }}>
                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    style={{ padding: 40 }}>

                    <Form.Item
                        label="Màu sắc"
                        name="mausac">
                        <div className='row'>
                            <Input placeholder='VD: Xanh' defaultValue={dataPhanLoai.mauSac.mauSac1} style={{ width: 150 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac1: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='Đỏ' defaultValue={dataPhanLoai.mauSac.mauSac2} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac2: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='Tím' defaultValue={dataPhanLoai.mauSac.mauSac3} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac3: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='Vàng' defaultValue={dataPhanLoai.mauSac.mauSac4} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    mauSac: {
                                        ...dataPhanLoai.mauSac,
                                        mauSac4: e.target.value
                                    }
                                })
                            }}></Input>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Kích thước"
                        name="kichthuoc">
                        <div className='row'>
                            <Input placeholder='VD: L' defaultValue={dataPhanLoai.size.size1} style={{ width: 150 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size1: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='XL' defaultValue={dataPhanLoai.size.size2} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size2: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='35' defaultValue={dataPhanLoai.size.size3} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size3: e.target.value
                                    }
                                })
                            }}></Input>
                            <Input placeholder='36' defaultValue={dataPhanLoai.size.size4} style={{ width: 150, marginLeft: 20 }} onChange={(e) => {
                                setDataPhanLoai({
                                    ...dataPhanLoai,
                                    size: {
                                        ...dataPhanLoai.size,
                                        size4: e.target.value
                                    }
                                })
                            }}></Input>
                        </div>
                    </Form.Item>

                    <Form.Item
                        name='luuphanloai'>
                        <Button type="primary" style={{ marginLeft: '30%', width: 300, height: 50 }} onClick={() => {
                            // setShowModalTaoPhanLoai(false);
                            console.log(dataPhanLoai)
                        }}>Lưu</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Tabs size='large' style={{ width: '100%' }}>
                <TabPane key={1} tab="Tạo mới sản phẩm">
                    <div className='col'>
                        <h3>Phần thông tin sản phẩm</h3>
                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Tên sản phẩm"
                                name="ten"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                            >
                                <Input onChange={(e) => {
                                    setDataTaoMoiSanPham({
                                        ...dataTaoMoiSanPham,
                                        ten: e.target.value
                                    })
                                }} />
                            </Form.Item>

                            <Form.Item
                                label="Danh mục"
                                name="danhmuc"
                                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Chọn danh mục , nhiều nhất 3 lựa chọn"
                                    onChange={(value) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            idCategory: value
                                        })
                                    }}
                                >
                                    {
                                        dataCategory.map((item, i) => {
                                            return <Option key={item._id} value={item._id}>
                                                {item.ten}
                                            </Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Thương hiệu"
                                name="thuonghieu"
                                rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
                            >
                                {
                                    spinnerBrand === true && (
                                        <Spinner animation="border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner>
                                    )
                                }

                                {
                                    spinnerBrand === false && (
                                        <Fragment>
                                            <Select
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                                style={{ width: '100%' }}
                                                placeholder="Chọn thương hiệu"
                                                onChange={(value) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        idBrand: value
                                                    })
                                                }}
                                            >
                                                {
                                                    dataBrand.map((item, i) => {
                                                        return <Option key={item._id} value={item._id}>
                                                            {item.ten}
                                                        </Option>
                                                    })
                                                }
                                            </Select>
                                            <span>(Không tìm thấy thương hiệu phù hợp ? <Link to='' onClick={(e) => {
                                                e.preventDefault();
                                                setShowModalTaoMoiBrand(true);
                                            }}>Tạo mới</Link>)</span>
                                        </Fragment>
                                    )
                                }

                            </Form.Item>

                            <Form.Item
                                label="Nơi sản xuất"
                                name="noisanxuat"
                                rules={[{ required: true, message: 'Vui lòng chọn nơi sản xuất' }]}
                            >
                                <Select
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    style={{ width: '100%' }}
                                    placeholder="Chọn nơi sản xuất"
                                    onChange={(value) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            noiSanXuat: value
                                        })
                                    }}
                                >
                                    {
                                        dataCountries.map((item, i) => {
                                            return <Option key={item._id} value={item.name}>
                                                {item.name}
                                            </Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Đặc điểm nổi bật"
                                name="dacdiemnoibat"
                                rules={[{ required: true }]}
                            >
                                <Form.List name="dacdiemnoibat">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <div>
                                                {fields.map((field, index) => (
                                                    <Form.Item
                                                        name={'phandacdiemnoibat' + field.name}
                                                        required={false}
                                                        key={field.key}
                                                    >
                                                        <Form.Item
                                                            name={'dacdiemnoibat' + field.name}
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    whitespace: true,
                                                                    message: "Vui lòng nhập đặc điểm nổi bật hoặc xóa nó",
                                                                },
                                                            ]}
                                                            noStyle
                                                        >
                                                            <Input placeholder={'Đặc điểm ' + (index + 1)} style={{ width: '95%' }}
                                                                onBlur={(e) => {
                                                                    var newArray = dataTaoMoiSanPham.moTaNganGon;
                                                                    newArray.push(e.target.value);
                                                                    setDataTaoMoiSanPham({
                                                                        ...dataTaoMoiSanPham,
                                                                        moTaNganGon: newArray
                                                                    })
                                                                }}
                                                                onChange={(e) => {
                                                                    dataTaoMoiSanPham.moTaNganGon.splice(parseInt(field.name), 1);
                                                                }} />
                                                        </Form.Item>
                                                        {fields.length > 1 ? (
                                                            <MinusCircleOutlined
                                                                className="dynamic-delete-button"
                                                                style={{ margin: '0 8px' }}
                                                                onClick={() => {
                                                                    remove(field.name);
                                                                    dataTaoMoiSanPham.moTaNganGon.splice(parseInt(field.name), 1);
                                                                }}
                                                            />
                                                        ) : null}
                                                    </Form.Item>
                                                ))}
                                                <Form.Item
                                                    name='buttonthemdacdiemnoibat'>
                                                    <Button
                                                        type="dashed"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            add();
                                                        }}
                                                        style={{ width: '95%' }}
                                                    >
                                                        <PlusOutlined /> Thêm đặc điểm nổi bật
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        );
                                    }}
                                </Form.List>
                            </Form.Item>

                            <Form.Item
                                label="Mô tả chi tiết"
                                name="motachitiet"
                                rules={[{ required: true }]}
                            >
                                <Form.List name="motachitiet">
                                    {(fields, { add, remove }) => {
                                        return (
                                            <div>
                                                {fields.map((field, index) => (
                                                    <Form.Item
                                                        name={'phanmotachitiet' + field.name}
                                                        required={false}
                                                        key={field.key}
                                                    >
                                                        <Form.Item
                                                            {...field}
                                                            name={'motachitiet' + field.name}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    whitespace: true,
                                                                    message: "Vui lòng nhập mô tả hoặc xóa nó",
                                                                },
                                                            ]}
                                                            noStyle
                                                        >
                                                            <Input placeholder={'Mô tả ' + (index + 1)} style={{ width: '95%' }}
                                                                onBlur={(e) => {
                                                                    var newArray = dataTaoMoiSanPham.moTa;
                                                                    newArray.push(e.target.value);
                                                                    setDataTaoMoiSanPham({
                                                                        ...dataTaoMoiSanPham,
                                                                        moTa: newArray
                                                                    })
                                                                }}
                                                                onChange={(e) => {
                                                                    dataTaoMoiSanPham.moTa.splice(parseInt(field.name), 1);
                                                                }} />
                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    style={{ margin: '0 8px' }}
                                                                    onClick={() => {
                                                                        remove(field.name);
                                                                        dataTaoMoiSanPham.moTa.splice(parseInt(field.name), 1);
                                                                    }}
                                                                />
                                                            ) : null}
                                                        </Form.Item>

                                                    </Form.Item>
                                                ))}
                                                <Form.Item
                                                    name='buttonthemmota'>
                                                    <Button
                                                        type="dashed"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            add();
                                                        }}
                                                        style={{ width: '95%' }}
                                                    >
                                                        <PlusOutlined /> Thêm mô tả
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        );
                                    }}
                                </Form.List>
                            </Form.Item>

                            <Form.Item
                                label="Ảnh cho mô tả"
                                name="anhmota"
                                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                                <input type='file'
                                    multiple
                                    onChange={(e) => {
                                        handleChangeIMG_MotaChiTiet(e);
                                        setCountAnhDaUploadThanhCong_MoTaChiTiet(0);
                                        setFirstTime2(false);
                                    }}>
                                </input>
                            </Form.Item>

                            <Form.Item
                                name='showanhchomota'
                                label="Show ảnh cho mô tả">
                                {
                                    imageAsUrl_MoTaChiTiet.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                }
                            </Form.Item>



                            <Form.Item
                                label="Ảnh chính cho sản phẩm"
                                name="anhchinh"
                                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                                <input type='file'
                                    onChange={(e) => {
                                        handleChangeIMG_Chinh(e);
                                        setCountAnhDaUploadThanhCong_Chinh(0);
                                        setFirstTime3(false);
                                    }}>
                                </input>
                            </Form.Item>

                            <Form.Item
                                name='showanhchinh'
                                label="Show ảnh chính">
                                {
                                    imageAsUrl_Chinh.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                }
                            </Form.Item>

                            <Form.Item
                                label="Ảnh phụ cho sản phẩm"
                                name="anhphu"
                                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                                <input type='file'
                                    multiple
                                    onChange={(e) => {
                                        handleChangeIMG_Phu(e);
                                        setCountAnhDaUploadThanhCong_Phu(0);
                                        setFirstTime4(false);
                                    }}>
                                </input>
                            </Form.Item>

                            <Form.Item
                                name='showanhphu'
                                label="Show các ảnh phụ">
                                {
                                    imageAsUrl_Phu.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                }
                            </Form.Item>
                        </Form>
                        <br></br>
                        <h3>Phần thông tin bán hàng</h3>
                        <Form {...layout}>
                            <Form.Item
                                label="Giá gốc"
                                name="giagoc"
                                rules={[{ required: true, message: 'Vui lòng nhập giá gốc sản phẩm' }]}>
                                <Input
                                    onChange={(e) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            gia: parseInt(e.target.value)
                                        })
                                    }}></Input>
                            </Form.Item>

                            <Form.Item
                                label="Giá trị giảm"
                                name="giatrigiam">
                                <Input
                                    onChange={(e) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            giaTriGiamGia: parseInt(e.target.value)
                                        })
                                    }}></Input>(Nếu giá trị nhập nhỏ hơn 100 thì hệ thống sẽ tự động giảm theo %)
                            </Form.Item>

                            <Form.Item
                                label="Số lượng sản phẩm"
                                name="soluong"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}>
                                <Input
                                    onChange={(e) => {
                                        setDataTaoMoiSanPham({
                                            ...dataTaoMoiSanPham,
                                            soLuong: parseInt(e.target.value)
                                        })
                                    }}></Input>
                            </Form.Item>

                            <Form.Item
                                label="Màu sắc, kích thước"
                                name="mausackichthuoc">
                                <Button onClick={() => {
                                    setShowModalTaoPhanLoai(true);
                                }}>Thêm phân loại</Button>
                            </Form.Item>

                            <Form.Item
                                label="Bảo hành"
                                name="baohanh">
                                <Select style={{ width: '100%' }}
                                    defaultValue={0}
                                    onChange={(value) => {
                                        if (value === 1) {
                                            setDisableFieldBaoHanh(true);
                                            setDataTaoMoiSanPham({
                                                ...dataTaoMoiSanPham,
                                                thongTinBaoHanh: {
                                                    baoHanh: false,
                                                    donViBaoHanh: '',
                                                    loaiBaoHanh: '',
                                                    thoiGianBaoHanh: ''
                                                }
                                            })
                                        }

                                        if (value === 0) {
                                            setDisableFieldBaoHanh(false);
                                            setDataTaoMoiSanPham({
                                                ...dataTaoMoiSanPham,
                                                thongTinBaoHanh: {
                                                    baoHanh: true,
                                                    donViBaoHanh: '',
                                                    loaiBaoHanh: '',
                                                    thoiGianBaoHanh: ''
                                                }
                                            })
                                        }
                                    }}>
                                    <Option value={0}>Có</Option>
                                    <Option value={1}>Không</Option>
                                </Select>
                            </Form.Item>

                            {
                                dataTaoMoiSanPham.thongTinBaoHanh.baoHanh === true && (
                                    <Fragment>
                                        <Form.Item
                                            label="Thời gian bảo hành"
                                            name="thoigianbaohanh"
                                            rules={[{ required: true, message: 'Vui lòng nhập thời gian bảo hành' }]}>
                                            <Input disabled={disableFieldBaoHanh}
                                                onChange={(e) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        thongTinBaoHanh: {
                                                            ...dataTaoMoiSanPham.thongTinBaoHanh,
                                                            thoiGianBaoHanh: parseInt(e.target.value)
                                                        }
                                                    })
                                                }}></Input>
                                        </Form.Item>

                                        <Form.Item
                                            label="Đơn vị thời gian bảo hành"
                                            name="donvibaohanh"
                                            rules={[{ required: true, message: 'Vui lòng nhập đơn vị thời gian bảo hành' }]}>
                                            <Select style={{ width: '100%' }}
                                                defaultValue={0}
                                                disabled={disableFieldBaoHanh}
                                                onChange={(value) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        thongTinBaoHanh: {
                                                            ...dataTaoMoiSanPham.thongTinBaoHanh,
                                                            donViBaoHanh: value - 1
                                                        }
                                                    })
                                                }}>
                                                <Option disabled={true} value={0}>Chọn đơn vị thời gian</Option>
                                                <Option value={1}>Tháng</Option>
                                                <Option value={2}>Năm</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Loại bảo hành"
                                            name="loaibaohanh"
                                            rules={[{ required: true, message: 'Vui lòng chọn loại bảo hành' }]}>
                                            <Select style={{ width: '100%' }}
                                                defaultValue={0}
                                                disabled={disableFieldBaoHanh}
                                                onChange={(value) => {
                                                    setDataTaoMoiSanPham({
                                                        ...dataTaoMoiSanPham,
                                                        thongTinBaoHanh: {
                                                            ...dataTaoMoiSanPham.thongTinBaoHanh,
                                                            loaiBaoHanh: value - 1
                                                        }
                                                    })
                                                }}>
                                                <Option disabled={true} value={0}>Chọn loại bảo hành</Option>
                                                <Option value={1}>Bảo hành chính hãng</Option>
                                                <Option value={2}>Bảo hành bởi shop thông qua TiemDo</Option>
                                            </Select>
                                        </Form.Item>
                                    </Fragment>
                                )
                            }
                        </Form>
                    </div>

                    <Form {...layout}>
                        <Form.Item {...tailLayout}
                            name='buttontaomoisanpham'>
                            <Button
                                onClick={() => {
                                    ThemSanPham();
                                }}
                                onMouseOver={() => {
                                    setDataTaoMoiSanPham({
                                        ...dataTaoMoiSanPham,
                                        img: {
                                            chinh: imageAsUrl_Chinh[0],
                                            phu: imageAsUrl_Phu,
                                            moTaChiTiet: imageAsUrl_MoTaChiTiet
                                        }
                                    })
                                }}>Tạo mới</Button>
                        </Form.Item>

                        <Form.Item {...tailLayout}
                            name='buttontest'>
                            <Button
                                onClick={() => {
                                    console.log(dataTaoMoiSanPham)
                                    console.log(dataPhanLoai);
                                    // alert(JSON.stringify(imageAsUrl_MoTaChiTiet));
                                }}
                                onMouseOver={() => {
                                    setDataTaoMoiSanPham({
                                        ...dataTaoMoiSanPham,
                                        img: {
                                            chinh: imageAsUrl_Chinh[0],
                                            phu: imageAsUrl_Phu,
                                            moTaChiTiet: imageAsUrl_MoTaChiTiet
                                        }
                                    })
                                }}>Test</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Fragment >
    )
}
