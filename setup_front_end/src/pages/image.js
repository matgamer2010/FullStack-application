import styled from "styled-components"
import Component from "./index"

function Image(){
    <Component.Header/>;
    <EachImage/>;
    <Component.Footer/>;
}

StyledMainImage = styled.section`
    display:flex;
    justify-content:space-around;
    align-items:center;
    background-color:white;
    color:black;
    width:100%;
    height:100%;
`
StyledDescription = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:10vh 10vh;
`

function EachImage(){
    <StyledMainImage>
        <img src="{}" class="EachImage{}"/>
        <h1>{}</h1>       
        <img className="{favorites}" />
        <img className="{ShopNow}"/>
        <img className="{Cart}"/>
        <StyledDescription>
            <p className="CardDescription_{}">{}</p>
        </StyledDescription>
    </StyledMainImage>
}

export default Image();