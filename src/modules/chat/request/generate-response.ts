import {
  GenerateQuestionResponse,
  GenerateQuestionResponseRequest,
} from '../../../shared/types/chat.type';
import { postRequest } from '../../../shared/infra/rest';
import { GENERATE_QUESTION_RESPONSE_URL } from '../../../shared/config/app/request';

type GenerateResponse = GenerateQuestionResponseRequest & {
  authToken: string;
};
const generateResponse = async ({
  authToken,
  ...body
}: GenerateResponse): Promise<GenerateQuestionResponse> => {
  return await postRequest<GenerateQuestionResponse>({
    url: GENERATE_QUESTION_RESPONSE_URL,
    authToken: authToken,
    options: {
      body: JSON.stringify(body),
    },
  });
};

export default generateResponse;
