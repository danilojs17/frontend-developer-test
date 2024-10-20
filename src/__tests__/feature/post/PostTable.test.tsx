import PostTable from "@/features/post/components/PostTable";
import { usePostContext } from "@/features/post/context/post.context";
import { useDeletePost } from "@/features/post/hooks/useDeletePost";
import { IPost } from "@/features/post/interfaces/Post";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock de los hooks
jest.mock("@/features/post/context/post.context", () => ({
  usePostContext: jest.fn(),
}));

jest.mock("@/features/post/hooks/useDeletePost", () => ({
  useDeletePost: jest.fn(),
}));

describe("PostTable Component", () => {
  const mockOnDeletePost = jest.fn();

  const defaultPosts: IPost[] = [
    { id: 1, title: "Post 1", body: "Body 1", userId: 1 },
    { id: 2, title: "Post 2", body: "Body 2", userId: 2 },
  ];

  const mockDeletePost = jest.fn().mockResolvedValue({ status: 200 });

  beforeEach(() => {
    // Mock del contexto
    (usePostContext as jest.Mock).mockReturnValue({
      setPostSelected: jest.fn(),
      setOpenModalUpdate: jest.fn(),
      dispatchPost: jest.fn(),
    });

    // Mock del hook de eliminación
    (useDeletePost as jest.Mock).mockReturnValue({
      mutateAsync: mockDeletePost,
    });

    mockOnDeletePost.mockClear();
  });

  it("debería renderizar la tabla correctamente con los datos", () => {
    render(<PostTable post={defaultPosts} isLoading={false} onDeletePost={mockOnDeletePost} />);

    // Verificar si se muestran las filas de los posts
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Body 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Body 2")).toBeInTheDocument();
  });

  it("debería abrir el modal de edición al hacer clic en el botón de editar", () => {
    const setPostSelected = jest.fn();
    const setOpenModalUpdate = jest.fn();

    (usePostContext as jest.Mock).mockReturnValue({
      setPostSelected,
      setOpenModalUpdate,
      dispatchPost: jest.fn(),
    });

    render(<PostTable post={defaultPosts} isLoading={false} onDeletePost={mockOnDeletePost} />);

    const editButton = screen.getAllByLabelText("Editar")[0]; // Primer botón de editar
    fireEvent.click(editButton);

    expect(setPostSelected).toHaveBeenCalledWith(defaultPosts[0]);
    expect(setOpenModalUpdate).toHaveBeenCalledWith(true);
  });

  it("debería llamar a onDeletePost al hacer clic en el botón de eliminar", async () => {
    render(<PostTable post={defaultPosts} isLoading={false} onDeletePost={mockOnDeletePost} />);

    const deleteButton = screen.getAllByLabelText("Eliminar")[0]; // Primer botón de eliminar
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockOnDeletePost).toHaveBeenCalledWith({
        title: "Eliminar post",
        message: "¿Estás seguro de que quieres eliminar el post #1?",
        onClick: expect.any(Function),
      });
    });
  });
});
