import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CarService } from '../../services/CarsService';
import OfficeService from '../../services/OfficeService';

function AddCar({ data, setData }) {

    const officeService = new OfficeService();
    const [offices, setOffices] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const officeData = await officeService.getAllOffices();
                setOffices(officeData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        licensePlate: '',
        office: ''
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

            let obj = {
                "brand": "string",
                "model": "string",
                "licensePlate": "string",
                "officeId": 0,
                "office": {
                  "id": 0,
                  "name": "string",
                  "country": "string"
                }
              }

            const response = await carService.addCar(obj);
            if (response.ok) {
                //const responseBody = await response.text();
                //const updatedCar = responseBody ? JSON.parse(responseBody) : {};
                //const updatedData = data.map(item => (item.id === updatedCar.id ? updatedCar : item));
                const updatedCars = await carService.getAllCars();
                setData(updatedCars);
                setFormData({ brand: '', model: '', licensePlate: '', office: '' });
                handleClose();
                console.log(obj);
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
            <button className="add-btn" onClick={handleShow}>
                + Add Car
            </button>

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
                        <select className='form-control'
                            name="office"
                            value={formData.office}
                            onChange={handleChange}
                        >
                            <option>Seleccione una oficina</option>
                            {offices && offices.map((office) => (
                                <option key={office.id} value={office.id}>
                                    {office.name}
                                </option>
                            ))}
                        </select>
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
