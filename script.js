function fetchPokedex() {
    let xhr = new XMLHttpRequest();
    let pokeID = document.getElementById('pokeID').value;
    console.log(pokeID);
    let url = `https://pokeapi.co/api/v2/pokemon-form/${pokeID}`;
    xhr.open('GET',url, true);
    xhr.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let response = JSON.parse(this.responseText);
            console.log(response);
            displaypoke(response);
        } else if (this.readyState === 4){
            console.log('Error:', this.statusText);
        }
    };
    xhr.send();
}

function displaypoke(data) {
    let heroInfo = document.getElementById('startPokeInfo');
    if (data.response === "error") {
        heroInfo.innerHTML = `<p>Error: ${data.error}</p>`;
    } else {
        fetch(data.fetchPokedex)
        .then(response => response.json())
        .then(data => {
            pokeInfo.innerHTML =`<h1>Name: ${data.name}</h1> `
        })
    }
}