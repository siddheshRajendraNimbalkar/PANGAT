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
import { SingleImageDropzoneUsage } from "./ImageUploader";
import createServer from "@/actions/createServer";
import { useRouter } from "next/navigation";
import Image from "next/image";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Server Name is Required",
    }),
    imageUrl: z.string().min(2, {
        message: "Image is Required"
    }),
});

function CreateChannel() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await createServer(values);

        if (!response.success) {
            console.log("something went wrong");
        } else {
            form.reset();
            router.push(`/channels/${response.id}`)
            window.location.reload();
        }
    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                <div>
                    <Image
                        src="/discord-icon-256x256-w6icqf4y.webp"
                        width={50}
                        height={50}
                        alt="Picture of the author"
                    />
                    <Button>Create Server</Button>
                </div>
            </DialogTrigger>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className=" flex justify-center text-2xl">
                        Create Server
                    </DialogTitle>
                    <DialogDescription className="flex flex-col items-center">
                        Your server is where you and your friends hang out.
                        <br />
                        <div>Make yours and start talking.</div>
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <SingleImageDropzoneUsage values={field.value} onChange={field.onChange} />
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
                        <Button type="submit" variant="secondary">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default CreateChannel;