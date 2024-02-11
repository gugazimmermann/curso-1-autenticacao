import {screen} from "@testing-library/react";
import {type FooterProps} from "../../../common/interfaces/components";
import {componentSetup, useAuthMock} from "../../../tests-setup";
import {PTBR} from "../../../common/constants";
import Footer from "./Footer";

describe("Footer", () => {
  const setupComponent = (props: FooterProps = {}): void => {
    componentSetup({component: <Footer {...props} />});
  };

  test("Footer should have text, LoginButton, and should not have image", async () => {
    useAuthMock.mockReturnValue({state: {user: null}});
    setupComponent();
    expect(screen.getByText(`${PTBR.COMPONENTS.HERO.TITLE} ${PTBR.COMPONENTS.HERO.SUBTITLE}`)).toBeInTheDocument();
    expect(screen.getByText(String(process.env.REACT_APP_SITE_TITLE))).toBeInTheDocument();
    expect(screen.getByText(PTBR.COMPONENTS.LOGINBUTTON.TEXT)).toBeInTheDocument();
    expect(screen.queryByAltText("Logo")).toBeNull();
  });

  test("Footer should have image and not have LoginButton", async () => {
    useAuthMock.mockReturnValue({state: {user: LOGGEDUSER}});
    setupComponent({image: true});
    expect(screen.queryByText(PTBR.COMPONENTS.LOGINBUTTON.TEXT)).not.toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });
});
