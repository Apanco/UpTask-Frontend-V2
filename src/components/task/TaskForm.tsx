//# ->  Dependencies
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types"
import ErrorMessage from "../ErrorMessage"

//# ->  Components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <div className="mb-5">
            <div className=" flex flex-col gap-3 mb-3">
                <Label
                    className=" text-lg "
                    htmlFor="name"
                >Nombre</Label>
                <Input
                    id="name"
                    placeholder="Nombre de la tarea"
                    type="text"
                    {...register("name",{
                        required:"El nombre de la tarea es obligatorio"
                    })}
                />

                <div className=" min-h-5">
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

            </div>
            <div className=" flex flex-col gap-3">
                <Label
                    className=" text-lg "
                    htmlFor="description"
                >Description</Label>
                <Textarea
                    id="description"
                    placeholder="Descripcion de la tarea"
                    {...register("description",{
                        required:"La descripcion de la tarea es obligatoria"
                    })}
                    
                />

                <div className=" min-h-5">
                    {errors.description && (
                        <ErrorMessage>{errors.description.message}</ErrorMessage>
                    )}
                </div>

            </div>
        </div>

    )
}
