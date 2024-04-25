import React, { useState, useEffect } from 'react';
import FleetService from '../../services/FleetService';
import AddFleetCar from './AddFleetCar';
import deleteIcon from '../../assets/images/delete.svg';
import EditFleetCar from './EditFleetCar';

export default function Fleet() {

    const fleetService = new FleetService();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const fleetData = await fleetService.getFleet();
                setData(fleetData);
                console.log(fleetData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteFleetCar = async (fleetId) => {
        try {
            await fleetService.deleteFleet(fleetId);
            console.log("Fleet car deleted successfully");
            const updatedFleet = await fleetService.getFleet();
            setData(updatedFleet);
        } catch (error) {
            console.error('Error deleting fleet car:', error);
        }
    };

    return <>
        <div className="fleet-container">
            <AddFleetCar data={data} setData={setData} />
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Image</th>
                            <th>Daily Rate</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(fleet => (
                            <tr key={fleet.id}>
                                <td>{fleet.id}</td>
                                <td>{fleet.brand}</td>
                                <td>{fleet.model}</td>
                                <td><img src={fleet.image} /></td>
                                <td>{fleet.dailyRate}€</td>
                                <td style={{ width: "60px" }}>
                                    <button className="delete-btn" onClick={() => deleteFleetCar(fleet.id)}>
                                        <img src={deleteIcon} alt='delete icon' />
                                    </button>
                                </td>
                                <td style={{ width: "60px" }}>
                                    <EditFleetCar fleet={fleet} data={data} setData={setData} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
