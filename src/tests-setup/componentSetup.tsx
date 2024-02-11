import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {type ComponentSetupProps} from "./test-interfaces";
import {AuthProvider} from "../context/AuthContext";

export const componentSetup = ({component, initialEntries}: ComponentSetupProps): void => {
  const renderComponent = (): any => {
    return render(
      <AuthProvider>
        <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
      </AuthProvider>,
    );
  };
  renderComponent();
};
