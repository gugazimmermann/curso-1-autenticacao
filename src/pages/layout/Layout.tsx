import {Outlet} from "react-router-dom";
import {Footer, Header} from "../../components/layout";

const Layout = (): JSX.Element => {
  return (
    <div className="container mx-auto flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex flex-grow flex-col items-center justify-start p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
