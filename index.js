import express from "express";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

process.on("uncaughtException", err => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", err => {
  console.error("Unhandled Rejection:", err);
});

app.use(express.json());

app.post("/execute", (req, res) => {
  const { command } = req.body;

  if (!command || typeof command !== "string") {
    return res.status(400).json({ error: "Invalid command" });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
        stderr
      });
    }

    res.json({ stdout, stderr });
  });
});

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
