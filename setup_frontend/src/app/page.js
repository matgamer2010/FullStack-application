import Header from "./Components/header/";
import Cards from "./Components/Cards/";
import Footer from "./Components/footer/";

function Home(){
  return(
    <body className="bg-slate-200  box-border scroll-smooth bg-fixed">
      <Header h1={"M&M vendedores"} />

      <div className="text-center mt-10 mx-20 line-clamp-3 p-4">
        <p className="text-2xl md:text-8xl">A</p> <a className="bg-gradient-to-r from-slate-400 to-indigo-800 bg-clip-text text-4xl font-sans text-transparent font-bold 
        md:text-9xl">maior</a>  
        <p className="text-2xl
        md:text-8xl">de Minas gerais</p>
      </div>

      <img src="./Banner-2.png" className="scale-80 blur-sm -skew-6 outiline-4 lg:scale-50"/>
      <Footer />
    </body>
  );
}

export default Home;