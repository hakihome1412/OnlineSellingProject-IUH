import React from 'react'
import {DanhMucSideBarComponent,ThuongHieuSideBarComponent,NhaCungCapSideBarComponent,DanhGiaSideBarComponent} from '../allJS';


export default function SideBarComponent() {
    return (
        <div className="col-sm-3 sidebar">
            <DanhMucSideBarComponent></DanhMucSideBarComponent>
            <hr style={{width:240}}></hr>
            <DanhGiaSideBarComponent></DanhGiaSideBarComponent>
            <hr style={{width:240}}></hr>
            <ThuongHieuSideBarComponent></ThuongHieuSideBarComponent>
            <hr style={{width:240}}></hr>
            <NhaCungCapSideBarComponent></NhaCungCapSideBarComponent>
        </div>
    )
}
