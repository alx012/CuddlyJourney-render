// server/routes/notes.ts
import { Router } from "express";
import supabase from "../supabase";

const router = Router();

// GET: 讀取便條紙
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("notes").select("*");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST: 儲存便條紙
router.post("/", async (req, res) => {
  const { content } = req.body;

  const { data, error } = await supabase.from("notes").insert([{ content }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;