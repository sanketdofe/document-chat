import { postRequest } from '../../../shared/infra/rest';
import {
  NewChatRequest,
  NewChatResponse,
} from '../../../shared/types/chat.type';
import { DOCUMENT_CHAT_CRUD_BASE_URL } from '../../../shared/config/app/request';

type CreateNewChat = NewChatRequest & {
  authToken: string;
};

const createNewChat = async ({
  authToken,
  ...body
}: CreateNewChat): Promise<NewChatResponse> => {
  return await postRequest<NewChatResponse>({
    url: DOCUMENT_CHAT_CRUD_BASE_URL,
    authToken: authToken,
    options: {
      body: JSON.stringify(body),
    },
  });
};

export default createNewChat;
