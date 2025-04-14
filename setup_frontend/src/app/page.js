import Header from "./Components/header/";
import Cards from "./Components/Cards/";
import Footer from "./Components/footer/";
import Mid from "./Components/Mid/";

function Home() {
  return (
    <section className="">
      <Header h1="M&M vendedores" />
      <Mid />
      <Cards />
      <Footer />
    </section>
  );
}

export default Home;