import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp redirectUrl="http://localhost:3000/api/new-user" />;
}
