import { useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EntryForm = ({stage, onSubmit, message}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit( username, password );
    };

    const switchUrl = (stage === 'Register') ? '/login' : '/register';
    const switchText = (stage === 'Register') ? 'Already a User? Log In' : 'New User? Register Now';

    return (
        <div className='entry-form-outer'>
            <div className='entry-form-container container'>
                <h2 className='mb-3'>{stage} to Geo Data App</h2>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">User Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="A unique username"
                    value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="mb-3">
            <label htmlFor="inputPassword5" className="form-label">Password</label>
            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" 
                value={password} onChange={(event) => setPassword(event.target.value)} />
                <div id="passwordHelpBlock" className="form-text">
                    {stage === 'Register' ? "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters." : ""}
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <Link to={switchUrl}>{switchText}</Link>
                    </div>
                    <button className='custom-button' type='submit' onClick={handleSubmit}>Submit</button>
                </div>
        </div>
        <div className='text-center mx-auto my-2' style={{ maxWidth: '532px' }}>{message}</div>
    </div>
    )
}

export default EntryForm

EntryForm.propTypes = {
    stage: PropTypes.oneOf(['Log In', 'Register']),
    onSubmit: PropTypes.func.isRequired,
    message: PropTypes.string
}