const fs = require('fs');

let f = fs.readFileSync('src/components/site/Chatbot.tsx', 'utf8');
f = f.replace('const msg = node', 'const msg = (node as any)');
fs.writeFileSync('src/components/site/Chatbot.tsx', f);

f = fs.readFileSync('src/components/site/ServicePage.tsx', 'utf8');
f = f.replace('search={bookingServiceId ? { service: bookingServiceId, formule: row.formuleId } : undefined}', 'search={(bookingServiceId ? { service: bookingServiceId, formule: row.formuleId || "", from: bookingServiceId } : { service: "", formule: "", from: "" }) as any}');
f = f.replace(/to=\{\`\/nettoyage-\$\{service\.id\}-toulouse\`\}/g, 'to={`/nettoyage-${service.id}-toulouse` as any}');
fs.writeFileSync('src/components/site/ServicePage.tsx', f);

f = fs.readFileSync('src/routes/formules.tsx', 'utf8');
f = f.replace(/search=\{\{ from: "formules" \}\}/g, 'search={{ from: "formules" } as any}');
f = f.replace('service: search.service as string | undefined', 'service: search.service as any');
fs.writeFileSync('src/routes/formules.tsx', f);

f = fs.readFileSync('src/routes/index.tsx', 'utf8');
f = f.replace(/to=\{\`\/nettoyage-\$\{service\.id\}-toulouse\`\}/g, 'to={`/nettoyage-${service.id}-toulouse` as any}');
fs.writeFileSync('src/routes/index.tsx', f);

f = fs.readFileSync('src/routes/reserver.tsx', 'utf8');
f = f.replace('setDate(newDate)', 'setDate(newDate || null)');
fs.writeFileSync('src/routes/reserver.tsx', f);
