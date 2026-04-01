import { appendFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const saveDir = resolve(process.cwd(), ".local-data");
const saveFile = resolve(saveDir, "three-lines-results.ndjson");

function buildUsername(track) {
  const now = new Date();
  const trackCode = track === "line_range" ? "lr" : track === "exploit" ? "ex" : "gto";
  const dateCode = `${now.getFullYear().toString().slice(2)}${String(now.getMonth() + 1).padStart(
    2,
    "0",
  )}${String(now.getDate()).padStart(2, "0")}`;
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `tex-${trackCode}-${dateCode}-${suffix}`;
}

function readBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    let raw = "";
    request.on("data", (chunk) => {
      raw += chunk;
    });
    request.on("end", () => resolveBody(raw));
    request.on("error", rejectBody);
  });
}

function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(body));
}

async function handleSave(request, response) {
  if (request.method !== "POST" || request.url !== "/api/three-lines/save-result") {
    return false;
  }

  try {
    const rawBody = await readBody(request);
    const payload = rawBody ? JSON.parse(rawBody) : {};
    const track =
      payload &&
      typeof payload.result === "object" &&
      payload.result &&
      typeof payload.result.track === "string"
        ? payload.result.track
        : "gto";
    const savedAt = new Date().toISOString();
    const username = buildUsername(track);

    mkdirSync(saveDir, { recursive: true });
    appendFileSync(
      saveFile,
      `${JSON.stringify({
        username,
        savedAt,
        level: payload.level ?? null,
        focus: payload.focus ?? null,
        result: payload.result ?? null,
        reminderCard: payload.reminderCard ?? null,
      })}\n`,
      "utf8",
    );

    sendJson(response, 200, {
      username,
      savedAt,
      mode: "server",
    });
  } catch (error) {
    sendJson(response, 500, {
      error: error instanceof Error ? error.message : "save failed",
    });
  }

  return true;
}

function attachMiddleware(server) {
  server.middlewares.use(async (request, response, next) => {
    const handled = await handleSave(request, response);
    if (handled) {
      return;
    }
    next();
  });
}

export function threeLinesSaveApiPlugin() {
  return {
    name: "three-lines-save-api",
    configureServer(server) {
      attachMiddleware(server);
    },
    configurePreviewServer(server) {
      attachMiddleware(server);
    },
  };
}
