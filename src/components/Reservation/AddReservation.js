import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ReservationService from '../../services/ReservationService';
import CarsService from '../../services/CarsService';
import UserService from '../../services/UserService';

export default function AddReservation({ data, setData }) {

    const carService = new CarsService();
    const userService = new UserService();

    const [postData, setPostData] = useState({
        carId: '',
        userId: '',
        pickupDate: '',
        returnDate: ''
    });

    useEffect(() => {
        console.log(postData);
    }, [postData]);

    const [formData, setFormData] = useState({
        carLicensePlate: '',
        userIdentityNumber: '',
        pickupDate: '',
        returnDate: ''
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
        try {
            const userData = await userService.getUserByIdentityNumber(formData.userIdentityNumber);
            const carData = await carService.getCarByLicensePlate(formData.carLicensePlate);

            const postData = {
                carId: carData.id,
                userId: userData.id,
                pickupDate: formData.pickupDate,
                returnDate: formData.returnDate
            };

            console.log("Post Data:", postData);

            const reservationService = new ReservationService();
            const response = await reservationService.addReservation(postData);

            if (response.ok) {
                const updatedReservations = await reservationService.getAllReservations();
                setData(updatedReservations);
                setFormData({
                    carLicensePlate: '',
                    userIdentityNumber: '',
                    pickupDate: '',
                    returnDate: ''
                });
                handleClose();
            } else {
                throw new Error('Failed to add reservation');
            }
            
        } catch (error) {
            console.error('Error adding reservation:', error);
        }
    }

    return <>
        <div className='button-container'>
            <button type="button" className="main-add-btn" onClick={handleShow}>
                <span className="btn_text">Add</span>
                <span className="btn_icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg></span>
            </button>
        </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Car License Plate:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="carLicensePlate"
                            value={formData.carLicensePlate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>User Identity Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="userIdentityNumber"
                            value={formData.userIdentityNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="pickupDate"
                            value={formData.pickupDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>End Date:</label>
                        <input
                            type="date"
                            className="form-control"
                            name="returnDate"
                            value={formData.returnDate}
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
                    Add Reservation
                </button>
            </Modal.Footer>
        </Modal>
    </>
}