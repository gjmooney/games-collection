import HeaderText from "@/components/animations/HeaderText";
import ManualAddForm from "@/components/update/ManualAddForm";
import StoreCard from "@/components/update/StoreCard";
import { storeFronts } from "@/lib/constants";

interface pageProps {}

const page = async ({}: pageProps) => {
  //TODO: refactor mutation out here? can share isLoading to disable all buttons
  return (
    <main className="px-16 flex flex-col items-center justify-center">
      <div className="flex">
        <HeaderText title="Update" className="relative mb-2" />
      </div>
      <h2 className="w-fit mx-auto mb-16 text-sm text-muted-foreground">
        Update your game library here.
      </h2>
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
      <ManualAddForm className="mt-16 text-center w-full" />
    </main>
  );
};

export default page;
