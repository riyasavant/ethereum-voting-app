import { useEffect, useState } from "react";
import { useHistory } from 'react-router';
import { useSnackbar } from 'react-simple-snackbar'
import axios from 'axios';
import Auth from "../../components/Auth";

export default function Register() {

    const options = {
        position: 'bottom-left'
      };
    
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, closeSnackbar] = useSnackbar(options);
    const history = useHistory();
    
    function doRegister(e) {
      e.preventDefault();

      setErrorMessage('');

      const form = e.target;
      const user = {
        aadhar: form[0].value,
        password: form[1].value
      };

      openSnackbar('Registering you...', 3000);

      axios.post(process.env.REACT_APP_API_BASE_URL + "/auth/register", user, {"Content-type": "application/json"})
      .then(response => {
        openSnackbar('Registered successfully', 3000);
        history.push('/');
      })
      .catch(err => {
        openSnackbar('Error Occured', 3000);
        if(err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        }
      });
    }

    useEffect(() => {
      
      fetch(process.env.REACT_APP_API_BASE_URL + "/auth/verifyAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.isLoggedIn) {
          openSnackbar('Authentication successful')
          history.push('/chat');
        }
      })
      .catch(err => console.log(err));
      
    }, []);

    return(
        <Auth title="Register" onClick={doRegister}/>
    )
}