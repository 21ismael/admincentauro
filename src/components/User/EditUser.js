import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import editIcon from '../../assets/images/edit.svg';
import UserService from '../../services/UserService';

export default function EditUser({ user, data, setData }) {

    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        identityNumber: user.identityNumber
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
            const userService = new UserService();
            const response = await userService.putUser(formData.id, formData);

            if (response.ok) {
                const updatedUsers = await userService.getAllUsers();
                setData(updatedUsers);
                handleClose();
            } else {
                throw new Error('Failed to edit user');
            }
        } catch (error) {
            console.error('Error editing user:', error);
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
                        <label>LastName:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Identity Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="identityNumber"
                            value={formData.identityNumber}
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
                    Edit User
                </button>
            </Modal.Footer>
        </Modal>
    </>
}