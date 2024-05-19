import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Toast() {
  return (
    <>
        <Outlet/>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            theme="dark"
        />
    </>
)
}
