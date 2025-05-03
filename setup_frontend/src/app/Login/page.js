import { Main }     from "./login";
import { Suspense } from "react";
import Messages     from "../Components/Messages";

function Login(){
    return (
        <>
            <Suspense fallback={ null }>
                <Messages/>
            </Suspense>

            <Main/>      
        </>
    );
}

export default Login;