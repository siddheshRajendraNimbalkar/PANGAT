"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { UpdateImageDropzoneUsage } from "./UpdateImageDropzoneUsage";
import updateServerProfile from "@/actions/updateServerProfile";
import { useEffect } from "react";
import createServer from "@/actions/createServer";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Server Name is Required",
    }),
    imageUrl: z.string().min(2, {
        message: "Image is Required"
    }),
});

interface ServerInfo {
    serverId: string,
    serverName: string,
    imageUrl: string
}

function ServerSetting({ serverId, serverName, imageUrl }: ServerInfo) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: serverName,
            imageUrl: imageUrl
        },
    });

    useEffect(() => {
        form.setValue("name", serverName)
        form.setValue("imageUrl",imageUrl)
    }, [])

    return (
        <Dialog >
            <DialogTrigger asChild>
                <div>
                    <button className="w-full flex justify-start">Server Settings</button>
                </div>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className=" flex justify-center text-2xl">
                        Update Server
                    </DialogTitle>
                    <DialogDescription className="flex flex-col items-center">
                        You Can Update Your Server Name and Image Here!!!
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form className="space-y-8">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <UpdateImageDropzoneUsage values={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Discode" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <Button variant="secondary"
                    className="w-20"
                    onClick={async() => {
                       const response = await updateServerProfile(form.getValues(),serverId)
                       if (!response.sucess) {
                        console.log("something went wrong");
                        } else {
                            form.reset();
                            window.location.reload();
                        }
                    }}>Submit</Button>
            </DialogContent>
        </Dialog>
    );
}

export default ServerSetting;