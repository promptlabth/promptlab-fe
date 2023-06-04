// utils/generateMessage.ts
import axios from 'axios';
import { openApiMassageConfig } from '@/models';

async function generateMessageWithBackend(config: openApiMassageConfig) {
   try {
      
      const apiUrl = "https://prompt-lab-be-uu4qhhj35a-as.a.run.app/gennerate"

      const data = {
         prompt: config.isTh ? config.promptTh : config.promptEn,
         model: config.model,
      }
      const requestOption = {
         headers: { 'Content-Type': 'application/json' },
      }
      const response = await axios.post(
         apiUrl,
         data,
         requestOption
      );
      return response.data;
   } catch (error) {
      console.error(error);
      return 'Error Please try again'
   }
}

export default generateMessageWithBackend;
