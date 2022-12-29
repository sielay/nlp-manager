import { getCorpora, insertCorpus } from "../model";
import * as backend from "../../../../nlpManagerBackend";
import { isCoprusValid } from "../validator";
import { ModelType } from "../../../../types/models";

jest.mock("../../../../nlpManagerBackend", () => ({
  getDB: jest.fn(),
}));

describe("shared/modles/nlp/corpus", () => {
  describe("model", () => {
    const model = {
      create: jest.fn(async () => true),
      find: jest.fn(async () => {
        return [
          {
            id: 123,
            name: "abc",
            locale: "en-GB",
            data: [],
          },
          {
            id: 1234,
            name: "abc4",
            locale: "en-GB",
            data: [],
          },
        ];
      }),
    };
    const db = {
      model: jest.fn(async () => model),
    };

    beforeAll(() => {
      (backend.getDB as jest.Mock).mockImplementationOnce(async () => db);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it("getCorpuses", async () => {
      expect(model.find).toBeCalledTimes(0);
      expect(db.model).toBeCalledTimes(0);
      expect(backend.getDB).toBeCalledTimes(0);
      const data = await getCorpora();
      expect(data.length).toBe(2);
      expect(isCoprusValid(data[0])).toBeTruthy();
      expect(isCoprusValid(data[1])).toBeTruthy();
      expect(model.find).toBeCalledTimes(1);
      expect(db.model).toBeCalledTimes(1);
      expect(backend.getDB).toBeCalledTimes(1);
    });
    it("insertCorpus", async () => {
      (backend.getDB as jest.Mock).mockImplementationOnce(async () => db);
      expect(model.create).toBeCalledTimes(0);
      expect(db.model).toBeCalledTimes(1);
      expect(backend.getDB).toBeCalledTimes(1);
      const data = await insertCorpus({
        name: "myFile.json",
        type: ModelType.NLP_CORPUS,
        mimeType: "application/json",
        content: {
          name: "My corpus",
          locale: "en-US",
          data: [
            {
              utterances: ["abc"],
              intent: "afaik",
              answers: ["def"],
            },
          ],
        },
      });
      expect(data).toBe(true);
      expect(model.create).toBeCalledTimes(1);
      expect(db.model).toBeCalledTimes(1);
      expect(backend.getDB).toBeCalledTimes(1);
    });
  });
});
