import { cn } from "@/lib/utils";

interface HeaderTextProps {
  title: string;
  className?: string;
}

const HeaderText = ({ title, className }: HeaderTextProps) => {
  return (
    <h1
      className={cn(
        "text-8xl capitalize h-28 bg-gradient-to-r from-accent to-primary dark:from-primary dark:to-secondary bg-clip-text text-transparent w-fit mx-auto mb-16",
        className
      )}
    >
      {title}
    </h1>
  );
};

export default HeaderText;
