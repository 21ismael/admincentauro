import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import editIcon from '../../assets/images/edit.svg';
import ReservationService from '../../services/ReservationService';
import formatDate from '../../utils/functions';
import CarsService from '../../services/CarsService';
import UserService from '../../services/UserService';

export default function EditReservation({ reservation, data, setData }) {

    const carService = new CarsService();
    const userService = new UserService();
    const reservationService = new ReservationService();

    const [putData, setPutData] = useState({
        reservationId: '', 
        carId: '',
        userId: '',
        officeId: '',
        startDate: '',
        endDate: ''
    });

    /*useEffect(() => {
        console.log(putData);
    }, [putData]);*/

    const [formData, setFormData] = useState({
        licensePlate: reservation.car.licensePlate,
        identityNumber: reservation.user.identityNumber,
        startDate: reservation.startDate,
        endDate: reservation.endDate
    });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        console.log(formData)
        try {
            const userData = await userService.getUserByIdentityNumber(formData.identityNumber);
            const carData = await carService.getCarByLicensePlate(formData.licensePlate);

            const putData = {
                reservationId: reservation.reservationId, 
                carId: carData.id,
                userId: userData.id,
                officeId: carData.officeId,
                startDate: formData.startDate,
                endDate: formData.endDate
            };

            console.log("Put Data:", putData);

            const response = await reservationService.putReservation(reservation.reservationId, putData);

            if (response.ok) {
                const updatedReservations = await reservationService.getAllReservations();
                setData(updatedReservations);
                handleClose();
            } else {
                throw new Error('Failed to edit reservation');
            }

        } catch (error) {
            console.error('Error editing reservation:', error);
        }
    };

    return <>
        <button className="edit-btn" onClick={handleShow}>
            <img src={editIcon} alt='edit icon' />
        </button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Car License Plate:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>User Identity Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="identityNumber"
                            value={formData.identityNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={formatDate(formData.startDate)}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={formatDate(formData.endDate)}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='close-btn' onClick={handleClose}>
                    Close
                </button>
                <button className='add-btn' onClick={handleSubmit}>
                    Edit Rservation
                </button>
            </Modal.Footer>
        </Modal>
    </>
}

/*
    "reservationId": 1,
    "carId": 1,
    "userId": 6,
    "officeId": 1,
    "startDate": "2024-04-10T10:00:00",
    "endDate": "2024-04-15T12:00:00"
*/