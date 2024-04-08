export default class OfficeService {
    SERVER = "http://localhost:5155/api";

    async getAllOffices() {
        const response = await fetch(`${this.SERVER}/office`);

        if (!response.ok) {
            throw new Error('Failed to get all the offices');
        }
        return response.json();
    }

    async addOffice(formData) {
        try {
            const response = await fetch(`${this.SERVER}/office`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add office');
            }

            console.log("Office added successfully");
            return response;
        } catch (error) {
            console.error('Error adding office:', error);
            throw error;
        }
    }

    async putOffice(officeId, formData) {
        try {
            const response = await fetch(`${this.SERVER}/office/${officeId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update office');
            }
    
            return response;
        } catch (error) {
            console.error('Error updating office:', error);
            throw error;
        }
    }    

    async deleteOffice(officeId) {
        const response = await fetch(`${this.SERVER}/office/${officeId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete office');
        } else {
            console.log("Office deleted successfully");
        }
    }
}