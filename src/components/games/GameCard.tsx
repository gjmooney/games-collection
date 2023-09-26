import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface GameCardProps {
  gameName: string;
  store: string;
  platform: string;
  imgUrl?: string | null;
}

/** TODO: PS5 img links from agst.prod.dl host are jacked up because their certs are no good.
 * so check on that in the future.
 */
const GameCard = ({ gameName, imgUrl, platform, store }: GameCardProps) => {
  return (
    <div className="relative z-0">
      <Card className="z-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-4 text-lg">
            {platform !== "PS5" && imgUrl ? (
              <Image
                src={imgUrl}
                alt="game image"
                width={24}
                height={24}
                className="rounded-md"
                onError={(error) => {
                  console.log("error", error);
                }}
              />
            ) : null}{" "}
            {gameName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Platform: {platform}</p>
          <p className="text-sm text-muted-foreground">From {store}</p>
        </CardContent>
      </Card>

      <div className="absolute -right-2 top-0 -z-10 h-[103%] w-[101%] rounded-[2rem] bg-primary rounded-b-2xl" />
    </div>
  );
};

export default GameCard;
