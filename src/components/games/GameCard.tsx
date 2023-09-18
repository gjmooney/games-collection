interface GameCardProps {
  gameName: string;
  platform: string;
  imgUrl: string;
  store: string;
}

const GameCard = ({ gameName, imgUrl, platform, store }: GameCardProps) => {
  return <div>GameCard</div>;
};

export default GameCard;
