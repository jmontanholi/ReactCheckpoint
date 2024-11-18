import formatNumberWithUserLocale from "./numberFormater";

test("format number correctly using en-US location", () => {
  expect(formatNumberWithUserLocale(9.99)).toBe("€9.99");
});

test("format large numbers correctly", () => {
  expect(formatNumberWithUserLocale(149999.99)).toBe("€149,999.99");
});
