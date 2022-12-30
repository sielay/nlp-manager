import { isCoprusValid, isItCorpus } from "../validator";

describe("shared/modles/nlp/corpus", () => {
  describe("validator", () => {
    it("isCoprusValid", async () => {
      const corpus = require("./corpus-en.mock.json");
      const { name, locale, data } = corpus;
      expect(isCoprusValid(corpus)).toBeTruthy();
      expect(isCoprusValid({})).toBeFalsy();
      expect(isCoprusValid({ data })).toBeFalsy();
      expect(isCoprusValid({ name, data })).toBeFalsy();
      expect(isCoprusValid({ name, locale })).toBeFalsy();
      expect(isCoprusValid({ name, locale, data: {} })).toBeFalsy();
    });
    it("isItCorpus", () => {
      const corpus = require("./corpus-en.mock.json");
      const { name, locale, data } = corpus;
      expect(isItCorpus(corpus)).toBeTruthy();
      expect(isItCorpus({})).toBeFalsy();
      expect(isItCorpus({ data })).toBeFalsy();
      expect(isItCorpus({ name, data })).toBeFalsy();
      expect(isItCorpus({ name, locale })).toBeFalsy();
      expect(isItCorpus({ name, locale, data: {} })).toBeFalsy();
    });
  });
});
