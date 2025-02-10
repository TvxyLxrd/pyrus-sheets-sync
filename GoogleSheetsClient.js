import { google } from 'googleapis';

export class GoogleSheetsClient {
  constructor(spreadsheetId, credentials) {
    this.spreadsheetId = spreadsheetId;
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
  }

  async init() {
    this.sheets = google.sheets({
      version: 'v4',
      auth: await this.auth.getClient()
    });
    return this;
  }

  async writeData(range, data) {
    const response = await this.sheets.spreadsheets.values.update({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values: data }
    });
    return response.data;
  }
}