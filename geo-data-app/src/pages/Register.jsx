import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EntryForm from '../components/EntryForm';
import { register } from '../services/api';

const Signup = () => {
    const navigate = useNavigate();
    const [ message, setMessage ] = useState('');

    const handleRegister = async (username, password) => {

        // Check password strength
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/; // Adjust as necessary
        if (!strongPasswordRegex.test(password)) {
            setMessage("Your password must be 8-20 characters long and contain both letters and numbers.");
            return;
        }
        try {
            const response = await register(username, password);
            const responseData = response.data;
            localStorage.setItem('token', responseData.token)
            navigate('/'); // Redirect to Home page
        } catch (error) {
            if(error.response) {
                switch(error.response.status) {
                    case 409: setMessage(`Username "${username}" already exists. Please enter a different username.`); break;
                    case 500: setMessage('Something went wrong. Please try later'); break;
                    default: setMessage('An error occurred. Please try again later.');
                }
            } else {
                setMessage('Network error. Please try again.');
                console.error('Registration failed:', error);
            }
        }
    };

    return <EntryForm stage="Register" onSubmit={handleRegister} message={message} />;
};

export default Signup;
