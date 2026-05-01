import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUBMISSIONS_FILE = path.join(__dirname, "submissions.json");

// Ensure submissions file exists
if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([]));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newEntry = {
        name,
        email,
        subject,
        message,
        date: new Date().toISOString(),
      };

      const data = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
      data.push(newEntry);
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2));

      res.status(201).json({ message: "Submission saved successfully", entry: newEntry });
    } catch (error) {
      console.error("Error saving submission:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // ── Admin: view all submissions (key-protected) ──────────────────────────
  // Access: GET /api/submissions?key=YOUR_ADMIN_KEY
  // Set ADMIN_KEY=yourpassword in your .env file  (defaults to "admin123" for dev)
  app.get("/api/submissions", (req, res) => {
    const adminKey = process.env.ADMIN_KEY || "admin123";
    if (req.query.key !== adminKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const data = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
      res.json({ total: data.length, submissions: [...data].reverse() });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA fallback: serve index.html for ALL non-API routes.
    // This allows the frontend to handle any dynamic tenant/subpath at runtime.
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api/')) {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
