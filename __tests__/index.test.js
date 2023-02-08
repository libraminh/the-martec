import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Home from "../pages";

const user = userEvent.setup();

describe("Home Test", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  beforeEach(() => {
    render(<Home />);
  });

  it("loads and displays greeting text", async () => {
    expect(
      screen.getByText(/please to get your information\./i)
    ).toBeInTheDocument();
  });

  it("could type the github input", async () => {
    await user.type(screen.getByPlaceholderText(/username/i), "libraminh");
    expect(screen.getByPlaceholderText(/username/i).value).toBe("libraminh");
  });
});
