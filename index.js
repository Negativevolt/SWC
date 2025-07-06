const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: 'service_account.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ status: 'error', message: 'Missing credentials' });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = 'YOUR_SPREADSHEET_ID';
  const range = 'Sheet1!A2:C'; // Assuming headers are in row 1

  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  const rows = response.data.values;

  for (const row of rows) {
    if (row[0] === username && row[1] === password) {
      return res.json({ status: 'success', accessLevel: row[2] });
    }
  }

  res.status(401).json({ status: 'error', message: 'Invalid credentials' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
