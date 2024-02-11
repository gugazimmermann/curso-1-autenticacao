import AccountPassword from "./AccountPassword";
import AccountRegister from "./AccountRegister";

const Account = (): JSX.Element => {
  return (
    <section className="w-full flex flex-col md:flex-row justify-evenly gap-2">
      <AccountRegister />
      <AccountPassword />
    </section>
  );
};

export default Account;
