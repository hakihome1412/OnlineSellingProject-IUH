import React, { Fragment } from 'react';
import { Image } from 'react-bootstrap';
import Slider from "react-slick";

export default function HotIndustry(props) {

    var dataCategory = props.dataCategory;
    return (
        <Fragment>
            <div className="row" style={{ marginTop: 20 }}>
                <div className="post-slider">
                    <h1 className="slider-title">Ngành Hàng Hot</h1>

                    <i className="fa fa-chevron-left prev"></i>
                    <i className="fa fa-chevron-right next"></i>

                    <div className="post-wrapper">
                        {dataCategory.map((item, i) => {
                            return <div key={item._id} className="post">
                                <Image alt="" className="slider-image" src={item.img} />
                                <div className="post-info">
                                    <h6>{item.ten}</h6>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
