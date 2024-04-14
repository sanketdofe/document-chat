export type ChatList = Array<string>;

export type ChatListResponse = {
  chats: ChatList;
  totalCount: number;
};

export type NewChatRequest = {
  title: string;
  documentNames: Array<string>;
};

export type NewChatResponse = {
  presignedUrls: Array<{
    url: string;
    key: string;
  }>;
};

export type GetChatRequest = {
  chatId: string;
};

export type GetChatResponse = {
  id: string;
  documents: Array<{
    url: string;
    key: string;
  }>;
  isChatReady: boolean;
};

export type GenerateQuestionResponseRequest = {
  chatId: string;
  question: string;
  chatHistory: Array<{
    type: 'human' | 'agent';
    text: string;
  }>;
};

export type GenerateQuestionResponse = {
  result: string;
  chatHistory: Array<{
    type: 'human' | 'agent';
    text: string;
  }>;
};
