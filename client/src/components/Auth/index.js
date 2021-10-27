import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../images/e-voting-logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Auth({title, onClick}) {
    return(
        <div style={{height: '100vh', width: '100vw', overflow: 'hidden', background: '#E9ECEF'}}>
            <div className="login-form" style={{padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={logo} alt="logo" width="150" style={{marginBottom: '40px'}}/>
                <h1 className="display-6" style={{marginBottom: '30px'}}>{title}</h1>
                <Form onSubmit={(e) => onClick(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Aadhar Number" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <p style={{fontSize: '15px'}}>{title === 'Login' ? `New User?` : 'Existing User?'} <Link to={title === 'Login' ? '/register' : '/'} style={{textDecoration: 'none', color: 'teal'}}>{title === 'Login' ? `Register` : 'Login'}</Link></p>
                    <button type="submit" style={{borderRadius: '8px', width: '100%', border: 'none', padding: '6px', background: 'teal', color: 'white'}}>Submit</button>
                </Form>
            </div>
        </div>
    )
}