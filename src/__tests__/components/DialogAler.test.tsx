import { render, screen, fireEvent } from "@testing-library/react";
import DialogAlert from "@/components/dialog-alert/DialogAlert";
import "@testing-library/jest-dom"; // Para los matchers como toBeInTheDocument

describe("DialogAlert Component", () => {
  const mockOnClick = jest.fn();
  const mockOnCancel = jest.fn();

  const defaultProps = {
    message: "Are you sure you want to continue?",
    open: true,
    title: "Confirmation",
    onClick: mockOnClick,
    onCancel: mockOnCancel,
  };

  it("renders the dialog with correct title and message", () => {
    render(<DialogAlert {...defaultProps} />);

    // Verifica que el título y el mensaje están presentes
    expect(screen.getByText("Confirmation")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to continue?")).toBeInTheDocument();
  });

  it("calls onCancel when the Cancel button is clicked", () => {
    render(<DialogAlert {...defaultProps} />);

    // Simula el click en el botón "Cancelar"
    fireEvent.click(screen.getByText("Cancelar"));

    // Verifica que onCancel fue llamado
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("calls onClick and onCancel when the Confirm button is clicked", () => {
    render(<DialogAlert {...defaultProps} />);

    // Simula el click en el botón "Confirmar"
    fireEvent.click(screen.getByText("Confirmar"));

    // Verifica que onClick y onCancel fueron llamados
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("does not render the dialog when open is false", () => {
    render(<DialogAlert {...defaultProps} open={false} />);

    // Verifica que el diálogo no se renderiza cuando open es false
    expect(screen.queryByText("Confirmation")).toBeNull();
    expect(screen.queryByText("Are you sure you want to continue?")).toBeNull();
  });
});
