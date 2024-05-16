/* eslint-disable @typescript-eslint/no-explicit-any */
import LogoutOutlined from '@ant-design/icons/lib/icons/LogoutOutlined';
import { Button, Card, Col, Descriptions, Flex, Input, Pagination, Row, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { RootState } from '../../../store';
import { logout } from '../../../store/authSlice';
import { fetchTrips } from '../../../store/tripsSlice';
import TripDetails from '../TripDetails/TripDetails';
import './TripsList.scss';

const { Title } = Typography;

const TripsList: React.FC = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state: RootState) => state.auth);
    const { trips, loading, error } = useSelector((state: RootState) => state.trips);
    const [filter, setFilter] = useState('');
    const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
    const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 25;

    const isMobile = useMediaQuery({ query: '(max-width: 425px)' });

    useEffect(() => {
        if (token) {
            dispatch(fetchTrips(token));
        }
    }, [token, dispatch]);

    // Статусы заказа заменил на текстовый формат
    const statusFormatter = (status: number) => {
        let statusText = "";
        switch (status) {
            case 0:
                statusText = "Создан";
                break;
            case 1:
                statusText = "В обработке";
                break;
            case 2:
                statusText = "Выполняется";
                break;
            case 3:
                statusText = "Отменен";
                break;
            case 4:
                statusText = "Завершен";
                break;
            default:
                break;
        }
        return statusText;
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredTrips = trips.filter((trip: any) => {
        const passengerNameMatches = trip.passengers.some((passenger: any) =>
            passenger.name.toLowerCase().includes(filter.toLowerCase())
        );
        const passengerPhoneMatches = trip.passengers.some((passenger: any) =>
            passenger.phone.includes(filter)
        );
        const statusMatches = statusFormatter(trip.status).toLowerCase().includes(filter.toLowerCase());
        return passengerNameMatches || passengerPhoneMatches || statusMatches;
    });

    const paginatedTrips = filteredTrips.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const columns = [
        { title: 'Заказ', dataIndex: 'order_id', key: 'order_id' },
        { title: 'Статус', dataIndex: 'status', key: 'status', render: (status: number) => statusFormatter(status) },
        { title: 'Имя пассажира', dataIndex: ['passengers', 0, 'name'], key: 'passenger_name' },
        { title: 'Номер пассажира', dataIndex: ['passengers', 0, 'phone'], key: 'passenger_phone' },
        {
            title: '',
            key: 'action',
            render: (record: any) => (
                <Button
                    type='link'
                    className='actionButton'
                    onClick={() => {
                        setSelectedTrip(record);
                        setDetailsVisible(true);
                    }}>О заказе</Button>
            ),
        },
    ];

    return (
        <div className='xl-container trips-row'>
            <Row justify="center">
                <Col span={24}>
                    <Card className="trips-card">
                        <Flex className='card-header' justify="space-between" align="center">
                            <Title level={2} className="trips-title">Список поездок</Title>
                            <Button type="link" onClick={handleLogout} className='logout-button'>
                                <LogoutOutlined /> Выйти из аккаунта
                            </Button>
                        </Flex>
                        <Input
                            placeholder="🔍 Фильтр по имени или номеру пассажира, статусу"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="trips-filter"
                        />
                        {loading ? (
                            <Spin size="large" className="loading-spinner" />
                        ) : filteredTrips.length === 0 ? (
                            <div className="no-data">
                                <Typography.Text>Ничего не найдено</Typography.Text>
                            </div>
                        ) : isMobile ? (
                            <>
                                <div className="mobile-cards">
                                    {paginatedTrips.map((trip: any) => (
                                        <Card key={trip.order_id} className="trip-card">
                                            <div className='card'>
                                                <h3 className='card-title'>Поездка #{trip.order_id}</h3>
                                            </div>

                                            <Descriptions size="small" bordered className='table-overflow' layout="horizontal">
                                                <Descriptions.Item label="Имя пассажира">{trip.passengers[0]?.name ? trip.passengers[0]?.name : "Нет данных"}</Descriptions.Item>
                                                <Descriptions.Item label="Номер пассажира">{trip.passengers[0]?.phone ? trip.passengers[0]?.phone : "Нет данных"}</Descriptions.Item>
                                                <Descriptions.Item label="Статус">{trip.status ? statusFormatter(trip.status) : "Нет данных"}</Descriptions.Item>
                                            </Descriptions>

                                            <Button
                                                className='detailButton'
                                                onClick={() => {
                                                    setSelectedTrip(trip);
                                                    setDetailsVisible(true);
                                                }}>О заказе</Button>
                                        </Card>
                                    ))}
                                </div>
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={filteredTrips.length}
                                    onChange={handlePageChange}
                                    className='pagination'
                                />
                            </>
                        ) : (
                            <>
                                <Table
                                    columns={columns}
                                    dataSource={paginatedTrips}
                                    loading={loading}
                                    rowKey="order_id"
                                    pagination={false}
                                    scroll={{ x: '100%' }}
                                />
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={filteredTrips.length}
                                    onChange={handlePageChange}
                                    className='pagination'
                                />
                            </>
                        )}
                        {error && <div className="error">Ошибка сети</div>}
                        <TripDetails
                            trip={selectedTrip}
                            open={detailsVisible}
                            onClose={() => setDetailsVisible(false)}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TripsList;