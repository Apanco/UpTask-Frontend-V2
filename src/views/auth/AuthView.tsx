import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
export default function AuthView() {
    return (
        <div className=" h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2">
            <div className=" flex items-center justify-center py-12">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className=" grid w-full grid-cols-2">
                    <TabsTrigger value="account">Iniciar Sesion</TabsTrigger>
                    <TabsTrigger value="password">Registrarse</TabsTrigger>
                </TabsList>

                {/* //# -> Login */}
                <TabsContent value="account">Make changes to your account here.</TabsContent>
                <TabsContent value="password">Change your password here.</TabsContent>
            </Tabs>
            </div>
            <div className="max-h-screen hidden bg-muted lg:block">
                <img className=" object-cover w-full h-full" src="./bg.jpg"/>
            </div>

        </div>
    )
}
