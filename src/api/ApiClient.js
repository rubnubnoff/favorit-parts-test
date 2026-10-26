import axios from 'axios';

class ApiClient {
  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }

    this.client = axios.create({
      baseURL: 'https://api.favorit-parts.ru/hs/hsprice/',
      timeout: 15000,
      headers: {
        Accept: 'application/json',
      },
    });

    this.client.interceptors.response.use(
      (response) => {
        if (response.data && response.data.error) {
          throw new Error(`Ошибка API: ${response.data.error}`);
        }
        return response;
      },
      (error) => {
        if (axios.isCancel(error) || error.name === 'CanceledError') {
          return Promise.reject(error);
        }

        let message = 'Ошибка сети. Проверьте подключение.';

        if (error.code === 'ECONNABORTED') {
          message = 'Превышено время ожидания ответа от сервера.';
        } else if (error.response) {
          message = `Ошибка сервера: ${error.response.status}`;
        } else if (error.request) {
          message = 'Нет ответа от сервера (возможно, ошибка CORS или Mixed Content).';
        }

        return Promise.reject(new Error(message));
      }
    );

    ApiClient.instance = this;
  }

  async get(url, config = {}) {
    const response = await this.client.get(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();