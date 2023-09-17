"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";

interface StoreCardProps {
  storeName: string;
  imageUrl: string;
}

const StoreCard = ({ storeName, imageUrl }: StoreCardProps) => {
  return (
    <Card className="border w-52 flex items-center justify-center flex-col">
      <CardHeader>
        <CardTitle>{storeName}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Update</Button>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
