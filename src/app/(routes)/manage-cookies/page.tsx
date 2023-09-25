import CookiesForm from "@/components/CookiesForm";
import HeaderText from "@/components/animations/HeaderText";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main className="flex flex-col justify-center items-center">
      <HeaderText title="Manage your cookies" className="text-7xl" />
      <CookiesForm />
    </main>
  );
};

export default page;
