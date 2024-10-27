import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EntryForm from '../components/EntryForm';
import { login } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password);
            const responseData = response.data;
            localStorage.setItem('token', responseData.token); // Store token
            navigate('/'); // Redirect to Home page
        } catch (error) {
            if (error.response) {
                // If the error comes from the backend, set an appropriate message
                switch (error.response.status) {
                    case 404:
                        setMessage('User not found. Please check your username.');
                        break;
                    case 401:
                        setMessage('Invalid credentials. Please try again.');
                        break;
                    default:
                        setMessage('An error occurred. Please try again later.');
                }
            } else {
                console.error('Login failed:', error);
                setMessage('Network error. Please try again.');
            }
        }
    };

    return <EntryForm stage="Log In" onSubmit={handleLogin} message={message} />;
};

export default Login;
