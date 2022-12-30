import { init } from "./dist";
import { loadBackend } from "./utils/backendLoader";

void (async () => {
  await loadBackend();
  init("root");
})();
