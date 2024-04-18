import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import CarService from '../../services/CarsService';
import OfficeService from '../../services/OfficeService';
import FleetService from '../../services/FleetService.js';

function AddCar({ data, setData, offices }) {

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        licensePlate: '',
        officeId: 0
    });

    const fleetService = new FleetService();
    const [fleet, setFleet] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fleetData = await fleetService.getFleet();
                setFleet(fleetData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
            const carService = new CarService();
            const car = {
                licensePlate: formData.licensePlate,
                fleetId: formData.model,
                officeId: formData.officeId
            };
            const response = await carService.addCar(car);
            if (response.ok) {
                const updatedCars = await carService.getAllCars();
                setData(updatedCars);
                setFormData({ brand: '', model: '', licensePlate: '', dailyRate: '', officeId: 0 });
                handleClose();
            } else {
                throw new Error('Failed to add car');
            }
        } catch (error) {
            console.error('Error adding car:', error);
        }
        console.log(formData);
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
                        <label>
                            Choose a brand:
                            <select className='form-select'
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                            >
                                <option value="">-- Brand --</option>
                                {[...new Set(fleet.map(car => car.brand))].map((brand, index) => (
                                    <option key={index} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Choose a model:
                            <select className='form-select'
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                            >
                                <option value="">-- Model --</option>
                                {formData.brand && fleet
                                    .filter(car => car.brand === formData.brand)
                                    .map((car) => (
                                        <option key={car.id} value={car.id}>
                                            {car.model}
                                        </option>
                                    ))}
                            </select>
                        </label>

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
