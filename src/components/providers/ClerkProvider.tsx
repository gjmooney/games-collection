import { ClerkProvider as Clerk } from "@clerk/nextjs";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Clerk
      appearance={{
        elements: {
          card: "bg-card",
          headerTitle: "text-card-foreground",
          headerSubtitle: "text-card-foreground",
          socialButtonsBlockButton:
            "text-card-foreground border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-",
          socialButtonsIconButton__github: "text-card-foreground",
          dividerLine: "bg-card-foreground",
          dividerText: "text-card-foreground",
          formFieldLabel: "text-card-foreground",
          formFieldInput:
            "border-input bg-background/80 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          formButtonPrimary:
            "bg-primary text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          footerActionText:
            "text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-input",
        },
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
