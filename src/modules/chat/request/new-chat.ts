import { postRequest } from '../../../shared/infra/rest';
import {
  NewChatRequest,
  NewChatResponse,
} from '../../../shared/types/chat.type';

type CreateNewChat = NewChatRequest & {
  authToken: string;
};

const createNewChat = async ({
  authToken,
  ...body
}: CreateNewChat): Promise<NewChatResponse> => {
  return await postRequest<NewChatResponse>({
    url: 'http://localhost:3002/',
    authToken: authToken,
    options: {
      body: JSON.stringify(body),
    },
  });
};

export default createNewChat;
