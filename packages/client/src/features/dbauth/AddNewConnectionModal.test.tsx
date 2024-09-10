import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest"; // Use Vitest's functions instead of Jest's
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddNewConnectionModal } from "./AddNewConnectionModal"; // Adjust the path as per your structure
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
/**
 * @vitest-environment jsdom
 */

// Mock the hooks
vi.mock("@/context/auth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(),
}));

describe("AddNewConnectionModal", () => {
  const mockToast = { toast: vi.fn() };
  const mockConnect = vi.fn();

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({ connect: mockConnect });
    (useToast as Mock).mockReturnValue(mockToast);
    (useMutation as Mock).mockReturnValue({
      mutateAsync: vi.fn(),
      mutate: vi.fn(),
      isPending: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal and form fields correctly", () => {
    render(<AddNewConnectionModal />);

    fireEvent.click(screen.getByTestId("add-db-btn")); // Simulate clicking the tooltip button to open the modal

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Host/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Port/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Database/i)).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", async () => {
    const mockMutateAsync = vi.fn().mockResolvedValueOnce({});
    const mockMutate = vi.fn().mockResolvedValueOnce({});
    (useMutation as Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      mutate: mockMutate,
      isPending: false,
      isSuccess: true,
    });

    render(<AddNewConnectionModal />);

    fireEvent.click(screen.getByTestId("add-db-btn")); // Simulate clicking the tooltip button to open the modal

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "testpass" },
    });
    fireEvent.change(screen.getByLabelText(/Host/i), {
      target: { value: "localhost" },
    });
    fireEvent.change(screen.getByLabelText(/Port/i), {
      target: { value: 5432 },
    });
    fireEvent.change(screen.getByLabelText(/Database/i), {
      target: { value: "testdb" },
    });

    fireEvent.click(screen.getByTestId("connect-db-btn")); // Simulate clicking the tooltip button to open the modal

    await waitFor(() =>
      expect(mockMutateAsync).toHaveBeenCalledWith({
        dbuser: "testuser",
        dbpassword: "testpass",
        host: "localhost",
        port: 5432,
        database: "testdb",
      })
    );

    // NOTE: This is causing error, we need to find another way to test this
    await waitFor(() =>
      expect(mockToast.toast).toHaveBeenCalledWith({
        title: "Connected with Postgres Database",
        variant: "success",
      })
    );

    await waitFor(() => {
      expect(
        screen.queryByTestId("add-new-connection-form")
      ).not.toBeInTheDocument();
    });
  });

  it("shows error toast on form submission failure", async () => {
    const mockMutateAsync = vi
      .fn()
      .mockRejectedValueOnce(new Error("Connection failed"));
    (useMutation as Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    render(<AddNewConnectionModal />);

    fireEvent.click(screen.getByTestId("add-db-btn")); // Simulate clicking the tooltip button to open the modal

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "testpass" },
    });
    fireEvent.change(screen.getByLabelText(/Host/i), {
      target: { value: "localhost" },
    });
    fireEvent.change(screen.getByLabelText(/Port/i), {
      target: { value: 5432 },
    });
    fireEvent.change(screen.getByLabelText(/Database/i), {
      target: { value: "testdb" },
    });

    fireEvent.click(screen.getByTestId("connect-db-btn"));

    await waitFor(() =>
      expect(mockMutateAsync).toHaveBeenCalledWith({
        dbuser: "testuser",
        dbpassword: "testpass",
        host: "localhost",
        port: 5432,
        database: "testdb",
      })
    );

    // NOTE: This is causing error, we need to find another way to test this
    await waitFor(() =>
      expect(mockToast.toast).toHaveBeenCalledWith({
        title: "Unable to connect with Postgres Database",
        description: "Connection failed",
        variant: "destructive",
      })
    );

    await waitFor(() => {
      expect(screen.getByTestId("add-new-connection-form")).toBeInTheDocument();
    });
  });

  it("shows loading spinner when isPending is true", () => {
    (useMutation as Mock).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
    });

    render(<AddNewConnectionModal />);

    fireEvent.click(screen.getByTestId("add-db-btn")); // Simulate clicking the tooltip button to open the modal

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument(); // Assuming the spinner has this data-testid
  });
});
