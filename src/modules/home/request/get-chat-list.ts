import { ChatList, ChatListResponse } from '../../../shared/types/chat.type';
import { getRequest } from '../../../shared/infra/rest';
import { DOCUMENT_CHAT_CRUD_BASE_URL } from '../../../shared/config/app/request';

const getChatList = async (authToken: string): Promise<ChatList> => {
  const chatListResponse = await getRequest<ChatListResponse>(
    DOCUMENT_CHAT_CRUD_BASE_URL,
    authToken
  );

  return chatListResponse.chats;
};

export default getChatList;
