import { app } from "./app";

(async function () {
  try {
    const host = process.env.HOST || "localhost";
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

    if (!process.env.PORT) {
      console.warn("⚠  PORT is not defined in the environment variables. Using default port 3000.");
    }

    app.listen(port, () => {
      console.log(`🏃 Server running at http://${host}:${port}/`);
    });

  } catch (e) {
    console.error("❌ Failed to start the server:", e);
    process.exit(1);
  }
})();
