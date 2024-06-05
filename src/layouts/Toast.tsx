import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/sonner"

export default function Toast() {
  return (
    <>
        <Outlet/>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            theme="dark"
        />
        <Toaster />
        
    </>
)
}
