import { StrengthPipe } from "./strength.pipe"

// isolated test
describe("Strength pipe", () => {

  it("Should return value (weak) for value less than 10", () => {
    const thePipeIntense = new StrengthPipe();
    const result = thePipeIntense.transform(5);
    expect(result).toBe("5 (weak)");
  })


  it("Should return value (strong) for value more than 10 and less than 20", () => {
    const thePipeIntense = new StrengthPipe();
    const result = thePipeIntense.transform(15);
    expect(result).toBe("15 (strong)");
  })

})
