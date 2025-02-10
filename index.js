import { PyrusClient } from './PyrusClient.js';
import { GoogleSheetsClient } from './GoogleSheetsClient.js';
import 'dotenv/config';

class PyrusSheetsSync {
  constructor() {
    this.pyrus = new PyrusClient(
      process.env.PYRUS_CLIENT_ID,
      process.env.PYRUS_SECRET
    );
    
    this.sheets = new GoogleSheetsClient(
      process.env.GOOGLE_SHEETS_ID,
      JSON.parse(process.env.GOOGLE_CREDENTIALS)
    );
  }

  async sync(formId, range) {
    try {
      await this.sheets.init();
      
      const tasks = await this.pyrus.getFormTasks(formId);
      
      const sheetData = tasks.map(task => [
        task.id,
        task.created_date,
        task.fields?.title || ''
      ]);
      
      await this.sheets.writeData(range, sheetData);
      console.log('Данные успешно синхронизированы');
    } catch (error) {
      console.error('Ошибка синхронизации:', error.message);
    }
  }
}

const syncService = new PyrusSheetsSync();
syncService.sync(
  process.env.PYRUS_FORM_ID,
  process.env.GOOGLE_SHEETS_RANGE
);