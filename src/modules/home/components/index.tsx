import useQuery from '../../../shared/hooks/use-query';
import { ChatList } from '../../../shared/types/chat.type';
import { ChatListAtom } from '../../../shared/states/chat';
import getChatList from '../request/get-chat-list';
import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import Loader from '../../../shared/components/loaders/loader';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { AuthAtom } from '../../../shared/states/authenticated';
import { useSetAtom } from 'jotai';

function Home() {
  const navigate = useNavigate();
  const setAuthAtom = useSetAtom(AuthAtom);
  const handleOpenChat = (chat: string) => {
    navigate(`/chat/${encodeURIComponent(chat)}`, {
      replace: true,
    });
  };

  const handleLogout = () => {
    setAuthAtom({
      token: '',
      isAuthenticated: false,
    });
    localStorage.clear();
    navigate(ROUTES.LOGIN, {
      replace: true,
    });
  };

  const {
    requestData: { data, loading, fetched },
  } = useQuery<ChatList>({
    requestAtom: ChatListAtom,
    queryFunction: getChatList,
  });

  return (
    <div className="flex flex-col items-center">
      <Typography
        variant="h3"
        style={{
          fontWeight: 'bold',
          marginTop: '30px',
        }}
      >
        Chats
      </Typography>
      <Divider style={{ width: '90%', borderBottomWidth: 2, margin: '20px' }} />
      {loading ? (
        <div className="my-20">
          <Loader />
        </div>
      ) : (
        <Container>
          <Paper
            elevation={3}
            className={'mb-5 p-5'}
            style={{
              backgroundColor: '#2196F3FF',
              color: 'white',
            }}
            onClick={() => handleOpenChat('new')}
          >
            <Typography variant="h5" className="text-center">
              New Chat
            </Typography>
          </Paper>
          {data?.map((chat, index) => (
            <Paper
              elevation={2}
              className={'mb-5 p-5'}
              key={`chat::${index}`}
              onClick={() => handleOpenChat(chat)}
            >
              <Typography variant="h5" className="text-center">
                {chat}
              </Typography>
            </Paper>
          ))}
        </Container>
      )}
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;
