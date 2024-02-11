import {render, screen} from "@testing-library/react";
import {type CardProps} from "../../common/interfaces/components";
import Card from "./Card";

describe("Card", () => {
  const renderCard = (title: string, color: CardProps["color"]): void => {
    render(
      <Card title={title} color={color}>
        <h1>Card Content</h1>
      </Card>,
    );
  };

  const checkCardRendering = (title: string, colorClass: string): void => {
    expect(screen.getByText(title).closest("div")).toHaveClass(colorClass);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  };

  it("Card have title, default color a and children", () => {
    renderCard("Default Color", undefined);
    checkCardRendering("Default Color", "bg-white");
  });

  const testCases: Array<[CardProps["color"], string]> = [
    ["primary", "bg-primary-100"],
    ["secondary", "bg-secondary-100"],
    ["success", "bg-success-100"],
    ["info", "bg-info-100"],
    ["warning", "bg-warning-100"],
    ["danger", "bg-danger-100"],
  ];

  it.each(testCases)(
    "Card have title, %s color a and children",
    (color: CardProps["color"], colorClass: string): void => {
      renderCard(String(color), color);
      checkCardRendering(String(color), colorClass);
    },
  );
});
