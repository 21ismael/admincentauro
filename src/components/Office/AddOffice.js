import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import OfficeService from '../../services/OfficeService';

export default function AddOffice({ data, setData }) {

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        country: ''
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
        try {
            const officeService = new OfficeService();
            const response = await officeService.addOffice(formData);
            if (response.ok) {
                const updatedOffices = await officeService.getAllOffices();
                setData(updatedOffices);
                setFormData({ name: '', country: '' });
                handleClose();
            } else {
                throw new Error('Failed to add office');
            }
        } catch (error) {
            console.error('Error adding office:', error);
        }
    };

    return (
        <>
            <button className="add-btn" onClick={handleShow}>
                + Add Office
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
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Country:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="country"
                                value={formData.country}
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
                        Add Office
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}