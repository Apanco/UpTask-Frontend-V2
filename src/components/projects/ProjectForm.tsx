import ErrorMessage from "../ErrorMessage"
import { UseFormRegister, FieldErrors} from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

//# ->  Types
import { ProjectFormData } from "@/types"

type ProjectFormProps = {
    register:UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({register, errors} : ProjectFormProps   ) {
    return (
        <>
            <div className=" mb-1 md:mb-3 space-y-2">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Nombre del Proyecto
                </label>
                <Input
                    id="projectName"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />
                <div className=" h-5 mt-0">
                    {errors.projectName && (
                        <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                    )}
                </div>
            </div>

            <div className=" mb-1 md:mb-3 space-y-2">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>
                <Input
                    id="clientName"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />
                <div className=" h-5 mt-0">
                    {errors.clientName && (
                        <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                    )}
                </div>
                
            </div>

            <div className=" mb-1 md:mb-3 space-y-2">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <Textarea
                    id="description"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />
                <div className=" h-5 mt-0">
                    {errors.description && (
                        <ErrorMessage>{errors.description.message}</ErrorMessage>
                    )}
                </div>
                
            </div>
        </>
    )
}