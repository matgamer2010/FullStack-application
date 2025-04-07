import Header from "./Components/header/";
import Cards from "./Components/Cards/";
import Footer from "./Components/footer/";
import Mid from "./Components/Mid/";

function Home(){
  return(
    <body className="bg-slate-100  box-border scroll-smooth bg-fixed">
      <Header h1={"M&M vendedores"} />
      <Mid />
      <Cards/>
      <Footer />
    </body>
  );
}

export default Home;