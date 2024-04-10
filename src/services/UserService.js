export default class UserService {
    SERVER = "http://localhost:5155/api";

    async getAllUsers() {
        const response = await fetch(`${this.SERVER}/user`);

        if (!response.ok) {
            throw new Error('Failed to get all the users');
        }
        return response.json();
    }

    async getUserByIdentityNumber(identityNumber) {
        const response = await fetch(`${this.SERVER}/user/identity/${identityNumber}`);
        if (!response.ok) {
            throw new Error(`Failed to get user with identity number ${identityNumber}`);
        }
        return response.json();
    }

    async addUser(formData) {
        try {
            const response = await fetch(`${this.SERVER}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add user');
            }

            console.log("User added successfully");
            return response;
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async putUser(userId, formData) {
        try {
            const response = await fetch(`${this.SERVER}/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
    
            return response;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }    

    async deleteUser(userId) {
        const response = await fetch(`${this.SERVER}/user/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        } else {
            console.log("User deleted successfully");
        }
    }

}
