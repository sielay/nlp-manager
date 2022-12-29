import { abstractBackend } from "../abstractBackend";
import * as ModelsModule from "../../models/nlp/corpus/model";
import { ModelType } from "../../types/models";

jest.mock("../../models/nlp/corpus/model", () => ({
  getCorpora: jest.fn(() => Promise.resolve("get-corpora")),
  insertCorpus: jest.fn((...args) => Promise.resolve(args)),
}));

describe("shared/nlpManagerBackend", () => {
  describe("abstractBackend", () => {
    it("Requires being overriden", async () => {
      // @ts-expect-error
      expect(() => abstractBackend.importFile({})).rejects.toBe("Abstract");
    });
    it("getCorpora", async () => {
      expect(ModelsModule.getCorpora).toBeCalledTimes(0);
      expect(await abstractBackend.getCorpora()).toBe("get-corpora");
      expect(ModelsModule.getCorpora).toBeCalledTimes(1);
    });
    it("getVersion", async () => {
      expect(await abstractBackend.getVersion()).toMatch(
        /^\d+\.\d+\.\d+(|-[a-zA-Z0-9_-]+)$/
      );
    });
    describe("ingestFile", () => {
      it("Corpora", async () => {
        expect(ModelsModule.insertCorpus).toBeCalledTimes(0);

        expect(
          await abstractBackend.ingestFile(
            // @ts-expect-error
            {
              name: "myFile",
              type: ModelType.NLP_CORPUS,
            }
          )
        ).toBe(true);
        expect(ModelsModule.insertCorpus).toBeCalledTimes(1);
        expect(ModelsModule.insertCorpus).toBeCalledWith({
          name: "myFile",
          type: ModelType.NLP_CORPUS,
        });
      });
      it("unknown", async () => {
        expect(ModelsModule.insertCorpus).toBeCalledTimes(1);

        expect(
          await abstractBackend.ingestFile(
            // @ts-expect-error
            {
              name: "myFile",
              type: ModelType.UNKNOWN,
            }
          )
        ).toBe(false);
        expect(ModelsModule.insertCorpus).toBeCalledTimes(1);
      });
    });
  });
});
