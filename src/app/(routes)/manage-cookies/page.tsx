import CookiesForm from "@/components/CookiesForm";
import HeaderText from "@/components/animations/HeaderText";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main className="flex flex-col ">
      <HeaderText title="Manage your cookies" className="text-7xl mb-10" />
      <CookiesForm />
    </main>
  );
};

export default page;
