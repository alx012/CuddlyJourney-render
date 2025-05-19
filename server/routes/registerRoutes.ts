// server/routes/registerRoutes.ts
import { Express } from "express";
import notesRouter from "./notes"; // 👈 引入 notes API

export async function registerRoutes(app: Express) {
  // 註冊便條紙 API 路由
  app.use("/api/notes", notesRouter);

  // 如果未來還有其他路由，請在這裡繼續加
  // 例如：
  // import usersRouter from "./users";
  // app.use("/api/users", usersRouter);

  return app;
}