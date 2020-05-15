import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ItemComponent(props) {
    const product = props.data;

    function format_curency(a) {
        a = a.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        return a;
    }
    return (
        <div className="col-sm-3 item" style={{ backgroundColor: "white", height: 300, marginTop: 20 }}>
            <Link to="#" className="a_item">
                <div className="row">
                    <Image style={{ width: '100%', height: 180 }} src="/hinhmau.jpg" />
                </div>
                <div className="row wrapper-item">
                    <span><strong>Vans vault</strong></span>
                </div>
                <div className="row wrapper-item">
                    <h5><strong>200.000 VNĐ</strong></h5>&nbsp;<span className="percent">-50%</span>
                </div>
                <div className="row wrapper-item">
                    <strike><span className="original"> VNĐ</span></strike>
                </div>
            </Link>
        </div>
    )
}
