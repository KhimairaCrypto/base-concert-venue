import { render, screen } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import BandComponent from "@/pages/bands/[bandId]";

it("band component display correct band information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandComponent band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();
});

it("band component display error", async () => {
  render(<BandComponent band={null} error="missing band!" />);

  const heading = screen.getByRole("heading", {
    name: /missing band!/i,
  });
  expect(heading).toBeInTheDocument();
});
