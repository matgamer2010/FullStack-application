import { Register } from "./Register";
import { Suspense } from "react";
import Messages from "../Components/Messages";

function Registro() {
    return (
        <>
            <Suspense fallback={null}>
                <Messages/>
            </Suspense>

            <Register/>
        </>
    );
}

export default Registro;