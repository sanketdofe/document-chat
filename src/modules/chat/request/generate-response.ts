import {
  GenerateQuestionResponse,
  GenerateQuestionResponseRequest,
} from '../../../shared/types/chat.type';
import { postRequest } from '../../../shared/infra/rest';

type GenerateResponse = GenerateQuestionResponseRequest & {
  authToken: string;
};
const generateResponse = async ({
  authToken,
  ...body
}: GenerateResponse): Promise<GenerateQuestionResponse> => {
  return await postRequest<GenerateQuestionResponse>({
    url: 'http://localhost:3001/',
    authToken: authToken,
    options: {
      body: JSON.stringify(body),
    },
  });
};

export default generateResponse;
