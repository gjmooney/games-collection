import StoreCard from "@/components/update/StoreCard";
import { storeFronts } from "@/lib/constants";

interface pageProps {}

const page = async ({}: pageProps) => {
  return (
    <main className="flex gap-9 items-center flex-wrap justify-around">
      {storeFronts.map((store) => (
        <StoreCard
          key={store.id}
          storeName={store.storeName}
          imageUrl={store.imageUrl}
          region={store.region}
          apiUrlEndpoint={store.apiUrlEndpoint}
        />
      ))}
    </main>
  );
};

export default page;
