import { isCoprusValid } from "../validator";

describe("shared/modles/nlp/corpus", () => {
  describe("validator", () => {
    it("isCoprusValid", async () => {
        const corpus = require('./corpus-en.mock.json');
        const validation = isCoprusValid(corpus);
        expect(validation).toBeTruthy();
    });
  });
});
