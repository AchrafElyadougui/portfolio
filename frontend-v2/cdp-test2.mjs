const base = "http://localhost:9222";

async function newTarget(url) {
  const res = await fetch(`${base}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  return res.json();
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    ws.addEventListener("open", () => resolve(ws));
    ws.addEventListener("error", reject);
  });
}

function send(ws, method, params = {}) {
  return new Promise((resolve) => {
    const id = Math.floor(Math.random() * 1e9);
    const handler = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id === id) {
        ws.removeEventListener("message", handler);
        resolve(msg.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function evaluate(ws, expression) {
  return send(ws, "Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const target = await newTarget("http://localhost:5184/");
const ws = await connect(target.webSocketDebuggerUrl);
await send(ws, "Page.enable");
await send(ws, "Runtime.enable");

await sleep(2500);

await evaluate(ws, `document.querySelector('button[aria-label="Open menu"]').click(); "ok"`);
await sleep(1200);
await evaluate(ws, `document.querySelector('a[href="#contact"]').click(); "ok"`);

const deltas = [50, 100, 150, 200, 300, 500, 700];
for (const d of deltas) {
  await sleep(d);
  const r = await evaluate(ws, `
    (() => {
      const el = document.getElementById('contact');
      const rect = el.getBoundingClientRect();
      return { scrollY: window.scrollY, top: rect.top };
    })()
  `);
  console.log(`+${d}ms:`, JSON.stringify(r.result.value));
}

process.exit(0);
