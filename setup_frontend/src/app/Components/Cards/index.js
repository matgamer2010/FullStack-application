
function Cards(){
    const url = "http://localhost:8000/APICrud/?format=json";
    fetch(url)
    .then((response) =>{response.json()})
    .then((data) => console.log(data))

    return(
        <h1>
            Card
        </h1>
    );
}

export default Cards;