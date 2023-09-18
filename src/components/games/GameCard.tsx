import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface GameCardProps {
  gameName: string;
  store: string;
  platform: string;
  imgUrl?: string | null;
}

const GameCard = ({ gameName, imgUrl, platform, store }: GameCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4 text-lg">
          {imgUrl ? (
            <Image src={imgUrl} alt="game image" width={24} height={24} />
          ) : null}{" "}
          {gameName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Platform: {platform}</p>
        <p className="text-sm text-muted-foreground">From {store}</p>
      </CardContent>
    </Card>
  );
};

export default GameCard;
