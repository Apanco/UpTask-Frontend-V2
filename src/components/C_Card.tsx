import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "./ui/separator"


export default function C_Card() {
    return (
        <Card className=" bg-transparen border-claro">
            <CardHeader>
                <CardTitle>Project Name</CardTitle>
                <CardDescription>Cliente: Nombre del cliente</CardDescription>
            </CardHeader>

            <CardContent>
                <p>Description del proyecto Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </CardContent>

            <Separator className=" w-11/12 m-auto"/>

            <CardHeader>
                <CardTitle>Project Name</CardTitle>
                <CardDescription>Cliente: Nombre del cliente</CardDescription>
            </CardHeader>

            <CardContent>
                <p>Description del proyecto Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </CardContent>

            <Separator className=" w-11/12 m-auto"/>

            <CardHeader>
                <CardTitle>Project Name</CardTitle>
                <CardDescription>Cliente: Nombre del cliente</CardDescription>
            </CardHeader>

            <CardContent>
                <p>Description del proyecto Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </CardContent>
        </Card>
    )
}
