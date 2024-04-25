import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import editIcon from '../../assets/images/edit.svg';
import FleetService from '../../services/FleetService';

export default function EditFleetCar({ fleet, data, setData }) {

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        id: fleet.id,
        brand: fleet.brand,
        model: fleet.model,
        dailyRate: fleet.dailyRate,
        image: fleet.image
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

    const previewFile = (file, imagen) => {
        const reader = new FileReader();

        reader.onload = () => {
            imagen.src = reader.result;
            imagen.className = "text-center img-preview img-fluid";
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            imagen.className = "d-none text-center img-preview img-fluid";
        }
    }

    const onFileSelected = (event) => {
        const file = event.target.files[0];
        if (!file) return; // Exit if no file selected

        // Preview image
        const imagenVista = document.getElementById('imagenVista');
        previewFile(file, imagenVista);

        // Read file as data URL
        const reader = new FileReader();
        reader.onload = (event) => {
            setFormData({
                ...formData,
                image: event.target.result // Use event.target.result instead of event.target.files[0]
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        console.log(formData)
        try {
            const fleetService = new FleetService();
            const response = await fleetService.putFleet(formData.id, formData);

            if (response.ok) {
                const updatedFleet = await fleetService.getFleet();
                setData(updatedFleet);
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
                <Modal.Title>Edit User</Modal.Title>
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

                    <div className="form-file">
                        <label>Image:</label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            accept="image/*"
                            onChange={onFileSelected}
                        />
                    </div>

                    <div className="imagen-preview">
                        <img id="imagenVista" className="d-none text-center img-preview img-fluid" />
                    </div>

                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='close-btn' onClick={handleClose}>
                    Close
                </button>
                <button className='add-btn' onClick={handleSubmit}>
                    Edit User
                </button>
            </Modal.Footer>
        </Modal>
    </>
}
/*<div className="form-file">
                        <label>Image:</label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            accept="image/*"
                            onChange={onFileSelected}
                        />
                    </div>

                    <div className="imagen-preview">
                        <img id="imagenVista" className="d-none text-center img-preview img-fluid" />
                    </div>*/