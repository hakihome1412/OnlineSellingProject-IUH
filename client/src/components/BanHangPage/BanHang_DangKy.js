import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Dropdown, Tabs, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { storage } from "../../firebase/firebase";
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'react-bootstrap';
import { axios } from '../../config/constant';
import { useCookies } from 'react-cookie';

export default function BanHang_DangKy() {
    const [cookie, setCookie, removeCookies] = useCookies();
    const userID = cookie.userID;
    const [countAnhDaUploadThanhCong_Logo, setCountAnhDaUploadThanhCong_Logo] = useState(0);
    const [firstTime1, setFirstTime1] = useState(true);
    const [imageAsFile_Logo, setImageAsFile_Logo] = useState([]);
    const [imageAsUrl_Logo, setImageAsUrl_Logo] = useState([]);
    const [dataTaoShop, setDataTaoShop] = useState({
        ten: '',
        moTa: '',
        diaChi: '',
        logoShop: '',
        ngayTao: new Date()
    })
    const [dataEmail, setDataEmail] = useState('');

    let history = useHistory();

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 12,
        },
    };

    const dispatch =useDispatch();

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

    async function LayDataUserTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            history.push('/banhang/' + resData.data.data.thongTinShop.idShop + '/trangchu');
        } else {
            alert("Lấy data thất bại");
        }
    }

    async function LayEmailTheoIDUser(userID) {
        let resData = await axios.get('hethong/users-item?idUser=' + userID);
        //alert(JSON.stringify(resData.data));
        //setDataCarousel(resData.data.status);
        if (resData.data.status === 'success') {
            setDataEmail(resData.data.data.email);
        } else {
            alert("Lấy email thất bại");
        }
    }

    async function TaoShop() {
        let resData = await axios.put('hethong/users-taoshop', {
            _id: userID,
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
            LayDataUserTheoIDUser(userID);
            alert('Đăng ký gian hàng thành công');

        } else {
            alert("Đăng ký gian hàng thất bại");
        }
    }

    useEffect(() => {
        LayEmailTheoIDUser(userID);
        dispatch({type:'CLOSE_HEADER'});
    }, [])

    useEffect(() => {
        if (firstTime1 === false) {
            if (imageAsFile_Logo.length === 0) {
                alert('Vui lòng chọn Logo cho shop')
            } else {
                if (countAnhDaUploadThanhCong_Logo === imageAsFile_Logo.length) {
                    alert('Upload logo shop thành công');
                }
            }
        }
    }, [countAnhDaUploadThanhCong_Logo])

    return (
        <Fragment>
            <div className='col'>
                <div className='row' style={{ float: 'right', marginRight: 20 }}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <Button size='large' style={{ marginTop: 15 }}>
                            <img alt="" src='/logoshop.png' width="30" height="30" /> &nbsp; {dataEmail} <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className='container' style={{ marginTop: 50 }}>
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