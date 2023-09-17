import StoreCard from "@/components/update/StoreCard";

interface pageProps {}

const page = ({}: pageProps) => {
  const storeFronts = [
    {
      storeName: "Steam",
      imageUrl: "",
    },
    {
      storeName: "Humble",
      imageUrl: "",
    },
    {
      storeName: "Nintendo",
      imageUrl: "",
    },
  ];

  const handleClick = () => {
    console.log("first");
  };

  return (
    <main className="flex gap-9 items-center justify-around">
      {storeFronts.map((store) => (
        <StoreCard
          key={store.storeName}
          storeName={store.storeName}
          imageUrl={store.imageUrl}
        />
      ))}
    </main>
  );
};

export default page;
