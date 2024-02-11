import {useState} from "react";
import {Outlet} from "react-router-dom";
import {type IUserData} from "../../common/interfaces/user";
import {Footer, Header} from "../../components/layout";

const Layout = (): JSX.Element => {
  const [userData] = useState<IUserData>();

  return (
    <div className="container mx-auto flex flex-col min-h-screen bg-white">
      <Header user={userData} />
      <main className="flex flex-grow flex-col items-center justify-start p-4">
        <Outlet />
      </main>
      <Footer image={false} user={userData} />
    </div>
  );
};

export default Layout;
