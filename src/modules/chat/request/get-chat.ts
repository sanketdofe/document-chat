import { getRequest } from '../../../shared/infra/rest';
import {
  CheckIfChatIsReadyResponse,
  GetChatRequest,
  GetChatResponse,
} from '../../../shared/types/chat.type';
import { DOCUMENT_CHAT_CRUD_BASE_URL } from '../../../shared/config/app/request';

type GetChat = GetChatRequest & {
  authToken: string;
};

export const getChat = async ({
  authToken,
  chatId,
}: GetChat): Promise<GetChatResponse> => {
  return await getRequest<GetChatResponse>(
    `${DOCUMENT_CHAT_CRUD_BASE_URL}${chatId}`,
    authToken
  );
};

export const checkIsChatReady = async (chatId: string, authToken: string) => {
  return await getRequest<CheckIfChatIsReadyResponse>(
    `${DOCUMENT_CHAT_CRUD_BASE_URL}${chatId}/is-ready`,
    authToken
  );
};
