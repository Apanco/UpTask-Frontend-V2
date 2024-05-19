import { getUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = ()=>{
    const { data, isLoading, isError} = useQuery({
        queryKey:['user'],
        queryFn:getUser,
        retry:1,
        refetchOnWindowFocus:false//? -> Evita que se se realize el query cada que cambias de ventana
    })
    return {data, isLoading, isError}
}