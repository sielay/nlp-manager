import { setup, getDB, reset } from "../db";
import * as Trilogy from "trilogy";

jest.mock("trilogy", () => ({
  connect: jest.fn(),
}));

describe("shared/nlpManagerBackend", () => {
  describe("db", () => {
    it("init memory", async () => {
      expect(Trilogy.connect).toBeCalledTimes(0);
      await getDB();
      expect(Trilogy.connect).toBeCalledTimes(1);
      expect(Trilogy.connect).toBeCalledWith(":memory:", { client: undefined });
      await reset();
    });
    it("setup and init", async () => {
      const close = jest.fn(() => {
        return Promise.resolve("ok");
      });
      (Trilogy.connect as jest.Mock).mockImplementationOnce(() => ({ close }));

      expect(() => setup("myfile")).not.toThrow();
      expect(() => setup("myfile")).not.toThrow();
      expect(Trilogy.connect).toBeCalledTimes(1);
      await getDB();
      expect(Trilogy.connect).toBeCalledTimes(2);
      expect(Trilogy.connect).toBeCalledWith("myfile", { client: "sql.js" });
      expect(() => setup("myfile")).toThrow();
      await reset();
    });
  });
});
