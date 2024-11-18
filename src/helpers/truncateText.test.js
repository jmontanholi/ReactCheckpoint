import { truncateText } from "./truncateText";

test("keeps text whole if it does not exceed maximum characters", () => {
  expect(truncateText("Hello there, how are you?", 25)).toBe(
    "Hello there, how are you?"
  );
});

test("truncates text if it exceeds maximum characters and returns it with three dots at the end", () => {
  expect(truncateText("Hello there, how are you?", 24)).toBe(
    "Hello there, how are you..."
  );
});
