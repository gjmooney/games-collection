import StoreCard from "@/components/update/StoreCard";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

interface pageProps {}

const page = ({}: pageProps) => {
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
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {storeFronts.map((store) => (
          <StoreCard
            key={store.storeName}
            storeName={store.storeName}
            imageUrl={store.imageUrl}
            region={store.region}
            apiUrlEndpoint={store.apiUrlEndpoint}
          />
        ))}
      </SignedIn>
    </main>
  );
};

export default page;
