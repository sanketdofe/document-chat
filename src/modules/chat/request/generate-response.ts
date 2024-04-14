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
  return await postRequest<GenerateQuestionResponse>(
    'http://localhost:3001/',
    authToken,
    {
      body: JSON.stringify(body),
    }
  );
};

export default generateResponse;
