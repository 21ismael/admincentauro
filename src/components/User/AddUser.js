import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import UserService from '../../services/UserService';

export default function AddUser({ data, setData }) {

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
            const userService = new UserService();
            const response = await userService.addUser(formData);
            if (response.ok) {
                const updatedUsers = await userService.getAllUsers();
                setData(updatedUsers);
                setFormData({ name: '', lastName: '', identityNumber: '' });
                handleClose();
            } else {
                throw new Error('Failed to add user');
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return <>
        <button className="add-btn" onClick={handleShow}>
            + Add User
        </button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
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
                            name="lastname"
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
                    Add User
                </button>
            </Modal.Footer>
        </Modal>
    </>
}