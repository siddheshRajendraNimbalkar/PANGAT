"use client"
import { useClerk } from '@clerk/nextjs';
import { Button } from "../ui/button";

export default function SignOutBtn() {
  const { signOut } = useClerk();
  return (
    <div>
        <Button onClick={() => signOut({ redirectUrl: '/sign-in' })}>Sign out</Button>
    </div>
  );
}
