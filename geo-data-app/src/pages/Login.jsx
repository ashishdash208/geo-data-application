import { useNavigate } from 'react-router-dom';
import EntryForm from '../components/EntryForm';
import { login } from '../services/api';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password);
            // Store token or user info if necessary
            const responseData = response.data;
            localStorage.setItem('token', responseData.token)
            navigate('/'); // Redirect to Home page
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return <EntryForm stage="Log In" onSubmit={handleLogin} />;
};

export default Login;
