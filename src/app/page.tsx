import { RedirectToSignUp, SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      Stop buying games more than once! <br />
      Make a list! Check the list! <br />
      The list is your new god!
    </main>
  );
}
