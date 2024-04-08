import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import editIcon from '../../assets/images/edit.svg';
import OfficeService from '../../services/OfficeService';

export const EditOffice = ({ office, data, setData }) => {

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        id: office.id,
        name: office.name,
        country: office.country
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
            const officeService = new OfficeService();
            const response = await officeService.putOffice(formData.id, formData);

            if (response.ok) {
                const updatedOffices = await officeService.getAllOffices();
                setData(updatedOffices);
                handleClose();
            } else {
                throw new Error('Failed to edit office');
            }
        } catch (error) {
            console.error('Error editing office:', error);
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
                <Modal.Title>Edit Office</Modal.Title>
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
                    Edit Office
                </button>
            </Modal.Footer>
        </Modal>
    </>
}