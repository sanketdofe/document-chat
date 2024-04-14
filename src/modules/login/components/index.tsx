import { useState } from 'react';
import { ROUTES } from '../../../shared/constants/routes';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { Button, TextField, Typography } from '@mui/material';
import { AuthAtom } from '../../../shared/states/authenticated';

function Login() {
  const [showAuthInput, setShowAuthInput] = useState(false);
  const [authToken, setAuthToken] = useState('');
  const setAuthAtom = useSetAtom(AuthAtom);

  const navigate = useNavigate();

  const toggleAuthInput = () => {
    setShowAuthInput(!showAuthInput);
  };

  const handleAuthInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAuthToken(event.target.value);
  };

  const handleAuthFormSubmit = () => {
    setAuthAtom({ isAuthenticated: true, token: authToken });
    navigate(ROUTES.HOME.replace('/*', '/'), {
      replace: true,
    });
  };

  return (
    <div>
      <Typography>Welcome to Document Chat</Typography>
      {showAuthInput ? (
        <div>
          <TextField
            label="Enter Access Token"
            required
            value={authToken}
            onChange={handleAuthInputChange}
          />
          <Button onClick={handleAuthFormSubmit}>Submit</Button>
        </div>
      ) : (
        <div>
          <p>Click below to start chatting with Document Chat</p>
          <button onClick={toggleAuthInput}>Enter</button>
        </div>
      )}
    </div>
  );
}

export default Login;
