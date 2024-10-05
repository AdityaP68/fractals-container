import { Elysia } from "elysia";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import { logger } from "./logger";

const app = new Elysia();

// Define your runtime config object
const runtimeConfig = {
  API_URL: process.env.API_URL,
  FEATURE_FLAG: process.env.FEATURE_FLAG,
  SAMPLE: process.env.SAMPLE || "DEFAULT VALUE",
  // Add more variables as needed
};

// Helper function to get the correct base directory
function getBaseDir() {
  // Check if we're running from the dist directory
  if (__filename.includes("dist")) {
    return path.join(process.cwd(), "ui", "dist");
  }
  // Otherwise, we're running directly with ts-node
  return path.join(process.cwd(), "ui", "dist");
}

app.get("*", ({ request }) => {
  const urlPath = new URL(request.url).pathname;
  const baseDir = getBaseDir();

  logger.info(`Received request:-> ${JSON.stringify({ path: urlPath })}`);
  logger.debug(`Base directory:-> ${JSON.stringify({ baseDir })}`);

  let filePath = path.join(baseDir, urlPath === "/" ? "index.html" : urlPath);

  logger.debug(`Attempting to serve file:-> ${JSON.stringify({ filePath })}`);

  // If file doesn't exist, default to index.html for client-side routing
  if (!fs.existsSync(filePath)) {
    logger.warn(`File not found, defaulting to index.html:-> ${JSON.stringify({ filePath })}`);

    filePath = path.join(baseDir, "index.html");
    if (!fs.existsSync(filePath)) {
      logger.error("index.html not found");
      return new Response("Not Found", { status: 404 });
    }
  }

  const extname = path.extname(filePath);
  let contentType = mime.lookup(extname) || "application/octet-stream";

  // Explicitly set the correct MIME type for JavaScript files
  if (extname === ".js") {
    contentType = "application/javascript";
  }

  logger.info(`Serving file: -> ${JSON.stringify({ filePath, contentType })}`);
  
  let content = fs.readFileSync(filePath, "utf-8");

  // If it's the index.html, inject the runtime config
  if (filePath.endsWith("index.html")) {
    const configScript = `<script>window.__RUNTIME_CONFIG__ = ${JSON.stringify(
      runtimeConfig
    )}</script>`;
    content = content.replace("</head>", `${configScript}</head>`);
    logger.debug("Injected runtime config into index.html");
  }

  return new Response(content, {
    headers: { "Content-Type": contentType },
  });
});

const port = process.env.PORT || 5050;
app.listen(port);

logger.info(`🦊 Server is running: -> ${port}`);
