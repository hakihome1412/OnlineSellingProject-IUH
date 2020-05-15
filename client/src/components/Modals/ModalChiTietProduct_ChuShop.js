import React, { useState, useEffect, Fragment } from 'react';
import { Modal, Image, Spinner, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select } from 'antd';
import { axios } from '../../config/constant';
import { storage } from "../../firebase/firebase";

export default function ModalChiTietProduct_ChuShop() {
    const { Option } = Select;
    const dispatch = useDispatch();
    const showChiTietProduct_ChuShop = useSelector(state => state.showChiTietProduct_ChuShop);
    const [spinnerChiTietProduct, setSpinnerChiTietProduct] = useState(false);
    const objectIDDuocChonReducer = useSelector(state => state.objectIDDuocChon);
    const [disableOptions, setDisableOptions] = useState(false);
    const [statusSua, setStatusSua] = useState(0);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCountries, setDataCountries] = useState([]);
    const [dataBrand, setDataBrand] = useState([]);
    const [countAnhDaUploadThanhCong_MoTaChiTiet, setCountAnhDaUploadThanhCong_MoTaChiTiet] = useState(0);
    const [countAnhDaUploadThanhCong_Chinh, setCountAnhDaUploadThanhCong_Chinh] = useState(0);
    const [countAnhDaUploadThanhCong_Phu, setCountAnhDaUploadThanhCong_Phu] = useState(0);
    const [imageAsUrl_MoTaChiTiet, setImageAsUrl_MoTaChiTiet] = useState([]);
    const [imageAsUrl_Chinh, setImageAsUrl_Chinh] = useState([]);
    const [imageAsUrl_Phu, setImageAsUrl_Phu] = useState([]);
    const [imageAsFile_MoTaChiTiet, setImageAsFile_MoTaChiTiet] = useState([]);
    const [imageAsFile_Chinh, setImageAsFile_Chinh] = useState([]);
    const [imageAsFile_Phu, setImageAsFile_Phu] = useState([]);
    const [firstTime2, setFirstTime2] = useState(true);
    const [firstTime3, setFirstTime3] = useState(true);
    const [firstTime4, setFirstTime4] = useState(true);
    const [spinnerXoaProduct, setSpinnerXoaProduct] = useState(-1);
    const [spinnerSuaProduct, setSpinnerSuaProduct] = useState(-1);
    const [productNow, setProductNow] = useState({
        _id: '',
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
        ngayTao: new Date(),
        thongTinBaoHanh: {
            baoHanh: true,
            loaiBaoHanh: '',
            thoiGianBaoHanh: '',
            donViBaoHanh: ''
        },
        idBrand: '',
        idCategory: '',
        isLock: false,
        isAccept: false
    });
    const [productSua, setProductSua] = useState({
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
        idBrand: '',
        idCategory: '',
        isLock: false,
    });

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
        setProductSua({
            ...productSua,
            img: {
                ...productSua.img,
                moTaChiTiet: listUrl
            }
        });
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
        setProductSua({
            ...productSua,
            img: {
                ...productSua.img,
                chinh: listUrl[0]
            }
        });
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
                                setCountAnhDaUploadThanhCong_Phu(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Phu(listUrl);
        setProductSua({
            ...productSua,
            img:{
                ...productSua.img,
                phu:listUrl
            }
        });
    }

    async function SuaProduct(productID) {
        //dispatch({ type: 'SPINNER_SUACAROUSEL' });
        setSpinnerSuaProduct(1);
        setDisableOptions(false);
        if (statusSua === 1) {
            let resData = await axios.put('hethong/products-sua-chushop', {
                _id: productID,
                ten: productSua.ten,
                img: {
                    chinh: productSua.img.chinh,
                    phu: productSua.img.phu,
                    moTaChiTiet: productSua.img.moTaChiTiet
                },
                gia: productSua.gia,
                noiSanXuat: productSua.noiSanXuat,
                moTa: productSua.moTa,
                moTaNganGon: productSua.moTaNganGon,
                soSao: productSua.soSao,
                giaTriGiamGia: productSua.giaTriGiamGia,
                soLuong: productSua.soLuong,
                thongTinBaoHanh: {
                    baoHanh: productSua.thongTinBaoHanh.baoHanh,
                    loaiBaoHanh: productSua.thongTinBaoHanh.loaiBaoHanh,
                    thoiGianBaoHanh: productSua.thongTinBaoHanh.thoiGianBaoHanh,
                    donViBaoHanh: productSua.thongTinBaoHanh.donViBaoHanh
                },
                idBrand: productSua.idBrand,
                idCategory: productSua.idCategory,
                isLock: productSua.isLock,
            });

            if (resData.data.status === 'success') {
                dispatch({ type: 'RELOAD_DATABASE' });
                setStatusSua(0);
                setSpinnerSuaProduct(-1);
                alert("Sửa thành công");
                setDisableOptions(false);
            }
            else {
                setSpinnerSuaProduct(0);
                setStatusSua(0);
                setDisableOptions(true);
                dispatch({ type: 'NO_RELOAD_DATABASE' });
                alert("Sửa thất bại");
            }

        } else {
            alert("fail 1");
        }
    }

    async function XoaProduct(productID) {
        setSpinnerXoaProduct(1);
        let resData = await axios.put('hethong/products-xoa', {
            id: productID
        });

        if (resData.data.status === 'success') {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaProduct(0);
            dispatch({ type: 'RELOAD_DATABASE' });
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
            alert("Xóa thành công");
        } else {
            setStatusSua(0);
            setDisableOptions(false);
            setSpinnerXoaProduct(0);
            dispatch({ type: 'NO_RELOAD_DATABASE' });
            alert("Xóa thất bại");
        }
    }

    async function LayProductTheoID(productID) {
        setSpinnerChiTietProduct(true);
        let resData = await axios.get('hethong/products-item/?id=' + productID);
        if (resData.data.status === 'success') {
            setProductNow({
                _id: resData.data.data._id,
                ten: resData.data.data.ten,
                img: {
                    chinh: resData.data.data.img.chinh,
                    phu: resData.data.data.img.phu,
                    moTaChiTiet: resData.data.data.img.moTaChiTiet
                },
                gia: resData.data.data.gia,
                noiSanXuat: resData.data.data.noiSanXuat,
                moTa: resData.data.data.moTa,
                moTaNganGon: resData.data.data.moTaNganGon,
                soSao: resData.data.data.soSao,
                giaTriGiamGia: resData.data.data.giaTriGiamGia,
                soLuong: resData.data.data.soLuong,
                ngayTao: resData.data.data.ngayTao,
                thongTinBaoHanh: {
                    baoHanh: resData.data.data.thongTinBaoHanh.baoHanh,
                    loaiBaoHanh: resData.data.data.thongTinBaoHanh.loaiBaoHanh,
                    thoiGianBaoHanh: resData.data.data.thongTinBaoHanh.thoiGianBaoHanh,
                    donViBaoHanh: resData.data.data.thongTinBaoHanh.donViBaoHanh
                },
                idBrand: resData.data.data.idBrand,
                idCategory: resData.data.data.idCategory,
                isLock: resData.data.data.isLock,
                isAccept: resData.data.data.isAccept
            });
            setSpinnerChiTietProduct(false);
        } else {
            alert("Lấy data thất bại");
            setSpinnerChiTietProduct(false);
        }
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

    useEffect(() => {
        LayDataCategoryAll();
        LayDataBrandAll();
        LayDataCountriesAll();
    }, [])

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
        <Modal show={showChiTietProduct_ChuShop} size="lg" animation={false} onHide={() => {
            dispatch({ type: 'CLOSE_CHITIET_PRODUCT_CHUSHOP' });
        }}
            onShow={() => {
                LayProductTheoID(objectIDDuocChonReducer);
                setDisableOptions(false);
            }}>

            {
                spinnerChiTietProduct === true && (
                    <Spinner animation="border" role="status" style={{ marginLeft: 400 }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )
            }
            {
                spinnerChiTietProduct === false && (
                    <Form
                        name="basic"
                        layout='vertical'
                        initialValues={{ remember: true }}
                        style={{ padding: 40 }}>
                        <Form.Item
                            label="Tên sản phẩm"
                            name="ten"
                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm ' }]}>
                            <Input disabled={!disableOptions} defaultValue={productNow.ten} onChange={(e) => {
                                setProductSua({
                                    ...productSua,
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
                                disabled={!disableOptions}
                                defaultValue={productNow.idCategory}
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Chọn danh mục , nhiều nhất 3 lựa chọn"
                                onChange={(value) => {
                                    setProductSua({
                                        ...productSua,
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
                            <Select
                                disabled={!disableOptions}
                                defaultValue={productNow.idBrand}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%' }}
                                placeholder="Chọn thương hiệu"
                                onChange={(value) => {
                                    setProductSua({
                                        ...productSua,
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
                        </Form.Item>

                        <Form.Item
                            label="Nơi sản xuất"
                            name="noisanxuat"
                            rules={[{ required: true, message: 'Vui lòng chọn nơi sản xuất' }]}
                        >
                            <Select
                                disabled={!disableOptions}
                                defaultValue={productNow.noiSanXuat}
                                style={{ width: '100%' }}
                                placeholder="Chọn nơi sản xuất"
                                onChange={(value) => {
                                    setProductSua({
                                        ...productSua,
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
                            {
                                productNow.moTaNganGon.map((item, i) => {
                                    return <Input disabled={!disableOptions} defaultValue={item} onChange={(e) => {
                                        productNow.moTaNganGon[i] = e.target.value;
                                        var newArray = productNow.moTaNganGon;
                                        setProductSua({
                                            ...productSua,
                                            moTaNganGon: newArray
                                        })
                                    }} />
                                })
                            }
                        </Form.Item>

                        <Form.Item
                            label="Mô tả chi tiết"
                            name="motachitiet"
                            rules={[{ required: true }]}
                        >
                            {
                                productNow.moTa.map((item, i) => {
                                    return <Input disabled={!disableOptions} defaultValue={item} onChange={(e) => {
                                        productNow.moTa[i] = e.target.value;
                                        var newArray = productNow.moTa;
                                        setProductSua({
                                            ...productSua,
                                            moTa: newArray
                                        })
                                    }} />
                                })
                            }
                        </Form.Item>

                        <Form.Item
                            label="Ảnh cho mô tả"
                            name="anhmota"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                            <input type='file'
                                multiple
                                disabled={!disableOptions}
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
                                statusSua === 0 && (
                                    productNow.img.moTaChiTiet.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl_MoTaChiTiet.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="Giá gốc"
                            name="giagoc"
                            rules={[{ required: true, message: 'Vui lòng nhập giá gốc sản phẩm' }]}>
                            <Input
                                disabled={!disableOptions}
                                defaultValue={productNow.gia.toString()}
                                onChange={(e) => {
                                    setProductSua({
                                        ...productSua,
                                        gia: parseInt(e.target.value)
                                    })
                                }}></Input>
                        </Form.Item>

                        <Form.Item
                            label="Giá trị giảm"
                            name="giatrigiam">
                            <Input
                                disabled={!disableOptions}
                                defaultValue={productNow.giaTriGiamGia.toString()}
                                onChange={(e) => {
                                    setProductSua({
                                        ...productSua,
                                        giaTriGiamGia: parseInt(e.target.value)
                                    })
                                }}></Input>(Nếu giá trị nhập nhỏ hơn 100 thì hệ thống sẽ tự động giảm theo %)
                        </Form.Item>

                        <Form.Item
                            label="Ảnh chính cho sản phẩm"
                            name="anhchinh"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                            <input type='file'
                                disabled={!disableOptions}
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
                                statusSua === 0 && (
                                    <img style={{ marginLeft: 20 }} src={productNow.img.chinh} alt={'ảnh'} width='200' height='150'></img>
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl_Chinh.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="Ảnh phụ cho sản phẩm"
                            name="anhphu"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                            <input type='file'
                                disabled={!disableOptions}
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
                                statusSua === 0 && (
                                    productNow.img.phu.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                            {
                                statusSua === 1 && (
                                    imageAsUrl_Phu.map((src, i) => {
                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                    })
                                )
                            }
                        </Form.Item>

                        <Form.Item
                            label="Số lượng sản phẩm"
                            name="soluong"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}>
                            <Input
                                disabled={!disableOptions}
                                defaultValue={productNow.soLuong.toString()}
                                onChange={(e) => {
                                    setProductSua({
                                        ...productSua,
                                        soLuong: parseInt(e.target.value)
                                    })
                                }}></Input>
                        </Form.Item>

                        <Form.Item
                            label="Bảo hành"
                            name="baohanh">
                            <Select style={{ width: '100%' }}
                                disabled={true}
                                defaultValue={productNow.thongTinBaoHanh.baoHanh === true ? 0 : 1}>
                                <Option value={0}>Có</Option>
                                <Option value={1}>Không</Option>
                            </Select>
                        </Form.Item>

                        {
                            productNow.thongTinBaoHanh.baoHanh === true && (
                                <Fragment>
                                    <Form.Item
                                        label="Thời gian bảo hành"
                                        name="thoigianbaohanh"
                                        rules={[{ required: true, message: 'Vui lòng nhập thời gian bảo hành' }]}>
                                        <Input
                                            disabled={!disableOptions}
                                            defaultValue={productNow.thongTinBaoHanh.thoiGianBaoHanh.toString()}
                                            onChange={(e) => {
                                                setProductSua({
                                                    ...productSua,
                                                    thongTinBaoHanh: {
                                                        ...productSua.thongTinBaoHanh,
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
                                            disabled={!disableOptions}
                                            defaultValue={productNow.thongTinBaoHanh.donViBaoHanh}
                                            onChange={(value) => {
                                                setProductSua({
                                                    ...productSua,
                                                    thongTinBaoHanh: {
                                                        ...productSua.thongTinBaoHanh,
                                                        donViBaoHanh: value
                                                    }
                                                })
                                            }}>
                                            <Option value={0}>Tháng</Option>
                                            <Option value={1}>Năm</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Loại bảo hành"
                                        name="loaibaohanh"
                                        rules={[{ required: true, message: 'Vui lòng chọn loại bảo hành' }]}>
                                        <Select style={{ width: '100%' }}
                                            disabled={!disableOptions}
                                            defaultValue={productNow.thongTinBaoHanh.loaiBaoHanh}
                                            onChange={(value) => {
                                                setProductSua({
                                                    ...productSua,
                                                    thongTinBaoHanh: {
                                                        ...productSua.thongTinBaoHanh,
                                                        loaiBaoHanh: value
                                                    }
                                                })
                                            }}>
                                            <Option value={0}>Bảo hành chính hãng</Option>
                                            <Option value={1}>Bảo hành bởi shop thông qua TiemDo</Option>
                                        </Select>
                                    </Form.Item>
                                </Fragment>
                            )
                        }

                        <Form.Item
                            label="Ngày tạo"
                            name="ngaytao">
                            <Input disabled={true} defaultValue={productNow.ngayTao.toString()} />
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái khóa">
                            <Select disabled={!disableOptions} defaultValue={productNow.isLock === false ? "nolock" : "lock"} onChange={(value) => {
                                setProductSua({
                                    ...productSua,
                                    isLock: value === "lock" ? true : false
                                });
                            }}>
                                <Option key="lock">Có</Option>
                                <Option key="nolock">Không</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái duyệt">
                            <Select disabled={true} defaultValue={productNow.isAccept === false ? "accept" : "noaccept"}>
                                <Option key="accept">Đã duyệt</Option>
                                <Option key="noaccept">Chưa duyệt</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button variant="primary" style={{ width: 300, height: 50, marginLeft: '30%' }} disabled={disableOptions} onClick={() => {
                                XoaProduct(productNow._id);
                            }}>
                                {
                                    spinnerXoaProduct === 1 ? (
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
                                }
                                else {
                                    SuaProduct(productNow._id);
                                }
                                setProductSua({
                                    ten: productNow.ten,
                                    img: {
                                        chinh: productNow.img.chinh,
                                        phu: productNow.img.phu,
                                        moTaChiTiet: productNow.img.moTaChiTiet
                                    },
                                    gia: productNow.gia,
                                    noiSanXuat: productNow.noiSanXuat,
                                    moTa: productNow.moTa,
                                    moTaNganGon: productNow.moTaNganGon,
                                    soSao: productNow.soSao,
                                    giaTriGiamGia: productNow.giaTriGiamGia,
                                    soLuong: productNow.soLuong,
                                    thongTinBaoHanh: {
                                        baoHanh: productNow.thongTinBaoHanh.baoHanh,
                                        loaiBaoHanh: productNow.thongTinBaoHanh.loaiBaoHanh,
                                        thoiGianBaoHanh: productNow.thongTinBaoHanh.thoiGianBaoHanh,
                                        donViBaoHanh: productNow.thongTinBaoHanh.donViBaoHanh
                                    },
                                    idBrand: productNow.idBrand,
                                    idCategory: productNow.idCategory,
                                    isLock: productNow.isLock
                                });

                                console.log(productSua);
                            }}>
                                {
                                    statusSua === 0 && spinnerSuaProduct === -1 ? "Sửa" : "Lưu"
                                }
                                {
                                    spinnerSuaProduct === 1 && (
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
            <Button onClick={() => {
                console.log(productNow);
            }}>
                test
            </Button>
        </Modal>
    )
}
