import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/login";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => require("next-router-mock"));

const user = userEvent.setup();

function getEmailInput() {
  return screen.getByPlaceholderText(/email/i);
}

function getPasswordInput() {
  return screen.getByPlaceholderText(/password/i);
}

describe("Login Page", () => {
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
    render(<Login />);
  });

  it("show email input", async () => {
    expect(getEmailInput()).toBeInTheDocument();
  });

  it("could type the email", async () => {
    await user.type(getEmailInput(), "libraminh");
    expect(getEmailInput().value).toBe("libraminh");
  });

  it("show passsword input", async () => {
    expect(getPasswordInput()).toBeInTheDocument();
  });

  it("could type the password", async () => {
    await user.type(getPasswordInput(), "lee123");
    expect(getPasswordInput().value).toBe("lee123");
  });
});
