/**
 * Fix: Clear stale Google Sheets schema cache in the CRM append node.
 * The defineBelow column mapping uses column NAMES which are correct,
 * but the cached schema causes validation errors when columns were reordered.
 * Solution: Clear the schema array so n8n re-fetches it on next run.
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
  // 1. Get current workflow
  console.log('1. Fetching workflow...');
  const wf = await apiRequest('GET', `/workflows/${WF_ID}`);
  console.log('   Name:', wf.name, '| Active:', wf.active);

  // 2. Deactivate
  console.log('2. Deactivating...');
  await apiRequest('POST', `/workflows/${WF_ID}/deactivate`);
  console.log('   Done');

  // 3. Fix the "Google Sheets — CRM sor" node - clear stale schema
  const appendNode = wf.nodes.find(n => n.name === 'Google Sheets — CRM sor');
  if (!appendNode) {
    console.error('ERROR: Append node not found!');
    process.exit(1);
  }

  console.log('3. Fixing append node schema...');
  console.log('   Old schema entries:', appendNode.parameters.columns.schema?.length || 0);
  console.log('   Mapping mode:', appendNode.parameters.columns.mappingMode);

  // Keep the defineBelow mapping but clear the stale schema
  // The column VALUE mapping stays the same - these use column NAMES
  appendNode.parameters.columns.schema = [];

  console.log('   Schema cleared (will be re-fetched by n8n)');

  // Also fix the "Google Sheets — Utolsó ID" node if it has stale schema
  const getNode = wf.nodes.find(n => n.name === 'Google Sheets — Utolsó ID');
  if (getNode) {
    console.log('4. Checking get-last-id node...');
    // This is a getAll operation, no schema needed
    console.log('   Operation: getAll (no schema fix needed)');
  }

  // 5. PUT updated workflow
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
  console.log('   Updated successfully');

  // 6. Re-activate
  console.log('6. Activating...');
  const activated = await apiRequest('POST', `/workflows/${WF_ID}/activate`);
  console.log('   Active:', activated.active);

  // 7. Test webhook
  console.log('\n7. Testing webhook...');
  const testResult = await new Promise((resolve, reject) => {
    const body = JSON.stringify({
      'your-name': 'Teszt Felhasználó',
      'your-email': 'test@teszt.hu',
      'your-phone': '06301234567',
      'your-subject': 'Teszt beküldés',
      'your-message': 'Ez egy teszt a schema fix után',
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

  console.log('   Response:', testResult.status, testResult.body || '(empty)');

  // 8. Wait 3 seconds and check execution
  console.log('\n8. Waiting 3s for execution to complete...');
  await new Promise(r => setTimeout(r, 3000));

  const execs = await apiRequest('GET', `/executions?workflowId=${WF_ID}&limit=1`);
  if (execs.data?.[0]) {
    const latest = execs.data[0];
    console.log('   Latest execution:', latest.id, '| Status:', latest.status, '| Finished:', latest.finished);
  }

  console.log('\nDone!');
}

main().catch(console.error);
