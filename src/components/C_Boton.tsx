import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

type C_BotonProps = {
    isLoad: boolean
    text:string,
    textLoading:string,
}

export function C_Boton({isLoad, text, textLoading} : C_BotonProps) {
    return (
        <Button type="submit" disabled={isLoad} className=" w-full">
            {isLoad ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {textLoading}
                </>
            )
             : (
                <>
                    {text}
                </>
            )}
            
        </Button>
    )
}
