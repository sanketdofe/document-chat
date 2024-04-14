import { createRequestAtom } from '../utils/request-atom';
import { ChatList, GetChatResponse } from '../types/chat.type';

export const ChatListAtom = createRequestAtom<ChatList>();

export const ChatAtom = createRequestAtom<GetChatResponse>();
