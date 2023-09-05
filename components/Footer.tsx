import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full items-center justify-between border-t-2 border-solid p-8 text-lg font-medium md:flex-row">
      <span className="">
        {new Date().getFullYear()} &copy; All Rights Reserved.
      </span>
      <div className="flex items-center py-2 md:py-0">
        Built with&nbsp;
        <span className="text-2xl text-accent">&#9825;</span>
        &nbsp;by&nbsp;
        <Link
          className="underline underline-offset-[6px]"
          href="https://github.com/gjmooney"
          target="_blank"
        >
          Greg
        </Link>
      </div>
      <Link className="" href="/">
        {/* TODO: link to contact form? */}
        Say Hello
      </Link>
    </footer>
  );
};
export default Footer;
