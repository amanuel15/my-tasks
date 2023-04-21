import { describe, expect, vi, beforeEach, it } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import AddTask from "./components/Tasks/AddTask";

describe("AddTask", () => {
  const createTask = vi.fn();

  beforeEach(() => {
    createTask.mockClear();
  });

  it("renders the component with the correct form elements", () => {
    render(<AddTask createTask={createTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    expect(titleInput).toBeDefined();
    expect(descriptionInput).toBeDefined();
    expect(addButton).toBeDefined();
  });

  it("calls the createTask function when the form is submitted with valid inputs", () => {
    render(<AddTask createTask={createTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(titleInput, { target: { value: "Task Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Task description." },
    });
    fireEvent.click(addButton);

    expect(createTask).toHaveBeenCalledTimes(1);
    expect(createTask).toHaveBeenCalledWith({
      title: "Task Title",
      description: "Task description.",
    });
  });

  it("does not call the createTask function when the form is submitted with empty title", () => {
    render(<AddTask createTask={createTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(descriptionInput, {
      target: { value: "Task description." },
    });
    fireEvent.click(addButton);

    expect(createTask).not.toHaveBeenCalled();
  });

  it("shows a success message when a task is successfully added", () => {
    render(<AddTask createTask={createTask} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(titleInput, { target: { value: "Task Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Task description." },
    });
    fireEvent.click(addButton);

    const successMessage = screen.getByText(/successfully added task/i);

    expect(successMessage).toBeDefined();
  });
});
