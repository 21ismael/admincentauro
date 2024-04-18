class FleetService {
    SERVER = "http://localhost:5155/api";

    async getFleet() {
        const response = await fetch(`${this.SERVER}/fleet`);

        if (!response.ok) {
            throw new Error('Failed to get fleet');
        }
        return response.json();
    }

    async addFleet(formData) {
        try {
            const response = await fetch(`${this.SERVER}/fleet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add fleet');
            }

            console.log("Fleet added successfully");
            return response;
        } catch (error) {
            console.error('Error adding fleet:', error);
            throw error;
        }
    }

    async putFleet(fleetId, formData) {
        try {
            const response = await fetch(`${this.SERVER}/fleet/${fleetId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update fleet');
            }

            return response;
        } catch (error) {
            console.error('Error updating fleet:', error);
            throw error;
        }
    }

    async deleteFleet(fleetId) {
        const response = await fetch(`${this.SERVER}/fleet/${fleetId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete fleet');
        } else {
            console.log("Fleet deleted successfully");
        }
    }
}

export default FleetService; 