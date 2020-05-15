import React from 'react'
import { FaStar } from 'react-icons/fa';

export default function DanhGiaSideBarComponent() {
    return (
        <div className="danhgia-sidebar">
            <h5>ĐÁNH GIÁ</h5>
            <div className="danhgia-5sao-sidebar">
                {[...Array(5)].map(() => {
                    return <FaStar color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                })}
                <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 5 sao)</span>
            </div>
            <div className="danhgia-4sao-sidebar">
                {[...Array(4)].map(() => {
                    return <FaStar color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                })}
                <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 4 sao)</span>
            </div>
            <div className="danhgia-3sao-sidebar">
                {[...Array(3)].map(() => {
                    return <FaStar color={"#ffc107"} style={{ marginLeft: 2 }} size={15}></FaStar>
                })}
                <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                <FaStar style={{ marginLeft: 2 }} size={15}></FaStar>
                <span style={{ color: "gray", fontSize: 14, marginLeft: 5 }}>(từ 3 sao)</span>
            </div>
        </div>
    )
}
