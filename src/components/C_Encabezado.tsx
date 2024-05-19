type C_EncabezadoProps={
    title?: string
    description?:string
    children:React.ReactNode
}

export default function C_Encabezado({title="", description="", children} : C_EncabezadoProps) {
  return (
    <div className="flex flex-col w-full max-w-full justify-between md:flex-col" >
        <div className=" w-full flex flex-col-reverse md:flex-row items-center justify-between">
          <div className=" w-full md:w-2/3">
            <h1 className=" w-full text-5xl font-black">{title}</h1>
          </div>
          <nav className="my-5 w-full md:w-auto md:max-w-1/3">
              {children}
          </nav>
        </div>
        <p className=" text-xl font-light text-terciario mt-5 break-words">{description}</p>
    </div>
  )
}
