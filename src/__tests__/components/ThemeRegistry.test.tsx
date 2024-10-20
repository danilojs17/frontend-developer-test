import { render, screen, fireEvent } from "@testing-library/react";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry"; // Ajusta la ruta según tu estructura
import "@testing-library/jest-dom"; // Para los matchers como toBeInTheDocument

describe("ThemeRegistry Component", () => {
  const renderComponent = () =>
    render(
      <ThemeRegistry>
        <div>Content</div>
      </ThemeRegistry>
    );

  beforeEach(() => {
    // Limpiar el localStorage antes de cada test
    localStorage.clear();
  });

  it("applies light theme by default", () => {
    renderComponent();

    // Verifica que el icono de DarkMode (modo oscuro) esté presente, lo que indica que estamos en modo claro
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
  });

  it("loads dark mode if it's saved in localStorage", () => {
    // Establece el tema oscuro en localStorage
    localStorage.setItem("theme", "dark");

    renderComponent();

    // Verifica que el icono de WbSunny (modo claro) esté presente, lo que indica que estamos en modo oscuro
    expect(screen.getByTestId("WbSunnyIcon")).toBeInTheDocument();
  });

  it("toggles between dark and light modes", () => {
    renderComponent();

    // Verifica que al inicio estamos en modo claro (icono de modo oscuro está presente)
    const toggleButton = screen.getByRole("button");
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();

    // Simula un clic en el botón de alternar
    fireEvent.click(toggleButton);

    // Verifica que cambiamos a modo oscuro (icono de modo claro está presente)
    expect(screen.getByTestId("WbSunnyIcon")).toBeInTheDocument();

    // Verifica que el localStorage fue actualizado
    expect(localStorage.getItem("theme")).toBe("dark");

    // Simula otro clic para cambiar de vuelta a modo claro
    fireEvent.click(toggleButton);

    // Verifica que estamos de vuelta en modo claro (icono de modo oscuro está presente)
    expect(screen.getByTestId("DarkModeIcon")).toBeInTheDocument();
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
