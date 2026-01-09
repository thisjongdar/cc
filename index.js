import express from "express";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/execute", (req, res) => {
  const { command } = req.body;

  if (!command || typeof command !== "string") {
    return res.status(400).json({
      error: "Field 'command' harus berupa string"
    });
  }

  console.log(`Executing command: ${command}`);

  exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
        stderr
      });
    }

    res.json({
      success: true,
      stdout,
      stderr
    });
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Command server running on port ${PORT}`);
});
