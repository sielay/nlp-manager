import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";
import copy from "recursive-copy";
import { resolve } from "path";
const rimraf = require("rimraf");

const config: ForgeConfig = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  hooks: {
    packageAfterCopy: async (config, buildPath, version, platform, arch) => {
      await copy(
        resolve(buildPath, ".webpack/renderer/main_window/preload.js"),
        resolve(__dirname, "../nlp-manager-ui/build/preload.js"),
        { overwrite: true }
      );
      await new Promise((fullfill, reject) => {
        rimraf(
          resolve(buildPath, ".webpack/renderer/main_window/*"),
          (error: unknown) => {
            if (error) return reject(error);
            fullfill(undefined);
          }
        );
      });
      await copy(
        resolve(__dirname, "../nlp-manager-ui/build"),
        resolve(buildPath, ".webpack/renderer/main_window"),
        { overwrite: true }
      );
    },
  },
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
