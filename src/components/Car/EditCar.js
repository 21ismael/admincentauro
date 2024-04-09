import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import editIcon from '../../assets/images/edit.svg';
import CarService from '../../services/CarsService';

export const EditCar = ({ car, data, setData, offices }) => {

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        id: car.id,
        brand: car.brand,
        model: car.model,
        licensePlate: car.licensePlate,
        dailyRate: car.dailyRate,
        officeId: car.officeId
    });

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
            const carService = new CarService();
            const response = await carService.putCar(formData.id, formData);

            if (response.ok) {
                //const responseBody = await response.text();
                //const updatedCar = responseBody ? JSON.parse(responseBody) : {};
                //const updatedData = data.map(item => (item.id === updatedCar.id ? updatedCar : item));
                const updatedCars = await carService.getAllCars();
                setData(updatedCars);
                handleClose();
            } else {
                throw new Error('Failed to edit car');
            }
        } catch (error) {
            console.error('Error editing car:', error);
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
                <Modal.Title>Edit Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>

                    <div className="form-group">
                        <label>Brand:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Model:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>License Plate:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                            <label>Daily Rate:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="dailyRate"
                                value={formData.dailyRate}
                                min={0}
                                onChange={handleChange}
                            />
                        </div>

                    <label>
                        Choose an office:
                        <select className='form-control'
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
                    Edit Car
                </button>
            </Modal.Footer>
        </Modal>
    </>
}
