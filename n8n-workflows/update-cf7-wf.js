const https = require('https');

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOWQzMzk2Zi0wYTI4LTQ1Y2ItOWZlMi1iOWE4Mzc3OGYwMjEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiYjA1NzIyN2EtN2RmZC00NjFlLTk5MjUtNmI3YWJmMjYxZTkxIiwiaWF0IjoxNzcyMzkzODkxfQ.GuhcMa8-GbAORSclswpSK3cQRfNPzVBhrLFlqDEJBXQ";
const WF_ID = "9Rgsm7refp86hzbR";
const SHEETS_DOC_ID = "1i-7elsL-4g_XrxdDOzxR14fwnX5oVwCc6Kol2FBao1w";

// Full schema for the Leads sheet - copied from working workflow
const leadsSchema = [
  { id: "Timestamp", displayName: "Timestamp", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Telefon", displayName: "Telefon", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Keresztn\u00e9v", displayName: "Keresztn\u00e9v", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Vezet\u00e9kn\u00e9v", displayName: "Vezet\u00e9kn\u00e9v", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Teljes N\u00e9v", displayName: "Teljes N\u00e9v", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Email", displayName: "Email", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Nem", displayName: "Nem", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "B\u00e9rlet", displayName: "B\u00e9rlet", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "B\u00e9rlet \u00c1r", displayName: "B\u00e9rlet \u00c1r", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "1 db kezel\u00e9s", displayName: "1 db kezel\u00e9s", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "1 db kezel\u00e9s \u00e1r", displayName: "1 db kezel\u00e9s \u00e1r", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Pr\u00f3bakezel\u00e9s", displayName: "Pr\u00f3bakezel\u00e9s", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Priorit\u00e1s", displayName: "Priorit\u00e1s", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "K\u00f6vetkez\u0151 l\u00e9p\u00e9s", displayName: "K\u00f6vetkez\u0151 l\u00e9p\u00e9s", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_Telefon St\u00e1tusz", displayName: "n8n_Telefon St\u00e1tusz", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_\u00c1raj\u00e1nlat Elk\u00fcldve", displayName: "n8n_\u00c1raj\u00e1nlat Elk\u00fcldve", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Id\u0151pont egyeztetve", displayName: "Id\u0151pont egyeztetve", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Megjelent", displayName: "Megjelent", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "\u00dcgyf\u00e9l lett", displayName: "\u00dcgyf\u00e9l lett", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Vend\u00e9g ID", displayName: "Vend\u00e9g ID", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Telefon jegyzet", displayName: "Telefon jegyzet", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_Telefon Calendar", displayName: "n8n_Telefon Calendar", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Kezel\u00e9s d\u00e1tuma", displayName: "Kezel\u00e9s d\u00e1tuma", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Kezel\u00e9s kezdete", displayName: "Kezel\u00e9s kezdete", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Kezel\u00e9s ideje", displayName: "Kezel\u00e9s ideje", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Kezel\u00e9s t\u00edpusa", displayName: "Kezel\u00e9s t\u00edpusa", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_Els\u0151 napt\u00e1rbejegyz\u00e9s", displayName: "n8n_Els\u0151 napt\u00e1rbejegyz\u00e9s", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Treatment_Details", displayName: "Treatment_Details", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_Utalv\u00e1ny d\u00e1tuma", displayName: "n8n_Utalv\u00e1ny d\u00e1tuma", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_Utalv\u00e1ny lej\u00e1rt", displayName: "n8n_Utalv\u00e1ny lej\u00e1rt", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_Email ut\u00e1nk\u00f6vet\u00e9s utols\u00f3 d\u00e1tuma", displayName: "n8n_Email ut\u00e1nk\u00f6vet\u00e9s utols\u00f3 d\u00e1tuma", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "n8n_Ut\u00e1nk\u00f6vet\u00e9sek sz\u00e1ma", displayName: "n8n_Ut\u00e1nk\u00f6vet\u00e9sek sz\u00e1ma", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Notes", displayName: "Notes", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Lead_Source", displayName: "Lead_Source", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "First_Contact_Method", displayName: "First_Contact_Method", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Last_Interaction_Date", displayName: "Last_Interaction_Date", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Status", displayName: "Status", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Status_Details", displayName: "Status_Details", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Loss_Reason", displayName: "Loss_Reason", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Webhook_Trigger", displayName: "Webhook_Trigger", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Last_Webhook_Date", displayName: "Last_Webhook_Date", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Becs\u00fclt \u00e9rt\u00e9k", displayName: "Becs\u00fclt \u00e9rt\u00e9k", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Fizet\u00e9si st\u00e1tusz", displayName: "Fizet\u00e9si st\u00e1tusz", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "V\u00e1s\u00e1rolt kezel\u00e9sek sz\u00e1ma", displayName: "V\u00e1s\u00e1rolt kezel\u00e9sek sz\u00e1ma", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false },
  { id: "Lej\u00e1rt kezel\u00e9sek sz\u00e1ma", displayName: "Lej\u00e1rt kezel\u00e9sek sz\u00e1ma", required: false, defaultMatch: false, display: true, type: "string", canBeUsedToMatch: true, removed: false }
];

const sheetsDocRef = {
  __rl: true,
  value: SHEETS_DOC_ID,
  mode: "list",
  cachedResultName: "SS CRM test",
  cachedResultUrl: `https://docs.google.com/spreadsheets/d/${SHEETS_DOC_ID}/edit?usp=drivesdk`
};

const sheetsLeadsRef = {
  __rl: true,
  value: 1048312576,
  mode: "list",
  cachedResultName: "Leads",
  cachedResultUrl: `https://docs.google.com/spreadsheets/d/${SHEETS_DOC_ID}/edit#gid=1048312576`
};

const payload = {
  name: "SS Kapcsolat form feldolgoz\u00e1s",
  nodes: [
    {
      parameters: {
        httpMethod: "POST",
        path: "kapcsolat-form",
        responseMode: "responseNode",
        options: {}
      },
      id: "webhook-cf7",
      name: "Webhook \u2014 CF7 Bek\u00fcld\u00e9s",
      type: "n8n-nodes-base.webhook",
      typeVersion: 2,
      position: [240, 300]
    },
    {
      parameters: {
        assignments: {
          assignments: [
            { id: "1", name: "nev", value: "={{ $json.body['your-name'] ?? $json['your-name'] ?? '' }}", type: "string" },
            { id: "2", name: "email", value: "={{ $json.body['your-email'] ?? $json['your-email'] ?? '' }}", type: "string" },
            { id: "3", name: "telefon", value: "={{ $json.body['your-phone'] ?? $json['your-phone'] ?? '' }}", type: "string" },
            { id: "4", name: "targy", value: "={{ $json.body['your-subject'] ?? $json['your-subject'] ?? '' }}", type: "string" },
            { id: "5", name: "uzenet", value: "={{ $json.body['your-message'] ?? $json['your-message'] ?? '' }}", type: "string" },
            { id: "6", name: "forras", value: "WordPress \u2014 Kapcsolat form", type: "string" },
            { id: "7", name: "bekuldes_datum", value: "={{ $now.toFormat('yyyy-MM-dd HH:mm') }}", type: "string" }
          ]
        },
        options: {}
      },
      id: "set-cf7-adatok",
      name: "Set \u2014 CF7 Adatok",
      type: "n8n-nodes-base.set",
      typeVersion: 3.4,
      position: [460, 300]
    },
    {
      // Google Sheets — Read Rows (get row(s)) — default operation is "read"
      parameters: {
        authentication: "serviceAccount",
        documentId: sheetsDocRef,
        sheetName: sheetsLeadsRef,
        options: {}
      },
      id: "sheets-get-last-id",
      name: "Google Sheets \u2014 Utols\u00f3 ID",
      type: "n8n-nodes-base.googleSheets",
      typeVersion: 4.5,
      position: [680, 300],
      credentials: { googleApi: { id: "BDK43PcepOa2ApxE", name: "Google Service Account account" } }
    },
    {
      parameters: {
        mode: "runOnceForAllItems",
        jsCode: `const rows = items;
const formData = $('Set \u2014 CF7 Adatok').item.json;

let lastId = '';
for (let i = rows.length - 1; i >= 0; i--) {
  const id = rows[i].json?.['Vend\u00e9g ID'];
  if (id && id.toString().includes('-')) {
    lastId = id.toString().trim();
    break;
  }
}

const currentYear = new Date().getFullYear().toString();
let newId;

if (!lastId) {
  newId = currentYear + '-001';
} else {
  const parts = lastId.split('-');
  const lastYear = parts[0];
  const lastNum = parseInt(parts[1]) || 0;
  const newNum = currentYear === lastYear ? lastNum + 1 : 1;
  newId = currentYear + '-' + String(newNum).padStart(3, '0');
}

return [{ json: { ...formData, vendeg_id: newId } }];`
      },
      id: "code-vendeg-id",
      name: "Code \u2014 \u00daj vend\u00e9g ID",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [900, 300]
    },
    {
      // Google Sheets — Append with full schema + serviceAccount auth
      parameters: {
        authentication: "serviceAccount",
        operation: "append",
        documentId: sheetsDocRef,
        sheetName: sheetsLeadsRef,
        columns: {
          mappingMode: "defineBelow",
          value: {
            "Vend\u00e9g ID": "={{ $json.vendeg_id }}",
            "Timestamp": "={{ $json.bekuldes_datum }}",
            "Teljes N\u00e9v": "={{ $json.nev }}",
            "Telefon": "={{ $json.telefon }}",
            "Email": "={{ $json.email }}",
            "Notes": "={{ $json.targy ? $json.targy + ': ' + $json.uzenet : $json.uzenet }}",
            "Lead_Source": "WordPress",
            "First_Contact_Method": "WP Form",
            "Status": "\u00daj",
            "Last_Interaction_Date": "={{ $json.bekuldes_datum }}",
            "Webhook_Trigger": "CF7",
            "Last_Webhook_Date": "={{ $json.bekuldes_datum }}"
          },
          matchingColumns: [],
          schema: leadsSchema,
          attemptToConvertTypes: false,
          convertFieldsToString: false
        },
        options: {}
      },
      id: "sheets-append",
      name: "Google Sheets \u2014 CRM sor",
      type: "n8n-nodes-base.googleSheets",
      typeVersion: 4.5,
      position: [1120, 300],
      credentials: { googleApi: { id: "BDK43PcepOa2ApxE", name: "Google Service Account account" } }
    },
    {
      parameters: {
        chatId: "8710129061",
        text: "=\ud83d\udce9 \u00daj WordPress kapcsolat\n\n\ud83d\udc64 {{ $json.nev }}\n\ud83d\udcde {{ $json.telefon }}\n\ud83d\udce7 {{ $json.email }}\n\ud83d\udccb T\u00e1rgy: {{ $json.targy }}\n\ud83d\udcac {{ $json.uzenet }}\n\n\ud83d\udcc6 {{ $json.bekuldes_datum }}",
        additionalFields: { parse_mode: "HTML" }
      },
      id: "telegram-ertesito",
      name: "Telegram \u2014 \u00c9rtes\u00edt\u0151",
      type: "n8n-nodes-base.telegram",
      typeVersion: 1.2,
      position: [1340, 300],
      credentials: { telegramApi: { id: "TWEb7fQ8yVfAWC62", name: "Kurucz Anett Telegram" } }
    },
    {
      parameters: {
        respondWith: "json",
        responseBody: "={\"success\": true}",
        options: { responseCode: 200 }
      },
      id: "webhook-response",
      name: "Webhook Response",
      type: "n8n-nodes-base.respondToWebhook",
      typeVersion: 1.1,
      position: [1560, 300]
    },
  ],
  connections: {
    "Webhook \u2014 CF7 Bek\u00fcld\u00e9s": { main: [[{ node: "Set \u2014 CF7 Adatok", type: "main", index: 0 }]] },
    "Set \u2014 CF7 Adatok": { main: [[{ node: "Google Sheets \u2014 Utols\u00f3 ID", type: "main", index: 0 }]] },
    "Google Sheets \u2014 Utols\u00f3 ID": { main: [[{ node: "Code \u2014 \u00daj vend\u00e9g ID", type: "main", index: 0 }]] },
    "Code \u2014 \u00daj vend\u00e9g ID": { main: [[{ node: "Google Sheets \u2014 CRM sor", type: "main", index: 0 }]] },
    "Google Sheets \u2014 CRM sor": { main: [[{ node: "Telegram \u2014 \u00c9rtes\u00edt\u0151", type: "main", index: 0 }]] },
    "Telegram \u2014 \u00c9rtes\u00edt\u0151": { main: [[{ node: "Webhook Response", type: "main", index: 0 }]] },
  },
  settings: { executionOrder: "v1" }
};

const data = JSON.stringify(payload);

const options = {
  hostname: 'n8n.srv1190089.hstgr.cloud',
  path: `/api/v1/workflows/${WF_ID}`,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-N8N-API-KEY': API_KEY,
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    const j = JSON.parse(body);
    if (j.message) { console.log('Error:', j.message); return; }
    console.log('Name:', j.name);
    console.log('ID:', j.id);
    console.log('Nodes:', j.nodes?.length);
    j.nodes?.forEach(n => {
      console.log(' ', n.name, '| op:', n.parameters?.operation || 'read(default)', '| auth:', n.parameters?.authentication || '-');
      if (n.credentials) console.log('    cred:', JSON.stringify(n.credentials));
      if (n.parameters?.chatId) console.log('    chatId:', n.parameters.chatId);
    });
  });
});

req.write(data);
req.end();
