export function Header(props){
    return(
        <section>
            <div  className="flex items-center justify-center bg-slate-50 relative box-border 
            rounded m-auto p-10 shadow-lg font-bold 
            md:mt-5 md:mx-5 sm:mt-3 sm:mx-3 ">

                <h1 className="cursor-pointer text-stone-900 scale-60 transition duration-200 ease-out hover:scale-110 hover:translate-y-1 text-xl lg:text-2xl font-sans
                lg:mx-5 md:mx-5 md:scale-100 md:ml-1 md:text-stone-800">{props.h1}</h1>

                <input placeholder="Pesquise por algo" className="border-2 border-indigo-900 border-double bg-slate-100 
                h-8 text-xs scale-90 rounded w-25 placeholder:text-center 
                lg:p-1 lg:mx-5 md:mx-5 lg:text-lg md:scale-100 md:w-100" />

                <a href="http://localhost:8000/forms/login/" className="text-center text-white  w-20 bg-indigo-500 scale-80 text-shadow-md/20 
                radius-2 rounded-sm mx-1/3 shadow-lg transition duration-200 ease-out hover:scale-110 hover:translate-y-1 hover:opacity-75 
                p-2
                md:mx-3 md:scale-100"> login</a>

                <a href="http://localhost:8000/forms/register/" className="text-center text-white w-20 bg-indigo-500 scale-80 text-shadow-md/20 
                radius-2 rounded-sm mx-1/3 shadow-lg transition duration-200 ease-out hover:scale-110 hover:translate-y-1 hover:opacity-75 p-2
                md:scale-100 md:mx-3"> Cadastro</a>

                <img src="https://github.com/matgamer2010.png" className="w-12 h-12 mx-3/2 mr-1 rounded-full cursor-pointer scale-80 border-2 
                border-solid border-gray-300 transition duration-200 ease-out hover:scale-110 hover:translate-y-1 shadow-lg 
                lg:ml-5 md:ml-5 md:scale-100 "></img>

            </div>
        </section>
    );
}