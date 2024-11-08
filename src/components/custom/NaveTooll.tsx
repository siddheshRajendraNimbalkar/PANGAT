 'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"
 
export function NaveTooll({children,serverName}:{children:React.ReactNode,serverName:string}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="right">
          {serverName}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
