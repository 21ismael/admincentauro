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
            console.log(response)
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
        <div className='button-container'>
            <button type="button" className="main-add-btn" onClick={handleShow}>
                <span className="btn_text">Add User</span>
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
                    Add User
                </button>
            </Modal.Footer>
        </Modal>
    </>
}