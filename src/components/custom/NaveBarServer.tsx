"use client";
import { useEffect, useState } from "react";
import { findUserServer } from "@/actions/findUserServer";
import Image from "next/image";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { NaveTooll } from "./NaveTooll";

interface Server {
  id: string;
  imageUrl: string;
  name: string;
}

const NaveBarServer = () => {
  const [servers, setServers] = useState<Server[] | any>([]);
  const [error, setError] = useState<string | null | any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchServers = async () => {
      setLoading(true);
      const result = await findUserServer();

      if (!result.success || result.error) {
        setError(result.error || 'An unknown error occurred.');
      } else {
        setServers(result.servers);
      }
      setLoading(false);
    };

    fetchServers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <ScrollArea className=" rounded-md border h-[450px] bg-fixed no-scrollbar overflow-auto  w-full">
      <div>
      {servers.map((server: any) => (
        <div className="flex justify-between items-center rounded-sm">
          <div className={cn("w-2 relative top-2 dark:bg-white bg-zinc-700 ",
            params?.channelsId === server.id ? "h-[40px] rounded-r-sm" : null,
          )}>
           
          </div>
          <div key={server.id} style={{ position: 'relative', height: '50px' }} className="top-3 rounded-full mr-1 mt-1 mb-2 w-14 h-14 overflow-hidden"
            onClick={()=>{
              router.push(`/channels/${server.id}`)
            }}
          >
            <NaveTooll serverName={server.name}>
            <Image
              src={server.imageUrl}
              alt={`Image of ${server.name}`}
              fill
              objectFit="cover"
            />
            </NaveTooll>
            
          </div>
        </div>
      ))}
      
    </div>
    </ScrollArea>
  );
};

export default NaveBarServer;
