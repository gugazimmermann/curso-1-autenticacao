import {useState} from "react";
import {Outlet, useOutletContext} from "react-router-dom";
import {type IUserData} from "../../common/interfaces/user";
import {Footer, Header} from "../../components/layout";

interface ContextType {
  userData: IUserData | undefined;
}

const Layout = (): JSX.Element => {
  const [userData] = useState<IUserData | undefined>();

  return (
    <div className="container mx-auto flex flex-col min-h-screen bg-white">
      <Header user={userData} />
      <main className="flex flex-grow flex-col items-center justify-start p-4">
        <Outlet context={{userData}} />
      </main>
      <Footer image={false} user={userData} />
    </div>
  );
};

export const useUser = (): ContextType => {
  return useOutletContext<ContextType>();
};

export default Layout;
