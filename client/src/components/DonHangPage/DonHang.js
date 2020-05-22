import React, { Fragment } from 'react'

export default function DonHang() {
    return (
        <Fragment>
            <div className='container' style={{marginTop:100}}>
                <h3>Danh sách đơn hàng (3 đơn hàng)</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ngày tạo</th>
                            <th>Tên sản phẩm</th>
                            <th>Thành tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row">132123</td>
                            <td>13/05/2020</td>
                            <td>Điện thoại iphone</td>
                            <td>600.000đ</td>
                            <td>Chờ duyệt</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>

    )
}
