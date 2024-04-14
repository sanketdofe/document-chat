import useQuery from '../../../shared/hooks/use-query';
import { ChatList } from '../../../shared/types/chat.type';
import { ChatListAtom } from '../../../shared/states/chat-list';
import getChatList from '../request/get-chat-list';
import { Container, Divider, Paper, Typography } from '@mui/material';
import Loader from '../../../shared/components/loaders/loader';

function Home() {
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
          marginTop: '30px',
        }}
      >
        Chats
      </Typography>
      <Divider style={{ width: '90%', borderBottomWidth: 2, margin: '20px' }} />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Paper
            elevation={3}
            className={'mb-5 p-5'}
            style={{
              backgroundColor: '#2196F3FF',
              color: 'white',
            }}
          >
            <Typography variant="h5" className="text-center">
              New Chat
            </Typography>
          </Paper>
          {data?.map((chat, index) => (
            <Paper elevation={2} className={'mb-5 p-5'} key={`chat::${index}`}>
              <Typography variant="h5" className="text-center">
                {chat}
              </Typography>
            </Paper>
          ))}
        </Container>
      )}
    </div>
  );
}

export default Home;
