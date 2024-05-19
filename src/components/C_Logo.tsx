
type C_LogoProps={
  h?:string
}

export default function C_Logo({h="14"} : C_LogoProps) {
  return (
    <img className={`max-h-${h} h-full`} src="/UpTask.svg" alt="Logo UpTask" />
  )
}
