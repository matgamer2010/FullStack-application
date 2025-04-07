export function MidContent(){
    return(
        <section>
            <div className="text-center mt-10 mx-20 line-clamp-3 p-4">
                <p className="text-2xl md:text-8xl ">A</p> <a className="bg-gradient-to-r 
                from-slate-400
                to-indigo-800 bg-clip-text text-4xl
                transition ease-in-out duration-900 animate-pulse hover:bg-gradient-r hover:from-indigo-800 hover:to-purple-600
                font-sans text-transparent font-bold md:text-9xl cursor-default ">maior</a>  
                <p className="text-2xl md:text-8xl">de Minas gerais</p>
            </div>
            <img src="./Banner-2.png" className="mt-15 md:mt-0 scale-80 blur-none -skew-6 outiline-4 
            lg:scale-50 md:blur-sm"/>
        </section>
    );
}