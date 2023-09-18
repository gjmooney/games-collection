import StoreCard from "@/components/update/StoreCard";

interface pageProps {}

const page = ({}: pageProps) => {
  const storeFronts = [
    {
      storeName: "steam",
      imageUrl: "",
    },
    {
      storeName: "humble",
      imageUrl: "",
    },
    {
      storeName: "nintendo",
      imageUrl: "",
    },
    {
      storeName: "playstation",
      region: "US",
      imageUrl: "",
    },
    {
      storeName: "playstation",
      region: "EU",
      imageUrl: "",
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
        />
      ))}
    </main>
  );
};

export default page;
