import {useCallback, useEffect, useState} from "react";
import {Outlet, useOutletContext, useNavigate} from "react-router-dom";
import {type IUserData} from "../../common/interfaces/user";
import {ROUTES} from "../../common/constants";
import {getCurrentUser} from "../../services/auth";
import {Footer, Header} from "../../components/layout";

interface ContextType {
  userData: IUserData | undefined;
}

const Layout = (): JSX.Element => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<IUserData | undefined>();

  const verifyUser = useCallback(async () => {
    const currentUser = await getCurrentUser();
    if (currentUser && (currentUser?.data as IUserData)?.id) {
      setUserData(currentUser.data as IUserData);
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.HOME);
    }
  }, []);

  useEffect(() => {
    void verifyUser();
  }, [verifyUser]);

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
