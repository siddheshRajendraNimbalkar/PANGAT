
import React from 'react'
import { Button } from "@/components/ui/button"
import { ModeToggle } from '@/components/providers/ModeToggle'
import SignOutBtn from '@/components/special/SignOutBtn'

const page = () => {
  return (
    <>
      HELLO BRO!!!
      <div>
        <Button variant="secondary">Button</Button>
      </div>
      <div>
        <ModeToggle />
      </div>
      <div>
        <SignOutBtn />
      </div>  
    </>
  )
}

export default page