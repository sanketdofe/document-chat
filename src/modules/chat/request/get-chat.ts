import { getRequest } from '../../../shared/infra/rest';
import {
  CheckIfChatIsReadyResponse,
  GetChatRequest,
  GetChatResponse,
} from '../../../shared/types/chat.type';

type GetChat = GetChatRequest & {
  authToken: string;
};

export const getChat = async ({
  authToken,
  chatId,
}: GetChat): Promise<GetChatResponse> => {
  return await getRequest<GetChatResponse>(
    `http://localhost:3002/${chatId}`,
    authToken
  );
};

export const checkIsChatReady = async (chatId: string, authToken: string) => {
  return await getRequest<CheckIfChatIsReadyResponse>(
    `http://localhost:3002/${chatId}/is-ready`,
    authToken
  );
};
