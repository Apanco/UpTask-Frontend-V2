import { Task } from "@/types"
import { obtenerEstiloPorcentaje, redondear, setPorcentaje } from "@/utils/utils"
import * as Progress from '@radix-ui/react-progress';
import { useEffect, useState } from "react";

type ProjectProgressBarProps = {
    tasks: Task[]
}
export default function ProjectProgressBar({tasks} : ProjectProgressBarProps) {
    
    const projectCompletionPercentage = setPorcentaje({tasks})
    const color = obtenerEstiloPorcentaje(projectCompletionPercentage)
    useEffect(()=>{

    },[tasks])
    return (
        <div className=" w-full flex gap-x-2 items-center">
             <Progress.Root className=" relative overflow-hidden bg-fondoP rounded-full w-full z-0 h-1" value={projectCompletionPercentage}>
                <Progress.Indicator
                  className={`w-full h-full bg${color} transition-transform`}
                  style={{ transform: `translateX(-${100 - projectCompletionPercentage}%)` }}
                />
              </Progress.Root>
        </div>
    )
}
