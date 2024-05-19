import C_RecizableSimple from "./C_RecizableSimple"
import { Loader2 } from "lucide-react"
export default function C_isLoading() {
  return (
    <div>
        <C_RecizableSimple>
            <div className=" w-full m-auto flex justify-center items-center p-20 gap-x-9">
                <Loader2
                    size={64}
                    strokeWidth={3}
                    className=" animate-spin"
                />
            </div>
        </C_RecizableSimple>
    </div>
  )
}
