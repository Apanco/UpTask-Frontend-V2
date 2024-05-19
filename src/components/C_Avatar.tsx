import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type C_AvatarProps = {
  name?: string
  h?:string
  w?:string
};

export default function C_Avatar({ name = "", h="8", w="8" }: C_AvatarProps) {
  return (
    <Avatar className={`max-w-${w} max-h-${h}`}>
      <AvatarImage src="https://github.com/shadcn.png1" />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
}
