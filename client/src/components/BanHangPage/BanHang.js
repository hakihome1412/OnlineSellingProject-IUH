import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Dropdown, Tabs, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { storage } from "../../firebase/firebase";
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';
import { BanHang_TrangChuComponent, BanHang_DanhSachSanPhamComponent, BanHang_TaoMoiSanPhamComponent } from '../allJS'

export default function BanHang() {
    const { SubMenu } = Menu;
    const { TabPane } = Tabs;
    const [cookie, setCookie, removeCookies] = useCookies();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const setSpinnerReducer = useSelector(state => state.setSpinner);
    const setKeyMenuBanHang = useSelector(state => state.setKeyMenuBanHang);
    const [countAnhDaUploadThanhCong_Logo, setCountAnhDaUploadThanhCong_Logo] = useState(0);
    const [firstTime1, setFirstTime1] = useState(true);
    const [imageAsFile_Logo, setImageAsFile_Logo] = useState([]);
    const [imageAsUrl_Logo, setImageAsUrl_Logo] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataTaoShop, setDataTaoShop] = useState({
        ten: '',
        moTa: '',
        diaChi: '',
        logoShop: '',
        ngayTao: new Date()
    })
    const [dataUser, setDataUser] = useState({
        _id: '',
        email: '',
        thongTinShop: {
            idShop: '',
            ten: '',
            moTa: '',
            diaChi: '',
            logoShop: '',
            img:{
                carousel:[],
                banner1:'',
                banner2:''
            }
        }
    });
    const dispatch = useDispatch();
    let history = useHistory();
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 12,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    const menu = (
        <Menu>
            <Menu.Item >
                Đổi mật khẩu
          </Menu.Item>
            <Menu.Item onClick={() => {
                removeCookies('token');
                removeCookies('userID');
                window.location.pathname = '/';
            }}>
                Đăng xuất
          </Menu.Item>
        </Menu>
    );
    const idUser = cookie.userID;

    const handleChangeIMG_Logo = (e) => {
        var soLuongFile = e.target.files.length;
        var listFile = [];
        var listUrl = [];
        for (let index = 0; index < soLuongFile; index++) {
            listFile.push(e.target.files[index]);
        }

        setImageAsFile_Logo(listFile);

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
                                setCountAnhDaUploadThanhCong_Logo(countPrev => countPrev + 1);
                            })
                    })
            }
        }
        setImageAsUrl_Logo(listUrl);
    }

    async function TaoShop() {
        let resData = await axios.put('hethong/users-taoshop', {
            _id: dataUser._id,
            ten: dataTaoShop.ten,
            diaChi: dataTaoShop.diaChi,
            logoShop: dataTaoShop.logoShop,
            ngayTao: dataTaoShop.ngayTao,
            moTa: dataTaoShop.moTa
        });
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            alert('Đăng ký gian hàng thành công');
            window.location.reload();
        } else {
            alert("Đăng ký gian hàng thất bại");
        }
    }

    async function LayDataUserTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            //alert(JSON.stringify(resData.data.data));
            setDataUser({
                _id: resData.data.data._id,
                email: resData.data.data.email,
                thongTinShop: {
                    idShop: resData.data.data.thongTinShop.idShop,
                    ten: resData.data.data.thongTinShop.ten,
                    moTa: resData.data.data.thongTinShop.moTa,
                    diaChi: resData.data.data.thongTinShop.diaChi,
                    logoShop: resData.data.data.thongTinShop.logoShop,
                    img:{
                        carousel:resData.data.data.thongTinShop.img.carousel,
                        banner1:resData.data.data.thongTinShop.img.banner1,
                        banner2:resData.data.data.thongTinShop.img.banner2
                    }
                }
            });
        } else {
            alert("Lấy data thất bại");
        }
    }

    useEffect(() => {
        LayDataUserTheoIDUser(idUser);
    }, [])

    return (
        <div className='row' style={{ marginRight: 0 }}>
            {
                dataUser.thongTinShop.idShop === '' && (
                    <Fragment>
                        <div className='col'>
                            <div className='row' style={{ float: 'right', marginRight: 20 }}>
                                <Dropdown overlay={menu} placement="bottomCenter">
                                    <Button size='large' style={{ marginTop: 15 }}>
                                        <img alt="" src='/logoshop.png' width="30" height="30" /> &nbsp; {dataUser.email} <DownOutlined />
                                    </Button>
                                </Dropdown>
                            </div>
                            <div className='container' style={{ marginTop: 80 }}>
                                <div className='col'>
                                    <center><h2>ĐĂNG KÝ GIAN HÀNG</h2></center>
                                    <div>
                                        <Form
                                            {...layout}
                                            name="basic"
                                            initialValues={{
                                                remember: true,
                                            }}
                                        >
                                            <Form.Item
                                                label="Tên gian hàng"
                                                name="ten"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập tên gian hàng',
                                                    },
                                                ]}
                                            >
                                                <Input onChange={(e) => {
                                                    setDataTaoShop({
                                                        ...dataTaoShop,
                                                        ten: e.target.value
                                                    })
                                                }} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Địa chỉ"
                                                name="diachi"
                                            >
                                                <Input onChange={(e) => {
                                                    setDataTaoShop({
                                                        ...dataTaoShop,
                                                        diaChi: e.target.value
                                                    })
                                                }} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Mô tả"
                                                name="mota"
                                            >
                                                <Input onChange={(e) => {
                                                    setDataTaoShop({
                                                        ...dataTaoShop,
                                                        moTa: e.target.value
                                                    })
                                                }} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Logo"
                                                name="logo"
                                                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}>
                                                <input type='file'
                                                    onChange={(e) => {
                                                        handleChangeIMG_Logo(e);
                                                        setCountAnhDaUploadThanhCong_Logo(0);
                                                        setFirstTime1(false);
                                                    }}>
                                                </input>
                                            </Form.Item>

                                            <Form.Item
                                                name='showlogo'
                                                label="Show ảnh logo">
                                                {
                                                    imageAsUrl_Logo.map((src, i) => {
                                                        return <img key={i} style={{ marginLeft: 20 }} src={src} alt={'ảnh ' + i} width='200' height='150'></img>
                                                    })
                                                }
                                            </Form.Item>

                                            <Form.Item {...tailLayout}>
                                                <Button type="primary" style={{ width: 300 }}
                                                    onMouseOver={() => {
                                                        setDataTaoShop({
                                                            ...dataTaoShop,
                                                            logoShop: imageAsUrl_Logo[0]
                                                        })
                                                    }}
                                                    onClick={() => {
                                                        TaoShop();
                                                    }}>
                                                    Xác nhận
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                )
            }
            {
                dataUser.thongTinShop.idShop !== '' && (
                    <Fragment>
                        <div className='col-sm-2'>
                            <div style={{ height: 70, width: 310, backgroundColor: '#003366' }}>
                                <Link to='/'>
                                    <div className='row' style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <img alt="" src='/logo.png' width="50" height="70" />
                                        <span style={{ fontWeight: 'bold', color: 'orange', fontSize: 28 }}>TiemDo</span>
                                    </div>
                                </Link>
                            </div>
                            <Menu mode="inline" theme="dark" style={{ width: 310, height: 600 }}>
                                <Menu.Item key="0" onClick={() => {
                                    //history.push('/banhang');
                                    dispatch({ type: 'MENU_TRANGCHU' });
                                }}>Trang chủ</Menu.Item>
                                <Menu.Item key="1" onClick={() => {
                                    // history.push('/banhang/don-hang');
                                    dispatch({ type: 'MENU_DONHANG' });
                                }}>Đơn hàng</Menu.Item>
                                <SubMenu key="sub1" title="Sản phẩm">
                                    <Menu.Item key="2" onClick={() => {
                                        // history.push('/banhang/san-pham/danh-sach-san-pham');
                                        dispatch({ type: 'MENU_DANHSACHSANPHAM' });
                                    }}>Danh sách sản phẩm</Menu.Item>
                                    <Menu.Item key="3" onClick={() => {
                                        // history.push('/banhang/san-pham/tao-moi-san-pham');
                                        dispatch({ type: 'MENU_TAOMOISANPHAM' });
                                    }}>Tạo mới/ Đăng mới sản phẩm</Menu.Item>
                                    <Menu.Item key="4" onClick={() => {
                                        // history.push('/banhang/san-pham/ton-kho');
                                        dispatch({ type: 'MENU_BAOCAOTONKHO' });
                                    }}>Báo cáo tồn kho</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title="Quảng cáo">
                                    <Menu.Item key="5">Danh sách giảm giá</Menu.Item>
                                    <Menu.Item key="6">Danh sách coupon</Menu.Item>
                                    <Menu.Item key="7">Chương trình khuyến mãi</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                        <div className='col-sm-10'>
                            <div className='col'>
                                <div className='row' style={{ float: 'right' }}>
                                    <Dropdown overlay={menu} placement="bottomCenter">
                                        <Button size='large' style={{ marginTop: 15 }}>
                                            <img alt="" src='/logoshop.png' width="30" height="30" /> &nbsp; {dataUser.email} <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                </div>

                                <div className='row' style={{ width: '95%', height: 'auto', marginLeft: 20 }}>
                                    {
                                        setKeyMenuBanHang === 0 && (
                                            <BanHang_TrangChuComponent dataUser={dataUser}></BanHang_TrangChuComponent>
                                        )
                                    }

                                    {
                                        setKeyMenuBanHang === 2 && (
                                            <BanHang_DanhSachSanPhamComponent dataUser={dataUser}></BanHang_DanhSachSanPhamComponent>
                                        )
                                    }

                                    {
                                        setKeyMenuBanHang === 3 && (
                                            <BanHang_TaoMoiSanPhamComponent dataUser={dataUser}></BanHang_TaoMoiSanPhamComponent>
                                        )
                                    }

                                    {/* <BanHang_TaoMoiSanPhamComponent dataUser={dataUser}></BanHang_TaoMoiSanPhamComponent> */}

                                </div>

                            </div>
                        </div>
                    </Fragment>
                )
            }

        </div>
    )
}
