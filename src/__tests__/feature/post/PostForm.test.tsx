import PostForm from "@/features/post/components/PostForm";
import { IPost } from "@/features/post/interfaces/Post";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("PostForm Component", () => {
  const mockOnSubmit = jest.fn().mockResolvedValue(true);

  const defaultPost: IPost = {
    title: "Título por defecto",
    body: "Cuerpo por defecto",
    userId: 1,
    id: 1,
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("debería renderizar los campos correctamente", () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText("Nombre");
    const bodyInput = screen.getByLabelText("Cuerpo");

    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
  });

  it("debería mostrar un error cuando el título está vacío", async () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    const form = screen.getByTestId("form-post");

    // Simula el envío del formulario sin llenar el campo de título
    fireEvent.submit(form);

    const errorMessage = await screen.findByText("El título es requerido");
    expect(errorMessage).toBeInTheDocument();
  });

  it("debería llamar a onSubmit con los datos correctos", async () => {
    render(<PostForm onSubmit={mockOnSubmit} post={defaultPost} />);

    const titleInput = screen.getByLabelText("Nombre");
    const bodyInput = screen.getByLabelText("Cuerpo");

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Nuevo Título");
    await userEvent.clear(bodyInput);
    await userEvent.type(bodyInput, "Nuevo Cuerpo");

    const form = screen.getByTestId("form-post");

    // Simula el envío del formulario
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: "Nuevo Título",
        body: "Nuevo Cuerpo",
        userId: 1,
        id: 1,
      });
    });
  });
});
