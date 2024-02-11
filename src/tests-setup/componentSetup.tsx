import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type ComponentSetupProps} from "./test-interfaces";

export const componentSetup = ({component, initialEntries}: ComponentSetupProps): void => {
  const renderComponent = (): any => {
    return render(<MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>);
  };
  renderComponent();
};
