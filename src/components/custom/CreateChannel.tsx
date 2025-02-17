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
        <Dialog>
            <DialogTrigger asChild>
                <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                    <div className="flex flex-col items-center p-8 rounded-2xl shadow-2xl bg-white dark:bg-red-600/20 backdrop-blur-lg transition-all hover:shadow-xl hover:-translate-y-2">
                        <div className="mb-6 text-center">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                                Start Your Journey
                            </h1>
                            <p className="text-gray-500 dark:text-gray-300">
                                Create your own space and connect with friends
                            </p>
                        </div>

                        <div className="relative group overflow-hidden rounded-lg shadow-lg">
                            <Image
                                src="/one-piece-pictures.jpg"
                                width={500}
                                height={300}
                                alt="Server Illustration"
                                className="rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        <Button
                            className="mt-6 px-8 py-4 text-lg  bg-black dark:hover:bg-slate-950 text-white rounded-full shadow-md transition-all duration-300 hover:scale-105"
                        >
                            <span className="drop-shadow-md">Create Server</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 ml-2 -mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                   <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                    </div>
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
                                        <Input placeholder="Pangat" {...field} />
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