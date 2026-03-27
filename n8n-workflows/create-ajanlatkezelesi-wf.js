/**
 * Create "SS Aktuális ajánlat form feldolgozás" workflow
 * by cloning the kapcsolat-form workflow with modified webhook path and fields.
 */
const https = require('https');

const N8N_HOST = 'n8n.srv1190089.hstgr.cloud';
const N8N_API_KEY = process.env.N8N_API_KEY;
const SOURCE_WF_ID = '9Rgsm7refp86hzbR';

function apiRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: N8N_HOST,
      path: `/api/v1${path}`,
      method,
      headers: {
        'X-N8N-API-KEY': N8N_API_KEY,
        'Content-Type': 'application/json',
      },
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch { resolve(data); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // 1. Get source workflow
  console.log('1. Fetching source workflow...');
  const src = await apiRequest('GET', `/workflows/${SOURCE_WF_ID}`);
  console.log('   Source:', src.name);

  // 2. Deep clone nodes and connections
  const nodes = JSON.parse(JSON.stringify(src.nodes));
  const connections = JSON.parse(JSON.stringify(src.connections));

  // 3. Modify Webhook node
  const whNode = nodes.find(n => n.type === 'n8n-nodes-base.webhook');
  whNode.parameters.path = 'aktualis-ajanlat-form';
  whNode.webhookId = require('crypto').randomUUID();
  whNode.name = 'Webhook — Ajánlat Beküldés';
  console.log('2. Webhook path: aktualis-ajanlat-form');

  // Fix connections - rename source node references
  const oldWhName = 'Webhook — CF7 Beküldés';
  const newWhName = whNode.name;
  if (connections[oldWhName]) {
    connections[newWhName] = connections[oldWhName];
    delete connections[oldWhName];
  }
  // Update any node referencing the old webhook name in connections
  Object.values(connections).forEach(conn => {
    if (conn.main) {
      conn.main.forEach(outputs => {
        outputs.forEach(c => {
          if (c.node === oldWhName) c.node = newWhName;
        });
      });
    }
  });

  // 4. Modify Set node — same fields but subject is hidden "50%-os kedvezmény igénylése"
  const setNode = nodes.find(n => n.name === 'Set — CF7 Adatok');
  setNode.name = 'Set — Ajánlat Adatok';
  setNode.parameters.assignments.assignments = [
    { id: '1', name: 'nev', value: "={{ $json.body['your-name'] ?? $json['your-name'] ?? '' }}", type: 'string' },
    { id: '2', name: 'email', value: "={{ $json.body['your-email'] ?? $json['your-email'] ?? '' }}", type: 'string' },
    { id: '3', name: 'telefon', value: "={{ $json.body['your-phone'] ?? $json['your-phone'] ?? '' }}", type: 'string' },
    { id: '4', name: 'targy', value: "={{ $json.body['your-subject'] ?? $json['your-subject'] ?? '50%-os kedvezmény igénylése' }}", type: 'string' },
    { id: '5', name: 'uzenet', value: '', type: 'string' },
    { id: '6', name: 'forras', value: 'WordPress — Aktuális ajánlat form', type: 'string' },
    { id: '7', name: 'bekuldes_datum', value: "={{ $now.toFormat('yyyy.MM.dd') }}", type: 'string' },
  ];

  // Fix connections for renamed Set node
  const oldSetName = 'Set — CF7 Adatok';
  const newSetName = setNode.name;
  if (connections[oldSetName]) {
    connections[newSetName] = connections[oldSetName];
    delete connections[oldSetName];
  }
  Object.values(connections).forEach(conn => {
    if (conn.main) {
      conn.main.forEach(outputs => {
        outputs.forEach(c => {
          if (c.node === oldSetName) c.node = newSetName;
        });
      });
    }
  });
  // Also update webhook connection target
  if (connections[newWhName]) {
    connections[newWhName].main.forEach(outputs => {
      outputs.forEach(c => {
        if (c.node === oldSetName) c.node = newSetName;
      });
    });
  }

  // 5. Modify Code node — update reference to new Set node name
  const codeNode = nodes.find(n => n.name === 'Code — Új vendég ID');
  codeNode.parameters.jsCode = codeNode.parameters.jsCode.replace(
    "Set — CF7 Adatok",
    "Set — Ajánlat Adatok"
  );
  console.log('3. Code node updated to reference new Set node');

  // 6. Modify Telegram node
  const tgNode = nodes.find(n => n.name === 'Telegram — Értesítő');
  tgNode.parameters.text =
    "=📩 <b>Új ajánlat igénylés (50% kedvezmény)</b>\n\n" +
    "👤 <b>Név:</b> {{ $('Code — Új vendég ID').item.json.nev }}\n" +
    "📞 <b>Telefon:</b> {{ $('Code — Új vendég ID').item.json.telefon }}\n" +
    "📧 <b>Email:</b> {{ $('Code — Új vendég ID').item.json.email }}\n\n" +
    "📆 {{ $('Code — Új vendég ID').item.json.bekuldes_datum }}\n" +
    "🆔 {{ $('Code — Új vendég ID').item.json.vendeg_id }}";
  console.log('4. Telegram message updated');

  // 7. Modify Sheets append node — same mapping, lead source different
  const appendNode = nodes.find(n => n.name === 'Google Sheets — CRM sor');
  const colVal = appendNode.parameters.columns.value;
  colVal['Lead_Source'] = 'WordPress — Ajánlat';
  colVal['First_Contact_Method'] = 'WP Ajánlat Form';
  // Clear schema cache
  appendNode.parameters.columns.schema = [];
  console.log('5. Sheets append: Lead_Source = WordPress — Ajánlat');

  // 8. Generate new node IDs
  nodes.forEach(n => {
    n.id = require('crypto').randomUUID().substring(0, 12);
  });

  // 9. Create new workflow
  const newWf = {
    name: 'SS Aktuális ajánlat form feldolgozás',
    nodes,
    connections,
    settings: src.settings || {},
  };

  console.log('\n6. Creating new workflow...');
  const created = await apiRequest('POST', '/workflows', newWf);
  if (created.message) {
    console.error('   Error:', created.message);
    console.error('   Details:', JSON.stringify(created).substring(0, 500));
    process.exit(1);
  }
  console.log('   Created! ID:', created.id);

  // 10. Activate
  console.log('7. Activating...');
  const activated = await apiRequest('POST', `/workflows/${created.id}/activate`);
  console.log('   Active:', activated.active);

  // 11. Test
  console.log('\n8. Testing webhook...');
  const testResult = await new Promise((resolve, reject) => {
    const body = JSON.stringify({
      'your-name': 'Teszt Ajánlat',
      'your-email': 'ajanlattest@teszt.hu',
      'your-phone': '06309876543',
      'your-subject': '50%-os kedvezmény igénylése',
      'aszf': '1',
      'hozzajarulas': '1',
    });
    const req = https.request({
      hostname: N8N_HOST,
      path: '/webhook/aktualis-ajanlat-form',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
  console.log('   Response:', testResult.status, testResult.body || '(empty)');

  console.log('\n   Waiting 4s...');
  await new Promise(r => setTimeout(r, 4000));

  const execs = await apiRequest('GET', `/executions?workflowId=${created.id}&limit=1`);
  if (execs.data?.[0]) {
    const latest = execs.data[0];
    console.log('   Execution:', latest.id, '| Status:', latest.status);
  }

  console.log('\n=== ÖSSZEFOGLALÓ ===');
  console.log('Workflow neve:', 'SS Aktuális ajánlat form feldolgozás');
  console.log('Workflow ID:', created.id);
  console.log('Webhook URL:', `https://${N8N_HOST}/webhook/aktualis-ajanlat-form`);
  console.log('Webhook method: POST');
  console.log('Content-Type: application/json');
}

main().catch(console.error);
