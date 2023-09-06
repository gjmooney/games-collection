import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

//TODO get type from db schema
interface GameInfo {
  game: {
    title: string;
    store: string;
    platform: string;
    imgUrl: string;
  };
}

const GameCard = ({ game }: GameInfo) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{game.title}</CardTitle>
        <CardDescription>cute lil icon for {game.platform}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>image or placeholder</p>
      </CardContent>
      <CardFooter>From {game.store}</CardFooter>
    </Card>
  );
};
export default GameCard;
