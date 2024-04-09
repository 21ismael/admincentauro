import React, {useState, useEffect} from 'react';
import ReservationService from '../../services/ReservatioService'; 
import addIcon from '../../assets/images/add.svg';
import formatDate from '../../utils/functions';
import AddReservation from './AddReservation';
import OfficeService from '../../services/OfficeService';

export default function ReservationComponent() {

    const reservationService = new ReservationService(); 
    const [data, setData] = useState(null);

    const officeService = new OfficeService();
    const [offices, setOffices] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const reservationsData = await reservationService.getAllReservations();
                setData(reservationsData);
                console.log(reservationsData);

                const officeData = await officeService.getAllOffices();
                setOffices(officeData);
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
            console.error('Error deleting office:', error);
        }
    }

    return <>
        <div id='container'>
            <AddReservation data={data} setData={setData} offices={offices}/>
            <table id="officeTable">
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
                            <td>{`${reservation.car.brand}  ${reservation.car.model}`}</td>
                            <td>{`${reservation.user.name}  ${reservation.user.lastName}`}</td>
                            <td>{reservation.office.name}</td>
                            <td>{formatDate(reservation.startDate)}</td>
                            <td>{formatDate(reservation.endDate)}</td>
                            <td style={{ width: "60px" }}>
                                <button className="delete-btn" onClick={() => deleteReservation(reservation.reservationId)}>
                                    <img src={addIcon} alt='add icon' />
                                </button>
                            </td>
                            <td style={{ width: "60px" }}>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>


}
