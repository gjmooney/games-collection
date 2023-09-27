import { ClerkProvider as Clerk } from "@clerk/nextjs";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <Clerk>{children}</Clerk>;
};
export default ClerkProvider;
