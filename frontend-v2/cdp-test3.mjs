const base = "http://localhost:9223";

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
await send(ws, "Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

await sleep(2500);

console.log("menu click:", JSON.stringify((await evaluate(ws, `
  (() => {
    const btn = document.querySelector('button[aria-label="Open menu"]');
    if (!btn) return "NOT FOUND";
    btn.click();
    return "clicked";
  })()
`)).result.value));

await sleep(1200);

for (const id of ["about", "projects", "contact"]) {
  await evaluate(ws, `document.querySelector('a[href="#${id}"]').click(); "ok"`);
  await sleep(2000);
  const r = await evaluate(ws, `
    (() => {
      const el = document.getElementById('${id}');
      const rect = el.getBoundingClientRect();
      const header = document.querySelector('header');
      return {
        scrollY: window.scrollY,
        top: rect.top,
        headerHeight: header ? header.getBoundingClientRect().height : null,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      };
    })()
  `);
  console.log(id, JSON.stringify(r.result.value));
  // reopen menu for next click
  await evaluate(ws, `document.querySelector('button[aria-label="Open menu"]')?.click(); "ok"`);
  await sleep(1000);
}

process.exit(0);
