import CookiesForm from "@/components/CookiesForm";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main className="flex justify-center items-center">
      <CookiesForm />
    </main>
  );
};

export default page;
