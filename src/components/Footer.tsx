import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-16 flex flex-col items-center justify-between border-t-2 border-accent/20 p-8 text-lg font-medium md:flex-row">
      <span className="">
        {new Date().getFullYear()} &copy; All Rights Reserved.
      </span>
      <div className="flex items-center py-2 md:py-0">
        Built with&nbsp;
        <span className="text-2xl text-[#F2B2A8]">&#9825;</span>
        &nbsp;by&nbsp;
        <Link
          className="underline underline-offset-[6px]"
          href="https://github.com/gjmooney"
          target="_blank"
        >
          Greg
        </Link>
      </div>
      <Link className="" href="/contact">
        Say Hello
      </Link>
    </footer>
  );
};
export default Footer;
