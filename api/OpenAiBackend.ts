// utils/generateMessage.ts
import axios from 'axios';
import { openApiMassageConfig } from './OpenApiEngine';

async function generateMessageWithBackend(config: openApiMassageConfig) {
  try {
    const response = await axios.post(
      'https://prompt-lab-be-uu4qhhj35a-as.a.run.app/gennerate',
      {
        prompt: config.isTh ? config.promptTh : config.promptEn,
        model: config.model,

      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );


    return response.data;
  } catch (error) {
    console.error(error);
    return 'Error Please try again'
  }
}

export default generateMessageWithBackend;
