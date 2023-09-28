import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PlatformFilterProps {
  className?: string;
  setFilter: (filter: string) => void;
}

const PlatformFilter = ({ className, setFilter }: PlatformFilterProps) => {
  return (
    <div className={className}>
      <Select onValueChange={setFilter} defaultValue="All">
        <SelectTrigger className="">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="PC">PC</SelectItem>
          <SelectItem value="Switch">Switch</SelectItem>
          <SelectItem value="PS4">PS4</SelectItem>
          <SelectItem value="PS5">PS5</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlatformFilter;
