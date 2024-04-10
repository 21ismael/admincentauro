import React, { useState, useEffect } from 'react';
import addIcon from '../../assets/images/add.svg';
import UserService from '../../services/UserService';
import AddUser from './AddUser';
import EditUser from './EditUser';

export default function User() {

    const userService = new UserService();

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersData = await userService.getAllUsers();
                setData(usersData);
                console.log(usersData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await userService.deleteUser(userId);
            console.log("User deleted successfully");
            const updatedUsers = await userService.getAllUsers();
            setData(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }


    return <>
        <div id='container'>
            <AddUser data={data} setData={setData} />
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>LastName</th>
                            <th>Identity Number</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.identityNumber}</td>
                                <td style={{ width: "60px" }}>
                                    <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                                        <img src={addIcon} alt='add icon' />
                                    </button>
                                </td>
                                <td style={{ width: "60px" }}>
                                    <EditUser user={user} data={data} setData={setData} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}