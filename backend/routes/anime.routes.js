import express from "express";
import db from "../db.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

// apply auth middleware to all anime routes
router.use(auth);

/* GET all anime for logged-in user */
router.get("/", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM anime WHERE user_id = ? ORDER BY updated_at DESC",
    [req.user.id]
  );
  res.json(rows);
});

/* ADD anime */
router.post("/", async (req, res) => {
  const { title, season, episode, status } = req.body;

  await db.query(
    "INSERT INTO anime (user_id, title, season, episode, status, updated_at) VALUES (?, ?, ?, ?, ?, NOW())",
    [req.user.id, title, season, episode, status]
  );

  res.json({ success: true });
});

/* UPDATE anime (partial: season / episode / status) */
router.put("/:id", async (req, res) => {
  const { season, episode, status } = req.body;

  const fields = [];
  const values = [];

  if (season !== undefined) {
    fields.push("season = ?");
    values.push(season);
  }
  if (episode !== undefined) {
    fields.push("episode = ?");
    values.push(episode);
  }
  if (status !== undefined) {
    fields.push("status = ?");
    values.push(status);
  }

  if (!fields.length) {
    return res.status(400).json({ error: "No fields to update" });
  }

  fields.push("updated_at = NOW()");
  values.push(req.params.id, req.user.id);

  await db.query(
    `UPDATE anime SET ${fields.join(", ")} WHERE id = ? AND user_id = ?`,
    values
  );

  res.json({ success: true });
});

/* DELETE anime */
router.delete("/:id", async (req, res) => {
  await db.query(
    "DELETE FROM anime WHERE id = ? AND user_id = ?",
    [req.params.id, req.user.id]
  );
  res.json({ success: true });
});

export default router;
