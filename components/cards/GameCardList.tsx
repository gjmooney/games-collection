import GameCard from "./GameCard";

const GameCardList = () => {
  // mock data
  const gamesList = [
    {
      title: "A Short Hike",
      store: "Humble",
      platform: "PC",
      imgUrl:
        "https://hb.imgix.net/47f42809c950e0cd9ac0c0f95d6c73a6580e4467.png?auto=compress,format&s=db90b25ab3f26d9bffb850c0ab095e45",
    },
    {
      title: "Absolver",
      store: "Humble",
      platform: "PC",
      imgUrl: "",
    },
    {
      title: "ABZU",
      store: "Humble",
      platform: "PC",
      imgUrl: "",
    },
    {
      title: "The Adventure Pals",
      store: "Humble",
      platform: "PC",
      imgUrl: "",
    },
  ];

  return (
    <div className="flex gap-6 w-full h-full justify-center items-center">
      {gamesList.map((game) => {
        return <GameCard key={game.title} game={game} />;
      })}
    </div>
  );
};
export default GameCardList;
