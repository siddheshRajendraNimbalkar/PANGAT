import { useEffect, useState } from "react"

export const InviteUrl = () => {
    const [isMo, setisMo] = useState(false)

    useEffect(()=>{
        setisMo(true)
    },[])

    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""
    return `${origin}/invite/`
}