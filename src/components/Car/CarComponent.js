import React, { useState, useEffect } from 'react';
import AddCar from './AddCar.js';
import CarService from '../../services/CarsService.js';
import { EditCar } from './EditCar.js';
import addIcon from '../../assets/images/add.svg';
import OfficeService from '../../services/OfficeService.js';


export default function CarComponent() {

    const carService = new CarService();
    const [data, setData] = useState(null);

    const officeService = new OfficeService();
    const [offices, setOffices] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const carsData = await carService.getAllCars();
                setData(carsData);
                console.log(carsData);

                const officeData = await officeService.getAllOffices();
                setOffices(officeData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteCar = async (carId) => {
        try {
            await carService.deleteCar(carId);
            console.log("Car deleted successfully");
            const updatedCars = await carService.getAllCars();
            setData(updatedCars);
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div id='container'>
            <AddCar data={data} setData={setData} offices={offices} />
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>License Plate</th>
                            <th>Daily Rate</th>
                            <th>Office</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(car => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.licensePlate}</td>
                                <td>{car.dailyRate}€</td>
                                <td>{car.office?.name}</td>
                                <td style={{ width: "60px" }}>
                                    <button className="delete-btn" onClick={() => deleteCar(car.id)}>
                                        <img src={addIcon} alt='add icon' />
                                    </button>
                                </td>
                                <td style={{ width: "60px" }}>
                                    <EditCar data={data} setData={setData} car={car} offices={offices} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
