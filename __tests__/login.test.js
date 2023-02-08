import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../pages/login";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));

const user = userEvent.setup();

const btnLogin = screen.getByRole("button", {
  name: /log in/i,
});
const inputEmail = screen.getByPlaceholderText(/email/i);
const passwordEmail = screen.getByPlaceholderText(/password/i);

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

  it("button login disable at start", async () => {
    expect(btnLogin).toBeDisabled();
  });

  it("button login not disable when put fields value", async () => {
    const btnLogin = screen.getByRole("button", {
      name: /log in/i,
    });
    await user.type(inputEmail, "libraminh@gmail.com");
    await user.type(passwordEmail, "lee123");
    expect(btnLogin).not.toBeDisabled();
  });

  it("login success, redirect to home", async () => {
    const btnLogin = screen.getByRole("button", {
      name: /log in/i,
    });
    await user.type(inputEmail, "libraminh@gmail.com");
    await user.type(passwordEmail, "lee123");
    await user.click(btnLogin);
    expect(mockRouter).toMatchObject({
      pathname: "",
    });
  });
});
