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

// Click the burger menu button
console.log("menu click:", JSON.stringify(await evaluate(ws, `
  (() => {
    const btn = document.querySelector('button[aria-label="Open menu"]');
    if (!btn) return "NOT FOUND";
    btn.click();
    return "clicked";
  })()
`)));

await sleep(1200);

console.log("menu open state:", JSON.stringify(await evaluate(ws, `
  (() => ({
    ariaExpanded: document.querySelector('button[aria-expanded]')?.getAttribute('aria-expanded'),
    headerHeight: document.querySelector('header')?.getBoundingClientRect().height,
  }))()
`)));

// Click the "About" nav link inside the menu
console.log("nav click:", JSON.stringify(await evaluate(ws, `
  (() => {
    const link = document.querySelector('a[href="#about"]');
    if (!link) return "NOT FOUND";
    link.click();
    return "clicked";
  })()
`)));

await sleep(2000);

console.log("scroll result:", JSON.stringify(await evaluate(ws, `
  (() => {
    const el = document.getElementById('about');
    const rect = el.getBoundingClientRect();
    return {
      scrollY: window.scrollY,
      sectionTopInViewport: rect.top,
      sectionHeight: rect.height,
      viewportHeight: window.innerHeight,
      headerHeight: document.querySelector('header')?.getBoundingClientRect().height,
      lenisScroll: window.lenis ? window.lenis.animatedScroll : null,
      lenisStopped: window.lenis ? window.lenis.isStopped : null,
    };
  })()
`)));

process.exit(0);
