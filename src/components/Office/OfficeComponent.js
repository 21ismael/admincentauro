import React, { useState, useEffect } from 'react';
import OfficeService from '../../services/OfficeService';
import deleteIcon from '../../assets/images/delete.svg';
import AddOffice from './AddOffice';
import { EditOffice } from './EditOffice';

export default function OfficeComponent() {

    const officeService = new OfficeService();

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carsData = await officeService.getAllOffices();
                setData(carsData);
                console.log(carsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteOffice = async (officeId) => {
        try {
            await officeService.deleteOffice(officeId);
            console.log("Office deleted successfully");
            const updatedOffices = await officeService.getAllOffices();
            setData(updatedOffices);
        } catch (error) {
            console.error('Error deleting office:', error);
        }
    }

    return <>
        <div id='container'>
            <AddOffice data={data} setData={setData} />
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(office => (
                            <tr key={office.id}>
                                <td>{office.id}</td>
                                <td>{office.name}</td>
                                <td>{office.country}</td>
                                <td style={{ width: "60px" }}>
                                    <button className="delete-btn" onClick={() => deleteOffice(office.id)}>
                                        <img src={deleteIcon} alt='delete icon' />
                                    </button>
                                </td>
                                <td style={{ width: "60px" }}>
                                    <EditOffice office={office} data={data} setData={setData} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
