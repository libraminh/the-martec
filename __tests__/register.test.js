import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../pages/register";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";

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

  // const emailInput = screen.getByTestId(/email/i);
  // const passwordInput = screen.getByPlaceholderText(/password/i);
  // const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
  // const firstnameInput = screen.getByPlaceholderText(/first name/i);
  // const lastnameInput = screen.getByPlaceholderText(/last name/i);
  // const registerButton = screen.getByRole("button", {
  //   name: /register/i,
  // });

  it("register success, redirect to login", async () => {
    await user.type(screen.getByPlaceholderText(/first name/i), "minh");
    await user.type(screen.getByPlaceholderText(/last name/i), "le");
    await user.type(screen.getByTestId(/email/i), "libraminh@gmail.com");
    await user.type(screen.getByTestId("password"), "1234");
    await user.type(screen.getByTestId("confirmPassword"), "1234");
    await user.click(screen.getByTestId("register"));

    await waitFor(() =>
      expect(mockRouter).toMatchObject({
        pathname: "/login",
      })
    );
  });
});
