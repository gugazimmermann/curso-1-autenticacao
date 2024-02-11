import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type LogoProps} from "../../../common/interfaces/components";
import Logo from "./Logo";

describe("Logo", () => {
  const setupComponent = (props: LogoProps = {}): void => {
    render(
      <MemoryRouter>
        <Logo {...props} />
      </MemoryRouter>,
    );
  };

  test("Logo should have title and should not have image", async () => {
    setupComponent();
    expect(screen.getByText(String(process.env.REACT_APP_SITE_TITLE))).toBeInTheDocument();
    expect(screen.queryByAltText("logo")).toBeNull();
  });

  test("Logo should have image", async () => {
    setupComponent({image: true});
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });
});
