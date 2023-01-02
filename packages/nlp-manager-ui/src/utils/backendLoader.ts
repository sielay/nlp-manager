export const loadBackend = async () => {
  // backend is preloaded, you are most likely using Electron application
  if (window.nlpManagerBackend) return;
  // eslint-disable-next-line no-restricted-globals
  if (top) {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (top.nlpManagerBackend) {
        // eslint-disable-next-line no-restricted-globals
        window.nlpManagerBackend = top.nlpManagerBackend;
        
        return;
      }
    } catch (error) {
      console.error("Cannot access the top", error);
    }
  }
  const { buildWebBackend } = await import("./webBackend");
  window.nlpManagerBackend = await buildWebBackend();
};
