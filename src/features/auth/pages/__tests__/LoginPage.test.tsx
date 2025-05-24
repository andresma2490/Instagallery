import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  useAuth,
  type AuthContextType,
  type LoginCredentials,
} from "@/contexts/AuthContext";
import LoginPage from "../LoginPage";

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));
const mockUseAuth = useAuth as MockedFunction<typeof useAuth>;

describe("LoginPage", () => {
  const useAuthMockedValue: AuthContextType = {
    authToken: null,
    tokenRef: { current: null },
    isLoading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue(useAuthMockedValue);
  });

  it("renders the login form", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("prevents login when username or password is empty", async () => {
    const testCases = [
      { username: "", password: "" },
      { username: "admin", password: "" },
      { username: "", password: "123456" },
    ];
    const mockLogin = vi.fn(() => Promise.resolve());
    mockUseAuth.mockReturnValue({
      ...useAuthMockedValue,
      login: mockLogin,
    });
    render(<LoginPage />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    testCases.forEach(({ username, password }) => {
      fireEvent.change(usernameInput, { target: { value: username } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.click(loginButton);

      expect(usernameInput).toHaveValue(username);
      expect(passwordInput).toHaveValue(password);
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  it("calls login with username and password on submit", async () => {
    const mockLogin = vi.fn(() => Promise.resolve());
    const loginCredentials: LoginCredentials = {
      username: "admin",
      password: "123456",
    };
    const { username, password } = loginCredentials;
    mockUseAuth.mockReturnValue({
      ...useAuthMockedValue,
      login: mockLogin,
    });
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith(loginCredentials);
  });

  it("disables the button while login is in progress", async () => {
    mockUseAuth.mockReturnValue({
      ...useAuthMockedValue,
      isLoading: true,
    });
    render(<LoginPage />);
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(loginButton).toBeDisabled();
    expect(screen.getByText(/authenticating/i)).toBeInTheDocument();
  });

  it("shows error message", async () => {
    const error = "Invalid username or password.";
    mockUseAuth.mockReturnValue({
      ...useAuthMockedValue,
      error,
    });
    render(<LoginPage />);

    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
