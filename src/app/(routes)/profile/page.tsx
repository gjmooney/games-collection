import { UserProfile } from "@clerk/nextjs";

interface pageProps {}

const page = ({}: pageProps) => {
  return (
    <main className="flex items-center justify-center">
      <UserProfile />
    </main>
  );
};

export default page;
