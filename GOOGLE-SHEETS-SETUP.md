# Google Sheets Data Collection Setup

This connects your contact form to a Google Sheet so every submission
is automatically logged as a new row.

## Step-by-step

### 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name it: **Kinyoubi — Contact Submissions**
3. In Row 1, add these column headers:

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Project Type | Budget/Timeline/Jurisdiction | Message | Source Page |

4. Keep this sheet open — you'll need the URL

### 2. Create the Apps Script webhook

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.project_type || '',
      data.budget || data.timeline || data.jurisdiction || '',
      data.message || '',
      data.source || 'contact-form',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy → New deployment**
4. Type: **Web app**
5. Execute as: **Me**
6. Who has access: **Anyone**
7. Click **Deploy** and **Authorize access** (approve the permissions)
8. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

### 3. Add the URL to your site

Add this to your `.env.local` file:

```
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec
```

For GitHub Pages, add it as a GitHub Secret:
- Repo → Settings → Secrets → Actions → New secret
- Name: `GOOGLE_SHEETS_URL`
- Value: your Apps Script URL

Then uncomment the line in `.github/workflows/deploy.yml`.

That's it. Every form submission will appear as a new row in your spreadsheet.
