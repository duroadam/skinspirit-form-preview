const fs = require('fs');

const wf = JSON.parse(fs.readFileSync('wf_calendar_final.json', 'utf8'));

// 1. Update Mapper Code — add "Kezelés ideje" field
const mapper = wf.nodes.find(n => n.name === 'Mapper Code');
if (!mapper) throw new Error('Mapper Code node not found');

const newMapperCode = `const q = $input.item.json.query;
const rawDate = q["KezelesDatuma"];
let formattedDate = rawDate;
if (rawDate && rawDate.includes('/')) {
  const parts = rawDate.split('/');
  formattedDate = \`\${parts[2]}-\${parts[0].padStart(2,'0')}-\${parts[1].padStart(2,'0')}\`;
}
return {
  json: {
    "Keresztnév": q["Keresztnev"],
    "Teljes név": q["Keresztnev"] + " " + q["Vezeteknev"],
    "Email": q["Email"],
    "Vendég ID": q["VendegID"],
    "Kezelés dátuma": formattedDate,
    "Kezelés kezdete": q["KezelesKezdete"],
    "Kezelés típusa": q["KezelesTipusa"],
    "Kezelés ideje": q["KezelesIdeje"] || "60"
  }
};`;

mapper.parameters.jsCode = newMapperCode;
console.log('✅ Mapper Code updated — added "Kezelés ideje" field');

// 2. Update Generate ICS File1 — dynamic duration
const ics = wf.nodes.find(n => n.name === 'Generate ICS File1');
if (!ics) throw new Error('Generate ICS File1 node not found');

// Replace the hardcoded 60-minute duration line
const oldIcsCode = ics.parameters.jsCode;
const newIcsCode = oldIcsCode.replace(
  `const start = new Date(startDateTime);\n  const end = new Date(start.getTime() + 60 * 60000);`,
  `const start = new Date(startDateTime);\n  const durationMin = parseInt(item.json['Kezelés ideje']) || 60;\n  const end = new Date(start.getTime() + durationMin * 60000);`
);

if (newIcsCode === oldIcsCode) {
  // Try alternate whitespace
  const alt = oldIcsCode.replace(
    /const start = new Date\(startDateTime\);\s*\n\s*const end = new Date\(start\.getTime\(\) \+ 60 \* 60000\);/,
    `const start = new Date(startDateTime);\n  const durationMin = parseInt(item.json['Kezelés ideje']) || 60;\n  const end = new Date(start.getTime() + durationMin * 60000);`
  );
  if (alt === oldIcsCode) {
    console.error('❌ Could not find duration line in ICS code. Dumping for debug:');
    console.error(oldIcsCode.substring(0, 500));
    process.exit(1);
  }
  ics.parameters.jsCode = alt;
} else {
  ics.parameters.jsCode = newIcsCode;
}

console.log('✅ Generate ICS File1 updated — dynamic duration');

// Build PUT payload
const payload = {
  name: wf.name,
  nodes: wf.nodes,
  connections: wf.connections,
  settings: wf.settings,
  staticData: wf.staticData
};

fs.writeFileSync('wf_calendar_final_updated.json', JSON.stringify(payload, null, 2));
console.log('✅ Payload saved to wf_calendar_final_updated.json');
