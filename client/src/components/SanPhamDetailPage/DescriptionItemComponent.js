import React, { Fragment } from 'react';
import { Image } from 'react-bootstrap';

export default function DescriptionItemComponent(props) {
    var dataProduct = props.thongTinProduct;
    return (
        <div className="row" style={{ marginTop: 40 }}>
            <div className="col">
                <h5>MÔ TẢ SẢN PHẨM</h5>
                <div className="col-sm-9 description-item">
                    <div className="wrapper-description-item-content">
                        {dataProduct.moTa.map((item,i)=>{
                            return <Fragment key={i}>
                                {item}<br></br><br></br>
                            </Fragment>
                        })
                        }
                    </div>
                    <div className="wrapper-description-item-img">
                        {
                            dataProduct.img.moTaChiTiet.map((src,i)=>{
                                return <Image key={i} src={src} className="description-item-img"></Image>
                            })
                        }
                        {/* <Image src={dataProduct.img.chinh} className="description-item-img"></Image>
                        <Image src={dataProduct.img.phu[0]} className="description-item-img"></Image>
                        <Image src={dataProduct.img.phu[1]} className="description-item-img"></Image>
                        <Image src={dataProduct.img.phu[2]} className="description-item-img"></Image>
                        <Image src={dataProduct.img.phu[3]} className="description-item-img"></Image> */}
                    </div>

                </div>
            </div>
        </div>
    )
}
