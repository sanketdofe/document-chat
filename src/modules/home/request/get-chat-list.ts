import { ChatList, ChatListResponse } from '../../../shared/types/chat.type';
import { getRequest } from '../../../shared/infra/rest';

const getChatList = async (authToken: string): Promise<ChatList> => {
  const chatListResponse = await getRequest<ChatListResponse>(
    'http://localhost:3002/',
    authToken
  );

  return chatListResponse.chats;
};

export default getChatList;
