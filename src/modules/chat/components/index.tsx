import useQuery from '../../../shared/hooks/use-query';
import { GetChatResponse } from '../../../shared/types/chat.type';
import { ChatAtom } from '../../../shared/states/chat';
import getChat from '../request/get-chat';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Loader from '../../../shared/components/loaders/loader';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/routes';
import { useAtomValue, useSetAtom } from 'jotai';
import { AlertBarAtom } from '../../../shared/states/alert-bar';
import { openInNewTab } from '../../../shared/utils/common';
import { useCallback, useEffect, useState } from 'react';
import generateResponse from '../request/generate-response';
import { AuthAtom } from '../../../shared/states/authenticated';

const Chat = () => {
  const params = useParams();
  const navigate = useNavigate();
  const setAlertBarAtom = useSetAtom(AlertBarAtom);
  const authAtomValue = useAtomValue(AuthAtom);
  const setChatAtom = useSetAtom(ChatAtom);
  const [isFetchingResponse, setIsFetchingResponse] = useState(false);
  const [currentChatHistory, setCurrentChatHistory] = useState<
    Array<{
      type: 'human' | 'agent';
      text: string;
    }>
  >([]);

  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  const { requestData: chatResponse } = useQuery<GetChatResponse>({
    requestAtom: ChatAtom,
    queryFunction: (authToken) =>
      getChat({ chatId: params.chatId ?? '', authToken }),
  });

  useEffect(() => {
    if (!params.chatId) {
      setChatAtom({
        data: undefined,
        loading: true,
      });
      navigate(ROUTES.HOME, {
        replace: true,
      });
    }
    if (chatResponse.error) {
      setAlertBarAtom({
        open: true,
        severity: 'error',
        message: chatResponse.error.message,
        timeout: 5000,
      });
      navigate(ROUTES.HOME, {
        replace: true,
      });
    }
  }, [
    params.chatId,
    chatResponse.error,
    navigate,
    setAlertBarAtom,
    setChatAtom,
  ]);

  const handleGenerateResponse = useCallback(async () => {
    if (!chatResponse.data?.id) {
      throw new Error('Invalid chatId');
    }
    setIsFetchingResponse(true);
    const response = await generateResponse({
      authToken: authAtomValue.token,
      chatId: chatResponse.data?.id,
      chatHistory: currentChatHistory,
      question: currentQuestion,
    }).catch((e) => {
      return {
        chatHistory: currentChatHistory,
      };
    });
    setCurrentQuestion('');
    setCurrentChatHistory(response.chatHistory);
    setIsFetchingResponse(false);
  }, [
    authAtomValue.token,
    chatResponse.data?.id,
    currentChatHistory,
    currentQuestion,
  ]);

  return (
    <div className="flex flex-col justify-center w-9/12 m-auto">
      {chatResponse.loading ? (
        <div className="flex flex-col min-h-screen justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 h-full">
          <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '2%' }}>
            <Link
              variant={'h5'}
              underline="hover"
              color="inherit"
              href={ROUTES.HOME}
            >
              All Chats
            </Link>
            <Typography
              style={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
              variant="h5"
            >
              {chatResponse.data?.id}
            </Typography>
          </Breadcrumbs>
          <Divider style={{ width: '100%', borderBottomWidth: 2 }} />
          {chatResponse.data?.documents?.map((document) => (
            <Accordion className="w-full" key={document.key}>
              <AccordionSummary
                style={{
                  fontWeight: 'bold',
                }}
                expandIcon={<></>}
              >
                View Documents accessible via this chat
              </AccordionSummary>
              <AccordionDetails>
                <Button
                  variant={'text'}
                  onClick={() => openInNewTab(document.url)}
                >
                  {document.key.replace(`${chatResponse.data?.id}/`, '')}
                </Button>
              </AccordionDetails>
            </Accordion>
          ))}
          <Divider style={{ width: '100%', borderBottomWidth: 2 }} />
          <Grid
            spacing={3}
            container
            style={{
              minHeight: '50vh',
              maxHeight: '50vh',
              overflow: 'auto',
            }}
          >
            {currentChatHistory.map(({ type, text }, index) => (
              <>
                <Grid key={`type:${index}`} xs={1}>
                  <Typography
                    variant="caption"
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {type}
                  </Typography>
                </Grid>
                <Grid key={`text:${index}`} xs={11}>
                  <Typography>{text}</Typography>
                </Grid>
              </>
            ))}
          </Grid>
          <Divider style={{ width: '100%', borderBottomWidth: 2 }} />
          <TextField
            style={{ width: '100%' }}
            label={
              isFetchingResponse
                ? 'Generating Response...'
                : 'Enter any question and hit Enter'
            }
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGenerateResponse();
              }
            }}
            disabled={isFetchingResponse}
          />
          <Typography
            variant="caption"
            style={{
              fontStyle: 'italic',
            }}
          >
            Please note that this chat will be cleared once you close this
            window
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Chat;
