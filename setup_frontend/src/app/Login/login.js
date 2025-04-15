import Header from "../Components/header"

export function Main(){
    return(
        <section>
            <Header h1="M&M vendedores"/>
            <section className="flex justify-center items-center box-border ">
                <div className="mt-30 md:m-10 w-fit p-10 md:p-25 rounded text-black shadow-2xl md:text-3xl">

                    <h1 className="md:mb-10 text-center font-sans font-light text-shadow-lg/10">Login</h1>

                    <div className="md:my-10">
                        <h2 className="font-light underline underline-offset-2 decoration-sky-200">Email :</h2> 
                        <input className="placeholder:text-gray-500 placeholder:italic placeholder:text-xl 
                        placeholder:text-center border-1 border-indigo-300
                        md:border-2 m-3" placeholder="Digite seu Email"/>
                    </div>

                    <div className="md:my-10">
                        <h2 className="font-light underline underline-offset-6 decoration-sky-200">Senha :</h2>
                        <input className="placeholder:text-gray-500 placeholder:italic placeholder:text-xl 
                        placeholder:text-center border-1 border-indigo-300 md:border-2 m-3" placeholder="Digite sua senha" type="password"/>
                    </div>

                    <button className="bg-indigo-600 font-light text-white rounded p-2 w-full shadow-2xl 
                    hover:opacity-75 cursor-pointer transition ease-out duration-500 hover:scale-105 ">Entrar</button>
                </div>
            </section>
        </section>
    );
}
