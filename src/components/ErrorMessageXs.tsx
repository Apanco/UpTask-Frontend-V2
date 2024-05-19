type ErrorMessageProps = {
    children: React.ReactNode
}
export default function ErrorMessageXs({children} : ErrorMessageProps) {
    return (
        <div className=' m-0 text-red-600 font-semibold text-xs'>
          {children}
        </div>
      )
}
