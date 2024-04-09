import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ReservationService from '../../services/ReservatioService';
import CarsService from '../../services/CarsService';


export default function AddReservation({ data, setData, offices }) {

    const carService = new CarsService();
    const [postData, setPostData] = useState({
        carId: 0,
        userId: 0,
        officeId: 0,
        startDate: '',
        endDate: ''
    });

    const [formData, setFormData] = useState({
        carLicensePlate: '',
        userIdentityNumber: '',
        officeId: ''
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
        const fetchData = async () => {
            try {
                const carData = await carService.getCarByLicensePlate(formData.carLicensePlate);
                setPostData(carData);
                console.log(carData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }

    return <>
        <button className="add-btn" onClick={handleShow}>
            + Add Reservation
        </button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Office</Modal.Title>
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

                    <label>
                        Choose an office:
                        <select className='form-select'
                            name="officeId"
                            value={formData.officeId}
                            onChange={handleChange}
                        >
                            <option value={0}>-- Office --</option>
                            {offices && offices.map((office) => (
                                <option key={office.id} value={office.id}>
                                    {office.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='close-btn' onClick={handleClose}>
                    Close
                </button>
                <button className='add-btn' onClick={handleSubmit}>
                    Add Office
                </button>
            </Modal.Footer>
        </Modal>
    </>
}