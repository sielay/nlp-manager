export const loadBackend = async () => {
  // backend is preloaded, you are most likely using Electron application
  if (window.nlpManagerBackend) return;
  const { buildWebBackend } = await import("./webBackend");
  window.nlpManagerBackend = await buildWebBackend();
};
