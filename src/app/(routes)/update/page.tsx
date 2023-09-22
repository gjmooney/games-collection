import StoreCard from "@/components/update/StoreCard";

interface pageProps {}

const page = async ({}: pageProps) => {
  const storeFronts = [
    {
      id: 1,
      storeName: "steam",
      imageUrl: "",
      apiUrlEndpoint: "steam",
    },
    {
      id: 2,
      storeName: "humble",
      imageUrl: "",
      apiUrlEndpoint: "humble",
    },
    {
      id: 3,
      storeName: "nintendo",
      imageUrl: "",
      apiUrlEndpoint: "nintendo",
    },
    {
      id: 4,
      storeName: "playstation",
      region: "US",
      imageUrl: "",
      apiUrlEndpoint: "playstation-us",
    },
    {
      id: 5,
      storeName: "playstation",
      region: "EU",
      imageUrl: "",
      apiUrlEndpoint: "playstation-eu",
    },
    {
      id: 6,
      storeName: "itch.io",
      imageUrl: "",
      apiUrlEndpoint: "itch",
    },
  ];

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
