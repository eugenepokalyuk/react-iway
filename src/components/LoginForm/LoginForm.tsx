/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { login } from '../../store/authSlice';
import './LoginForm.scss';

const { Title } = Typography;

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const { loading, error }: any = useSelector((state: RootState) => state.auth);
    const [loginData, setLoginData] = useState({ login: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = () => {
        dispatch(login(loginData));
    };

    return (
        <Row justify="center" align="middle" className="w-full login-row">
            <Col>
                <Card className="login-card">
                    <Title level={2} className="login-title">Авторизация</Title>
                    <Form className='form-container' layout="vertical">
                        <Form.Item label="Имя пользователя">
                            <Input
                                name="login"
                                value={loginData.login}
                                onChange={handleChange}
                                placeholder='Введите имя пользователя'
                            />
                        </Form.Item>
                        <Form.Item label="Пароль">
                            <Input
                                name="password"
                                type="password"
                                value={loginData.password}
                                onChange={handleChange}
                                placeholder='Введите пароль'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleSubmit} loading={loading} block>Войти</Button>
                        </Form.Item>
                    </Form>
                    {error && (
                        <div className="error">Пользователь не найден</div>
                    )}
                </Card>
            </Col>
        </Row>
    );
};

export default LoginForm;