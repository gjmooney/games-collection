import HeaderText from "@/components/animations/HeaderText";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <HeaderText title="BuyWise" />
      <p>
        Stop buying games more than once! <br />
        Make a list! Check the list! <br />
        The list is your new god!
      </p>
    </main>
  );
}
