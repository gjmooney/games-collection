import StoreCard from "@/components/update/StoreCard";

interface pageProps {}

const page = async ({}: pageProps) => {
  const storeFronts = [
    {
      storeName: "steam",
      imageUrl: "",
      apiUrlEndpoint: "steam",
    },
    {
      storeName: "humble",
      imageUrl: "",
      apiUrlEndpoint: "humble",
    },
    {
      storeName: "nintendo",
      imageUrl: "",
      apiUrlEndpoint: "nintendo",
    },
    {
      storeName: "playstation",
      region: "US",
      imageUrl: "",
      apiUrlEndpoint: "playstation-us",
    },
    {
      storeName: "playstation",
      region: "EU",
      imageUrl: "",
      apiUrlEndpoint: "playstation-eu",
    },
  ];

  return (
    <main className="flex gap-9 items-center flex-wrap justify-around">
      {storeFronts.map((store) => (
        <StoreCard
          key={store.storeName}
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
