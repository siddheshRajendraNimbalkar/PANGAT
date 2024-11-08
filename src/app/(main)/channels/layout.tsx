import NaveBar from "@/components/custom/NaveBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div className="dark:bg-[#1E1F22] dark:text-[#81848F] text-[#1E1F22] bg-[#DBDFE0] hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <NaveBar />
      </div>
      <main className="md:pl-[72px] h-full">
        {children}
      </main>
    </div>
  );
};

export default layout;