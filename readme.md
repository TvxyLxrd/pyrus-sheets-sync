
Pyrus to Google Sheets Sync  
Автоматическая синхронизация данных из форм Pyrus (https://pyrus.com) в Google Sheets через API.  
Проект реализован на JavaScript с использованием классов для модульности и читаемости кода.  

---  

✨ Особенности:  
- Аутентификация через OAuth 2.0 (Google) и токены (Pyrus)  
- Получение задач из указанной формы Pyrus  
- Запись данных в Google Sheets  
- Конфигурация через environment variables (.env)  
- Обработка ошибок и логирование  

---  

⚙️ Установка:  
1. Клонируйте репозиторий:  
git clone https://github.com/your-repo/pyrus-sheets-sync.git  
cd pyrus-sheets-sync  

2. Установите зависимости:  
npm install  

3. Создайте файл .env:  
cp .env.example .env  

---  

🔑 Конфигурация:  

1. Настройка Google Sheets:  
1. Создайте сервисный аккаунт в Google Cloud Console (https://console.cloud.google.com)  
2. Скачайте JSON-ключи и преобразуйте в строку:  
cat credentials.json | jq -c  
3. Скопируйте полученный JSON в .env как GOOGLE_CREDENTIALS  

2. Настройка Pyrus:  
1. Получите API-ключи в Pyrus Settings → API (https://pyrus.com/settings/api)  
2. Укажите их в .env:  
PYRUS_CLIENT_ID=your_client_id  
PYRUS_SECRET=your_secret  
PYRUS_FORM_ID=12345  

Пример .env:  
PYRUS_CLIENT_ID="abcd1234"  
PYRUS_SECRET="secret_key"  
PYRUS_FORM_ID="67890"  
GOOGLE_SHEETS_ID="1a2b3c..."  
GOOGLE_SHEETS_RANGE="Лист1!A1"  
GOOGLE_CREDENTIALS='{"type":"service_account","project_id":"...}'  

---  

🚀 Использование:  

Запуск синхронизации:  
node index.js  

Пример вывода:  
Данные успешно синхронизированны (обновлено 15 строк)  

---  

⏰ Расписание (Cron):  

Для автоматического запуска каждые 2 часа:  
0 */2 * * * cd /path/to/project && node index.js  

---  

🛠️ Troubleshooting:  

1. Ошибки аутентификации:  
- Проверьте правильность ключей в .env  
- Убедитесь, что сервисный аккаунт имеет доступ к таблице  

2. Пустые данные:  
- Проверьте form_id в Pyrus  
- Убедитесь, что в форме есть задачи  

3. Логирование:  
- Все ошибки выводятся в консоль  
- Для дебага добавьте console.log в PyrusSheetsSync.sync()  

🔗 Ссылки:  
- Документация Pyrus API: https://pyrus.com/ru/help/api  
- Руководство Google Sheets API: https://developers.google.com/sheets/api