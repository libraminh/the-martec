import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Register from "../pages/register";

jest.mock("next/router", () => require("next-router-mock"));

const user = userEvent.setup();

describe("Register Page", () => {
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
    render(<Register />);
  });

  it("register success, show thank you message", async () => {
    await user.type(screen.getByPlaceholderText(/first name/i), "minh");
    await user.type(screen.getByPlaceholderText(/last name/i), "le");
    await user.type(screen.getByTestId(/email/i), "libraminh@gmail.com");
    await user.type(screen.getByTestId("password"), "1234");
    await user.type(screen.getByTestId("confirmPassword"), "1234");
    await user.click(screen.getByTestId("register"));

    expect(screen.getByText(/register sucessfully!/i)).toBeInTheDocument();
  });
});
