import React, { useEffect } from 'react';
import { Menu } from 'antd';
import { UserOutlined, OrderedListOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useDispatch} from 'react-redux';
import { useHistory, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { Customer_Account, Customer_DonHang, Customer_DonHang_Detail, Customer_ThongTinThanhToan } from '../allJS'

export default function Customer() {
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();

    useEffect(() => {
        dispatch({ type: 'SHOW_HEADER' });
    }, [])

    return (
        <div style={{ marginLeft:325, width: 1300, marginTop: 50, backgroundColor: '#F8F9FA', padding: 10 }}>
            <div className='row'>
                <div className='col-sm-3'>
                    <Menu
                        style={{ width: 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.Item onClick={() => {
                            history.push('/customer/account');
                        }}>
                            <span>
                                <UserOutlined />
                                <span>Tài khoản của tôi</span>
                            </span>
                        </Menu.Item>

                        <Menu.Item onClick={() => {
                            history.push('/customer/order');
                        }}>
                            <span>
                                <OrderedListOutlined />
                                <span>Đơn hàng của tôi</span>
                            </span>
                        </Menu.Item>

                        <Menu.Item onClick={() => {
                            history.push('/customer/payment');
                        }}>
                            <span>
                                <CreditCardOutlined />
                                <span>Thông tin thanh toán</span>
                            </span>
                        </Menu.Item>


                    </Menu>
                </div>
                <div className='col-sm-9'>
                    <Switch>
                        <Redirect exact from={match.url} to={`${match.url}/account`} />
                        <Route exact path={`${match.url}/account`} component={Customer_Account}></Route>
                        <Route exact path={`${match.url}/order`} component={Customer_DonHang}></Route>
                        <Route exact path={`${match.url}/payment`} component={Customer_ThongTinThanhToan}></Route>
                        <Route exact path={`${match.url}/order/details/:id`} component={Customer_DonHang_Detail}></Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}
