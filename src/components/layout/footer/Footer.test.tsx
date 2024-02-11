import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type FooterProps} from "../../../common/interfaces/components";
import {PTBR} from "../../../common/constants";
import Footer from "./Footer";

describe("Footer", () => {
  const setupComponent = (props: FooterProps = {}): void => {
    render(
      <MemoryRouter>
        <Footer {...props} />
      </MemoryRouter>,
    );
  };

  test("Footer should have text, LoginButton, and should not have image", async () => {
    setupComponent();
    expect(screen.getByText(`${PTBR.COMPONENTS.HERO.TITLE} ${PTBR.COMPONENTS.HERO.SUBTITLE}`)).toBeInTheDocument();
    expect(screen.getByText(String(process.env.REACT_APP_SITE_TITLE))).toBeInTheDocument();
    expect(screen.getByText(PTBR.COMPONENTS.LOGINBUTTON.TEXT)).toBeInTheDocument();
    expect(screen.queryByAltText("Logo")).toBeNull();
  });

  test("Footer should have image and not have LoginButton", async () => {
    setupComponent({
      image: true,
      user: {
        id: "49c88ac9-77cd-49d7-9311-25987fce2086",
        name: "Test User",
        email: "test@teste.com",
        verified: true,
      },
    });
    expect(screen.queryByText(PTBR.COMPONENTS.LOGINBUTTON.TEXT)).not.toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });
});
