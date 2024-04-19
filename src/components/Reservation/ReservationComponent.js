import React, { useState, useEffect } from 'react';
import ReservationService from '../../services/ReservationService';
import deleteIcon from '../../assets/images/delete.svg';
import formatDate from '../../utils/functions';
import AddReservation from './AddReservation';
import EditReservation from './EditReservation';

export default function ReservationComponent() {

    const reservationService = new ReservationService();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reservationsData = await reservationService.getAllReservations();
                setData(reservationsData);
                console.log(reservationsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const deleteReservation = async (reservationId) => {
        try {
            await reservationService.deleteReservation(reservationId);
            console.log("Reservation deleted successfully");
            const updatedReservations = await reservationService.getAllReservations();
            setData(updatedReservations);
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    }

    return <>
        <div id='container'>
            <AddReservation data={data} setData={setData} />
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Car</th>
                            <th>User</th>
                            <th>Office</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(reservation => (
                            <tr key={reservation.reservationId}>
                                <td>{reservation.reservationId}</td>
                                <td>{`${reservation.car.fleet.brand}  ${reservation.car.fleet.model}`}</td>
                                <td>{`${reservation.user.name}  ${reservation.user.lastName}`}</td>
                                <td>{reservation.car.office.name}</td>
                                <td>{formatDate(reservation.pickupDate)}</td>
                                <td>{formatDate(reservation.returnDate)}</td>
                                <td style={{ width: "60px" }}>
                                    <button className="delete-btn" onClick={() => deleteReservation(reservation.reservationId)}>
                                        <img src={deleteIcon} alt='delete icon' />
                                    </button>
                                </td>
                                <td style={{ width: "60px" }}>
                                    <EditReservation reservation={reservation} data={data} setData={setData}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>


}
