export default class ReservationService {
    SERVER = "http://localhost:5155/api";

    async getAllReservations() {
        const response = await fetch(`${this.SERVER}/reservation`);

        if (!response.ok) {
            throw new Error('Failed to get all reservations');
        }
        return response.json();
    }

    async addReservation(formData) {
        try {
            const response = await fetch(`${this.SERVER}/reservation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add reservation');
            }

            console.log("Reservation added successfully");
            return response;
        } catch (error) {
            console.error('Error adding reservation:', error);
            throw error;
        }
    }

    async deleteReservation(reservationId) {
        const response = await fetch(`${this.SERVER}/reservation/${reservationId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete reservation');
        } else {
            console.log("Reservation deleted successfully");
        }
    }
}