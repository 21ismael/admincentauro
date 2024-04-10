class CarService {
    SERVER = "http://localhost:5155/api";

    async getAllCars() {
        const response = await fetch(`${this.SERVER}/car`);

        if (!response.ok) {
            throw new Error('Failed to get all the cars');
        }
        return response.json();
    }

    async getCarByLicensePlate(licensePlate) {
        const response = await fetch(`${this.SERVER}/car/LicensePlate/${licensePlate}`);
        if (!response.ok) {
            throw new Error(`Failed to get car with plate number ${licensePlate}`);
        }
        return response.json();
    }

    async addCar(formData) {
        try {
            const response = await fetch(`${this.SERVER}/car`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add car');
            }

            console.log("Car added successfully");
            return response;
        } catch (error) {
            console.error('Error adding car:', error);
            throw error;
        }
    }

    async putCar(carId, formData) {
        try {
            const response = await fetch(`${this.SERVER}/car/${carId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update car');
            }
    
            return response;
        } catch (error) {
            console.error('Error updating car:', error);
            throw error;
        }
    }    

    async deleteCar(carId) {
        const response = await fetch(`${this.SERVER}/car/${carId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete car');
        } else {
            console.log("Car deleted successfully");
        }
    }

    async getOfficeNames() {
        const response = await fetch(`${this.SERVER}/office/office-names`); 
        if (!response.ok) {
            throw new Error('Failed to get the office names');
        }
        return response.json();
    }
}

export default CarService; 