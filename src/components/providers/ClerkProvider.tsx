import { ClerkProvider as Clerk } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Clerk
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "hsl(130, 6%, 62%)",
          colorTextOnPrimaryBackground: "hsl(300, 7%, 3%)",
        },
      }}
    >
      {children}
    </Clerk>
  );
};
export default ClerkProvider;
