import React, { useEffect, useState, Fragment } from 'react'
import { axios } from '../../config/constant';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

export default function BaiViet(props) {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const [dataBaiViet, setDataBaiViet] = useState({
        tieuDe: "",
        img: "",
        ngayTao: new Date(),
        content: '',
        positionShow: {
            center: false,
            right: false,
            bottom: false
        },
        luotXem: 0,
        isCarousel: false,
        isLock: false,
        isDelete: false
    });

    async function LayDataBaiVietTheoID() {
        let res = await axios.get('hethong/baiviet-item?id=' + id);

        if (res.data.status === 'success') {
            setDataBaiViet({
                tieuDe: res.data.data.tieuDe,
                img: res.data.data.img,
                ngayTao: res.data.data.ngayTao,
                content: res.data.data.content,
                luotXem: 0,
                isLock: false,
                isDelete: false
            });
        } else {
            message.error('Lấy data bài viết thất bại !');
        }

    }

    useEffect(() => {
        LayDataBaiVietTheoID();
    }, [id])

    useEffect(() => {
        // dispatch({ type: 'SHOW_HEADER' });
    }, [])

    return (
        <Fragment>
            <div className='container'>
                <div dangerouslySetInnerHTML={{ __html: dataBaiViet.content }}>
                </div>
            </div>
        </Fragment>

    )
}
