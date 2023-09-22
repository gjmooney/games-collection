import StoreCard from "@/components/update/StoreCard";

interface pageProps {}

const page = async ({}: pageProps) => {
  const storeFronts = [
    {
      id: 1,
      storeName: "Steam",
      imageUrl: "",
      apiUrlEndpoint: "steam",
    },
    {
      id: 2,
      storeName: "Humble",
      imageUrl: "",
      apiUrlEndpoint: "humble",
    },
    {
      id: 3,
      storeName: "Nintendo",
      imageUrl: "",
      apiUrlEndpoint: "nintendo",
    },
    {
      id: 4,
      storeName: "Playstation",
      region: "US",
      imageUrl: "",
      apiUrlEndpoint: "playstation-us",
    },
    {
      id: 5,
      storeName: "Playstation",
      region: "EU",
      imageUrl: "",
      apiUrlEndpoint: "playstation-eu",
    },
    {
      id: 6,
      storeName: "Itch.io",
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
