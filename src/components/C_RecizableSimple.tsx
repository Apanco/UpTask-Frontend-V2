import {
    // ResizableHandle,
    // ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import React from "react"

type C_RecizableSimpleProps = {
    children: React.ReactNode
    color?: string
}

export default function C_RecizableSimple({children, color = "claro"} : C_RecizableSimpleProps) {
    return (
        <ResizablePanelGroup
            direction="vertical"
            className={`rounded-lg border border-${color} w-full p-3`}
        >   
        {children}
        </ResizablePanelGroup>
    )
}
