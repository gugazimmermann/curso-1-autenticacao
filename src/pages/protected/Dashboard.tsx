import {PTBR} from "../../common/constants";
import {Title} from "../../components/layout";
import {useUser} from "../layout/Layout";

const Dashboard = (): JSX.Element => {
  const {userData} = useUser();

  return (
    <section className="w-full">
      <Title title={PTBR.PAGES.DASHBOARD.TITLE} />
      {userData && <h2>{`${PTBR.PAGES.DASHBOARD.WELCOME} ${userData.name}`}</h2>}
    </section>
  );
};

export default Dashboard;
