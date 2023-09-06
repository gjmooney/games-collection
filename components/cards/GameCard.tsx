import { GameInfo } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const GameCard = ({ name, store, platform, imgUrl }: GameInfo) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>cute lil icon for {platform}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>image or placeholder</p>
      </CardContent>
      <CardFooter>From {store}</CardFooter>
    </Card>
  );
};
export default GameCard;
