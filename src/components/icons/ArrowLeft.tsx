
type ArrowLeftProps = {
  color: string
  width: number
}

export default function ArrowLeft({color, width} : ArrowLeftProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={width} stroke={`${color}`} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>

)
}
