/**
 * Fix v2:
 * 1. Timestamp format: yyyy.MM.dd
 * 2. Telegram node: use Code node output field names (nev, email, telefon, etc.)
 *    since Telegram comes AFTER Sheets append which passes through the Code output
 */
const https = require('https');

const N8N_HOST = 'n8n.srv1190089.hstgr.cloud';
const N8N_API_KEY = process.env.N8N_API_KEY;
const WF_ID = '9Rgsm7refp86hzbR';

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
  console.log('1. Fetching workflow...');
  const wf = await apiRequest('GET', `/workflows/${WF_ID}`);
  console.log('   Name:', wf.name);

  console.log('2. Deactivating...');
  await apiRequest('POST', `/workflows/${WF_ID}/deactivate`);

  // Fix 1: Timestamp format in Set node
  const setNode = wf.nodes.find(n => n.name === 'Set — CF7 Adatok');
  const tsField = setNode.parameters.assignments.assignments.find(a => a.name === 'bekuldes_datum');
  console.log('3. Fixing timestamp format...');
  console.log('   Old:', tsField.value);
  tsField.value = "={{ $now.toFormat('yyyy.MM.dd') }}";
  console.log('   New:', tsField.value);

  // Fix 2: Telegram node - reference webhook input data via Code node output
  // The flow is: Webhook → Set → Sheets(getAll) → Code → Sheets(append) → Telegram
  // Code node outputs: { nev, email, telefon, targy, uzenet, forras, bekuldes_datum, vendeg_id }
  // Sheets append passes data through, so Telegram's $json has the Sheets response
  // We need to reference the original data from the Code node via $('Code — Új vendég ID')
  const tgNode = wf.nodes.find(n => n.name === 'Telegram — Értesítő');
  console.log('4. Fixing Telegram message...');
  console.log('   Old text:', tgNode.parameters.text);

  tgNode.parameters.text =
    "=📩 <b>Új kapcsolat form megkeresés</b>\n\n" +
    "👤 <b>Név:</b> {{ $('Code — Új vendég ID').item.json.nev }}\n" +
    "📞 <b>Telefon:</b> {{ $('Code — Új vendég ID').item.json.telefon }}\n" +
    "📧 <b>Email:</b> {{ $('Code — Új vendég ID').item.json.email }}\n" +
    "📋 <b>Tárgy:</b> {{ $('Code — Új vendég ID').item.json.targy }}\n" +
    "💬 <b>Üzenet:</b> {{ $('Code — Új vendég ID').item.json.uzenet }}\n\n" +
    "📆 {{ $('Code — Új vendég ID').item.json.bekuldes_datum }}\n" +
    "🆔 {{ $('Code — Új vendég ID').item.json.vendeg_id }}";

  console.log('   New text:', tgNode.parameters.text);

  // PUT updated workflow
  const putBody = {
    nodes: wf.nodes,
    connections: wf.connections,
    settings: wf.settings || {},
    name: wf.name,
  };

  console.log('5. Updating workflow...');
  const result = await apiRequest('PUT', `/workflows/${WF_ID}`, putBody);
  if (result.message) {
    console.error('   PUT error:', result.message);
    await apiRequest('POST', `/workflows/${WF_ID}/activate`);
    process.exit(1);
  }
  console.log('   Updated');

  console.log('6. Activating...');
  const activated = await apiRequest('POST', `/workflows/${WF_ID}/activate`);
  console.log('   Active:', activated.active);

  // Test
  console.log('\n7. Testing webhook...');
  const testResult = await new Promise((resolve, reject) => {
    const body = JSON.stringify({
      'your-name': 'Teszt Felhasználó',
      'your-email': 'test@teszt.hu',
      'your-phone': '06301234567',
      'your-subject': 'Teszt tárgy',
      'your-message': 'Ez egy teszt a v2 fix után',
      'aszf': '1',
      'hozzajarulas': '1',
    });
    const req = https.request({
      hostname: N8N_HOST,
      path: '/webhook/kapcsolat-form',
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
  console.log('   Webhook response:', testResult.status, testResult.body || '(empty)');

  console.log('\n8. Waiting 4s...');
  await new Promise(r => setTimeout(r, 4000));

  const execs = await apiRequest('GET', `/executions?workflowId=${WF_ID}&limit=1`);
  if (execs.data?.[0]) {
    const latest = execs.data[0];
    console.log('   Execution:', latest.id, '| Status:', latest.status);
  }

  console.log('\nDone! Check Anett Telegram for the test message.');
}

main().catch(console.error);
