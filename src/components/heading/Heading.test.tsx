import { render } from "@testing-library/react";
import Heading from "./Heading";

describe("Выберите тренировку", () => {
  it("При запуске компонента рендерится текст", () => {
    const text = "Выберите тренировку";

    const { getByText } = render(<Heading>{text}</Heading>);

    expect(getByText(text)).toBeInTheDocument();
  });
});
