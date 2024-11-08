import Image from "next/image";

export default function page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-2 left-2 flex items-center pd-4">
        <Image
          src="/discord-icon-256x256-w6icqf4y.webp"
          width={50}
          height={50}
          alt="Picture of the author"
        />
        <h1 className="text-lg pl-2 text-white  font-bold">DISCODE</h1>
      </div>
      <div className="h-full w-full   bg-indigo-500 flex">
        <div className="hidden bg-[url('/luis-villasmil-ITFwHdPEED0-unsplash.jpg')] bg-cover bg-center h-full w-3/5 p-4 md:flex flex-col justify-center">
          <h1 className="md:text-4xl text-white lg:text-5xl font-bold pt-4 pb-4">
            GROUP CHAT THAT’S ALL FUN GAMES
          </h1>
          <h4 className="font-medium text-white md:text-base lg:text-2xl">
            Discord is great for playing games and chilling with friends, <br />
            or even building a worldwide community. <br />
            Customize your own space to talk, play, and hang out.
          </h4>
        </div>
        <div className="h-full w-full md:w-2/5 flex justify-center items-center">
          {children}
        </div>
      </div>
    </>
  );
}
