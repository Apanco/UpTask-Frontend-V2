import { TaskStaus } from "@/types";
//# ->  Funcion que retornara la fecha formateada
export function formatDate(isoString : string) : string {
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES',{
        year:"numeric",
        month:"long",
        day:"numeric",
    })
    return formatter.format(date);
}

//# ->  Funcion que retornara la hora de la fecha proporcionada
export function formatDateHour(isoString : string){
    const setDdate = new Date(isoString)
    const formatterDate = new Intl.DateTimeFormat('es-ES',{
        year:"numeric",
        month:"long",
        day:"numeric",
    })
    const date = formatterDate.format(setDdate); 
    const formatterHour = new Intl.DateTimeFormat("es-ES",{
        hour:"numeric",
        minute:"numeric"
    })
    const hour = formatterHour.format(setDdate)
    return {date, hour}
}
type setPorcentajeProps = {
    tasks: TaskStaus[]
}

const percentageStatus  : {[key:string]: number} = {
    pending:0,
    inProgress:25,
    onHold:50,
    underReview:75,
    completed:100
}
//# ->  Funcion que calculara el procentaje completado del proyecto
export const setPorcentaje = ({tasks} : setPorcentajeProps)=>{
    const totalTasks = tasks.length;
    if(totalTasks === 0) {return 0}
    let weightedSum = 0;
    for(const task of tasks){
        weightedSum += percentageStatus[task.status];
    }
    const projectCompletionPercentage = weightedSum / totalTasks
    return projectCompletionPercentage
}
//# -> funcion que retornara un boolean en base al rango y numero proporcionado
export function inRange(cantidad:number, min:number,max:number){
    return (cantidad >=min && cantidad <= max)
}
const percentageStatusTotal  : {[key:string]: number[]} = {
    pending:[0,24],
    inProgress:[25,49],
    onHold:[50,74],
    underReview:[75,98],
    completed:[99,100]
}
const statusStyles : {[key:string]: string} = {
pending:"-slate-500",
inProgress:"-blue-500",
onHold:"-red-500",
underReview:"-amber-500",
completed:"-emerald-500"
}
//# -> Funcion que retorna el estilo en base al rango de procentaje
export function obtenerEstiloPorcentaje(porcentaje : number) {
    // Verificamos en qué rango se encuentra el porcentaje
    for (const estado in percentageStatusTotal) {
        const [rangoMin, rangoMax] = percentageStatusTotal[estado];
        if (porcentaje >= rangoMin && porcentaje <= rangoMax) {
            return statusStyles[estado];
        }
    }
    // Si no se encuentra en ningún rango específico, podemos asignar un estilo predeterminado
    return "bg-red-100"; // Por ejemplo, gris
}
//# -> Funcion que retorna el estilo en base al rango de procentaje
export function obtenerEtapa(porcentaje : number) {
    // Verificamos en qué rango se encuentra el porcentaje
    for (const estado in percentageStatusTotal) {
        const [rangoMin, rangoMax] = percentageStatusTotal[estado];
        if (porcentaje >= rangoMin && porcentaje <= rangoMax) {
            return estado;
        }
    }
    // Si no se encuentra en ningún rango específico, podemos asignar un estilo predeterminado
    return "bg-red-100"; // Por ejemplo, gris
}
//# ->  Funcion que redondeara un numero

export function redondear(valor:number, decimales:number) : number{
    return Number(Math.round(+`${valor}e${decimales}`)+ `e-${decimales}`)
}