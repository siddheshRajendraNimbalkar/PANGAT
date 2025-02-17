"use client";
import { useClerk } from "@clerk/nextjs";
import { Button } from "../ui/button";

export default function SignOutBtn() {
  const { signOut } = useClerk();

  return (
    <div>
      <Button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => {
          signOut(() => {
            window.location.href = "/sign-in";
          });
        }}
      >
        Sign out
      </Button>
    </div>
  );
}
