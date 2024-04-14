import { createRequestAtom } from '../utils/request-atom';
import { ChatList } from '../types/chat.type';

export const ChatListAtom = createRequestAtom<ChatList>();
