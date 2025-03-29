import styled from "styled-components"



function Home(){
  <Header/>;
  <MainContent/>;
  <Footer/>;
}


StyledHeader= styled.section`
  display:flex;
  justify-content: space-between;
  align-items:flex-start;
  color:green;
  background-color: whitesmoke;
  top:0;
  position:absolute;
  width:100%;
  padding:0px 100%;
`

StyledButtonHeader = styled.button`
  background:none;
  border:50%;
  background-color:white;
`

StyledMenuHeader = styled.button`
  background:none;
`

function Header(){
  <StyledHeader>
    <h1>
       M&M vendedores
    </h1>
    <input className="InputHeader" placeholder="Digite um produto"/>
    <StyledButtonHeader/>
    <StyledMenuHeader/>
  </StyledHeader>
}

StyledMain = styled.section`
  display:flex;
  justify-content:space-between;
  background-color:white;
  color:black;
`

StyledCards = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color:green;
  color:white;
  width:70%;
  margin-left:auto;
`

StyledCategories = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  background-color:white;
  color:black;
  width:30%;
  margin-right:auto;
  font-family: Arial, sans-serif;
`

StyledDivision = styled.div`
  background-color:gray;
  width:10px;
`

function MainContent(){

  <StyledMain>
    <div className="CardsProducts">
      <StyledCards>
      <img src="{}" className="Image{}"/>{}
      <p className="CardQuickDescription_{}" href="{}"></p>
      <img className="{favorites}" />
      <img className="{ShopNow}"/>
      <img className="{Cart}" />
      </StyledCards>
    </div>

    <div className="Division">
      <StyledDivision/>
    </div>

    <div className="Categories">
      <StyledCategories>
        <h1>Categorias</h1>
        <p className="Male">Masculino
          <button className="MaleButton"/>
        </p>
        <p className="Female">Feminino
          <button className="FemaleButton"/>
        </p>
      </StyledCategories>
    </div>

  </StyledMain>
}

StyledFooter = styled.section`
  display:flex;
  justify-content:space-between;
  background-color:green;
  color:white;
`

function Footer(){
  <StyledFooter>
    <h1>Contate-nos
      <h2>matgamer297@hotmail.com</h2>
    </h1>

    <p>Copyright M&M vendedores 2025</p>
  </StyledFooter>
}

export default Home();