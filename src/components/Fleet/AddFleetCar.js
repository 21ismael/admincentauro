import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FleetService from '../../services/FleetService';

export default function AddFleetCar({ data, setData }) {

    const [show, setShow] = useState(false);
    //const [imagenBase64, setImagenBase64] = useState('');

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        image: null,
        dailyRate: 0
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
            const response = await fleetService.addFleet(formData);
            if (response.ok) {
                const updatedFleet = await fleetService.getFleet();
                setData(updatedFleet);
                setFormData({ brand: '', model: '', img: '', dailyRate: 0 });
                handleClose();
                console.log(formData.image);
            } else {
                throw new Error('Failed to add fleet car');
            }
        } catch (error) {
            console.error('Error adding fleet car:', error);
        }
    };

    return <> 
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
                <Modal.Title>Add Fleet Car</Modal.Title>
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
                    Add Fleet Car
                </button>
            </Modal.Footer>
        </Modal>
    </>
}
