import Image from "next/image";
import Link from "next/link";

export default function UserLayout({ children }) {
  return (
        
      <div className="flex min-h-full flex-col justify-center ">
          <div className="bg-zinc-900">
            <Link href="/">
              <Image className="mx-auto pt-5" src="/altagracia.png" alt="altagracia-logo" width={500} height={104}/>
            </Link>
          </div>
          <div>{children}</div>
      </div>
  );
}
