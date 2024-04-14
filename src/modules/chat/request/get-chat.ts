import { getRequest } from '../../../shared/infra/rest';
import {
  GetChatRequest,
  GetChatResponse,
} from '../../../shared/types/chat.type';

type GetChat = GetChatRequest & {
  authToken: string;
};

const getChat = async ({
  authToken,
  chatId,
}: GetChat): Promise<GetChatResponse> => {
  return await getRequest<GetChatResponse>(
    `http://localhost:3002/${chatId}`,
    authToken
  );
};

export default getChat;
