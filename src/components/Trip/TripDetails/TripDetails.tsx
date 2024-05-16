/* eslint-disable @typescript-eslint/no-explicit-any */
import { Descriptions, Modal } from 'antd';
import React from 'react';
import './TripDetails.scss';

interface TripDetailsProps {
    trip: any | null;
    open: boolean;
    onClose: () => void;
}

interface Passenger {
    name: string;
    email: string;
    phone: string;
    company: string | null;
    client_id: number;
    company_id: number | null;
}

const TripDetails: React.FC<TripDetailsProps> = ({ trip, open, onClose }) => {
    if (!trip) return null;

    return (
        <Modal open={open} onCancel={onClose} footer={null} title="Подробности поездки">
            <div className='modal-body'>
                <div>
                    <h3>Системные данные</h3>
                    <Descriptions size="small" bordered className='table-overflow' layout="vertical">
                        <Descriptions.Item label="Номер заказа">{trip.order_id ? trip.order_id : "Нет данных"}</Descriptions.Item>
                        <Descriptions.Item label="Номер пользователя">{trip.user_id ? trip.user_id : "Нет данных"}</Descriptions.Item>
                        <Descriptions.Item label="Номер транзакция">{trip.transaction ? trip.transaction : "Нет данных"}</Descriptions.Item>
                    </Descriptions>
                </div>

                <h3>Даты</h3>
                <Descriptions size="small" bordered className='table-overflow' layout="vertical">
                    <Descriptions.Item label="Дата оформления">{trip.date ? trip.date : "Нет данных"}</Descriptions.Item>
                    <Descriptions.Item label="Дата прибытия">{trip.date_arrival ? trip.date_arrival : "Нет данных"}</Descriptions.Item>
                    <Descriptions.Item label="Дата выезда">{trip.date_departure ? trip.date_departure : "Нет данных"}</Descriptions.Item>
                </Descriptions>

                {trip.location_address && (
                    <>
                        <h3>Адреса</h3>
                        <Descriptions size="small" bordered className='table-overflow' layout="vertical">
                            <Descriptions.Item label="Местонахождения">
                                {trip.location_address ? (
                                    <a href={`https://yandex.ru/maps/?text=${trip.location_address}`} target='_blank'>{trip.location_address}</a>
                                ) : "Нет данных"}
                            </Descriptions.Item>

                            <Descriptions.Item label="Назначения">
                                {trip.destination_address ? (
                                    <a href={`https://yandex.ru/maps/?text=${trip.destination_address}`} target='_blank'>{trip.destination_address}</a>
                                ) : "Нет данных"}
                            </Descriptions.Item>
                        </Descriptions>
                    </>
                )}

                {trip.driver_data && (
                    <>
                        <h3>Водитель <span className='driver-name'>{trip.driver_data.driver_name}</span></h3>
                        <Descriptions size="small" bordered className='table-overflow' layout="vertical">
                            <Descriptions.Item label="Номер(-а)">{trip.driver_data.driver_phone ? trip.driver_data.driver_phone : "Нет данных"}</Descriptions.Item>
                            <Descriptions.Item label="Модель авто">{trip.driver_data.driver_car ? trip.driver_data.driver_car : "Нет данных"}</Descriptions.Item>
                            <Descriptions.Item label="Рейтинг">{trip.driver_data.driver_rating ? trip.driver_data.driver_rating : "Нет данных"}</Descriptions.Item>
                        </Descriptions>
                    </>
                )}

                {trip.car_data && (
                    <>
                        <h3>Автомобиль</h3>
                        <Descriptions size="small" bordered className='table-overflow' layout="horizontal">
                            <Descriptions.Item label="Класс">{trip.car_data.car_class ? trip.car_data.car_class : "Нет данных"}</Descriptions.Item>
                            <Descriptions.Item label="Модель">{trip.car_data.models ? trip.car_data.models : "Нет данных"}</Descriptions.Item>
                        </Descriptions>
                    </>
                )}

                <h3>Пассажиры</h3>
                {trip.passengers && trip.passengers.map((passenger: Passenger, index: number) => (
                    <Descriptions key={index} size="small" bordered className='table-overflow' layout="vertical">
                        <Descriptions.Item label="Имя">{passenger.name ? passenger.name : "Нет данных"}</Descriptions.Item>
                        <Descriptions.Item label="Email">{passenger.email ? passenger.email : "Нет данных"}</Descriptions.Item>
                        <Descriptions.Item label="Телефон">{passenger.phone ? passenger.phone : "Нет данных"}</Descriptions.Item>
                    </Descriptions>
                ))}


                {trip.price && (
                    <Descriptions size="small" bordered className='table-overflow mt-4' layout="horizontal">
                        <Descriptions.Item label="Стоимость">{trip.price.price ? `${trip.price.price} ₽` : "Нет данных"}</Descriptions.Item>
                    </Descriptions>
                )}
            </div>
        </Modal>
    );
};

export default TripDetails;