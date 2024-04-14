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
    navigate(ROUTES.HOME, {
      replace: true,
    });
    setAuthToken('');
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-5">
      {showAuthInput ? (
        <>
          <Typography variant={'h3'} className="font-bold text-center">
            Verify your Access
          </Typography>
          <TextField
            className="md:w-1/2 lg:w-1/2 w-2/3"
            label="Enter Access Token"
            required
            value={authToken}
            onChange={handleAuthInputChange}
          />
          <Button
            size={'large'}
            onClick={handleAuthFormSubmit}
            variant={'contained'}
            disabled={authToken.length <= 5}
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <Typography variant={'h3'} className="font-bold text-center">
            Welcome to Document Chat
          </Typography>
          <Typography variant={'h5'} className="text-center">
            Click below to start chatting with Document Chat
          </Typography>
          <Button
            size={'large'}
            onClick={toggleAuthInput}
            variant={'contained'}
          >
            Enter
          </Button>
        </>
      )}
    </div>
  );
}

export default Login;
