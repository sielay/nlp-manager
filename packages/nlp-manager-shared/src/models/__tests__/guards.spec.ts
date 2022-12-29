
import { ModelType } from "../../types/models";
import { guessDataType } from "../guards";

describe("shared/modles/guards", () => {
  it("guessDataType", async () => {
    expect(
      guessDataType(
        require("../nlp/corpus/__tests__/corpus-en.mock.json"),
        "application/json"
      )
    ).toBe(ModelType.NLP_CORPUS);
    expect(guessDataType({}, "application/json")).toBe(ModelType.UNKNOWN);
  });
});
