import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom"; // Importar para tener los matchers adicionales como toBeInTheDocument

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  it("renders the loading state and redirects", () => {
    // Mock de router.push
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });

    // Renderiza el componente
    render(<HomePage />);

    // Verifica que el contenido de la página se muestra correctamente
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Verifica que router.push haya sido llamado con "/post"
    expect(mockRouterPush).toHaveBeenCalledWith("/post");
  });
});
