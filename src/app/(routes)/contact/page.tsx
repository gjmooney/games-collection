import ContactForm from "@/components/ContactForm";
import HeaderText from "@/components/animations/HeaderText";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main className="flex flex-col justify-center items-center">
      <HeaderText title="Say Hi!" />
      <ContactForm />;
    </main>
  );
};

export default page;
