import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import CarService from '../../services/CarsService';
import OfficeService from '../../services/OfficeService';

function AddCar({ data, setData, offices }) {

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        licensePlate: '',
        dailyRate: '',
        officeId: 0
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
            const response = await carService.addCar(formData);
            if (response.ok) {
                const updatedCars = await carService.getAllCars();
                setData(updatedCars);
                setFormData({ brand: '', model: '', licensePlate: '', dailyRate: '', officeId: 0 });
                handleClose();
            } else {
                throw new Error('Failed to add car');
            }

            //console.log(data); 
            //con setData([formData, ...data]); hay error

        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    return (
        <>
            <div className='button-container'>
                <button type="button" className="main-add-btn" onClick={handleShow}>
                    <span className="btn_text">Add Car</span>
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
                    <Modal.Title>Add Car</Modal.Title>
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
                        Add Car
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCar;

/*const responseBody = await response.text();
const updatedCar = responseBody ? JSON.parse(responseBody) : {};
const updatedData = data.map(item => (item.id === updatedCar.id ? updatedCar : item));*/