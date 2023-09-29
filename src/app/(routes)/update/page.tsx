import HeaderText from "@/components/animations/HeaderText";
import ManualAddForm from "@/components/update/ManualAddForm";
import StoreCard from "@/components/update/StoreCard";
import { storeFronts } from "@/lib/constants";

interface pageProps {}

const page = async ({}: pageProps) => {
  //TODO: refactor mutation out here? can share isLoading to disable all buttons
  return (
    <main className="flex flex-col ">
      <HeaderText title="Update" />
      <ManualAddForm />
      <div className="flex flex-row gap-9 items-center flex-wrap justify-around">
        {storeFronts.map(
          (store) =>
            store.storeName !== "Physical" && (
              <StoreCard
                key={store.id}
                storeName={store.storeName}
                imageUrl={store.imageUrl}
                region={store.region}
                apiUrlEndpoint={store.apiUrlEndpoint}
              />
            )
        )}
      </div>
    </main>
  );
};

export default page;
