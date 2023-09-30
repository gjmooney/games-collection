import Image from "next/image";
import Link from "next/link";
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
  // strip punctuation, collapse spaces, and replace spaces with dashes
  const nameForLink = gameName
    .replace(/[.,\/#!$%\^&\*;:{}='_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/ /g, "-")
    .toLowerCase();

  return (
    <Link href={`https://www.igdb.com/games/${nameForLink}`}>
      <Card>
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
    </Link>
  );
};

export default GameCard;
