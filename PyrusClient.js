import axios from 'axios';

export class PyrusClient {
  constructor(clientId, secret) {
    this.clientId = clientId;
    this.secret = secret;
    this.baseUrl = 'https://api.pyrus.com';
  }

  async getAccessToken() {
    const response = await axios.post('https://extensions.pyrus.com/v1/token', {
      client_id: this.clientId,
      secret: this.secret
    });
    return response.data.access_token;
  }

  async getFormTasks(formId) {
    const token = await this.getAccessToken();
    const response = await axios.get(`${this.baseUrl}/forms/${formId}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.tasks;
  }
}