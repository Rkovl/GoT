const houseMottos = [
    "In darkness, we find the light within us all",
    "Our strength lies in unity and the honor we uphold",
    "From the ashes, we shall rise again stronger than before",
    "The brave defend the weak without fear or hesitation",
    "Through trials and tribulations, we find our true strength",
    "The sword protects, the heart decides the fate of all",
    "With every dawn, our resolve grows stronger and unyielding",
    "In silence, we strike swift and true as a shadow",
    "The wind whispers of our unyielding spirit and bravery",
    "Blood binds us; honor sets us apart from others",
    "Together we stand, divided we fall into oblivion",
    "In the shadows, we find our greatest power and resolve",
    "For family and honor, we endure all things with pride",
    "No storm shall break our iron will and determination",
    "In our veins runs the fire of courage and righteousness",
    "Honor in life, loyalty even in death's cold embrace",
    "With wisdom and courage, we rule with might and fairness",
    "The bond of family is stronger than steel and stone",
    "Our hearts beat with the strength of lions and eagles",
    "The flame of justice burns within us all forever",
    "From the depths of despair, we rise to the summit of hope",
    "With every challenge, we grow ever stronger and more resilient",
    "Our spirit is fierce, our will is iron, our hearts are true",
    "Duty compels us, honor guides us forward in all things",
    "We protect those who cannot defend themselves from harm",
    "By honor, valor, and unwavering resolve, we live our truth",
    "Strength of heart, steel of hand, wisdom of mind, soul of fire",
    "Our legacy is carved in stone and blood, remembered forever",
    "In times of peace, we prepare for war without hesitation",
    "With each breath, we vow to protect freedom and justice",
    "The sun sets, but our resolve does not wane or fade",
    "Every star in the sky is a guiding light for our path",
    "In the face of danger, we do not falter or retreat",
    "Our blades are sharp, our minds are sharper still",
    "From the mountains to the sea, we reign supreme",
    "Every drop of blood spilled is a sacrifice honored and remembered",
    "With every sunrise, our destiny unfolds anew and bright",
    "We are the shield against the coming storm of darkness",
    "In silence, we prepare; in battle, we roar like lions",
    "The spirit of the dragon lives in our hearts and souls",
    "Every step forward is a step toward our destiny and legacy",
    "When the night is darkest, our light shines brightest of all",
    "Honor binds us, courage defines us, strength guides us always",
    "In the crucible of war, we forge unbreakable bonds of loyalty",
    "The earth trembles at the sound of our march to victory",
    "A house united is a house invincible in strife and peace",
    "Through blood and fire, we find our purpose and calling",
    "Our past is our strength, our future our destiny uncharted",
    "Every breath taken is a vow to protect the realm from evil",
    "In our veins flows the blood of conquerors and kings eternal",
    "The storm rages, but we stand resolute and unyielding in it"
  ];

let olContent =  document.querySelector("#olContent")


const on = async(id)=> {
    document.querySelector("#overlay").style.display = "block";
    
    let hold = id.split(",")
    if(hold != ""){
        console.log(hold)
        for(let A = 0;A<hold.length;A++){
            let houseData = await houseFetch(hold[A])
            let houseURL = houseData.url
            console.log(houseURL)
            let CoAArr = houseURL.match(/\d+/)
            console.log(CoAArr)
            let CoANumb = CoAArr.join("")
            console.log(CoANumb)

            olContent.innerHTML += `<div><img src="https://armoria.herokuapp.com/?size=250&format=png&seed=${CoANumb}" alt="CoA Image">${houseData.name}</div>`
        }
    }
    else{
        olContent.innerHTML = "Lowborn Commoner"
    }
    
    // const houseData = await houseFetch(id)

  }
  
const off=()=> {
    document.querySelector("#overlay").style.display = "none";
    olContent.innerHTML = ''
  }



const charClass = document.querySelector('.characters');
const loaderClass = document.querySelector('.loader');

let page = 1
let total = 50
let multi = 0


const houseFetch = async (link) =>{
    let results = await fetch(link)
    if (!results.ok) {
        throw new Error(`An error occurred: ${results.status}`);
    }
    return await results.json();
}


const charFetch = async (page)=>{
    let results = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${page}&pageSize=24`)
    if (!results.ok) {
        throw new Error(`An error occurred: ${results.status}`);
    }
    return await results.json();

}

const loadFetch = async(page)=>{
    const charData = await charFetch(page)
    for(let A = 0; A<charData.length;A++){
        let ranHouseMottos = houseMottos[Math.floor(Math.random()*houseMottos.length)];
        let charTitle =  charData[A].titles[0] ? `<h6 class="card-subtitle mb-2 text-muted">${charData[A].titles[0]}</h6>` :  `<h6 class="card-subtitle mb-2 text-muted">One who lacks a title</h6>`

        if(charData[A].aliases != ''){
            charClass.innerHTML += `
            <div class="col"style="height: 300px">
                <div class="card h-100 text-center">
                    <div class="card-body">
                        <h5 class="card-title">${charData[A].name}${' Known as '+charData[A].aliases[0]}</h5>
                        ${charTitle}
                        <p class="card-text">${ranHouseMottos}</p>
                    </div>
                    <div class="card-footer">
                    <button onclick="on(this.id)" type="button" class="btn btn-primary"  id="${charData[A].allegiances}">Allegiances</button>
                    </div>
                </div>
            </div>
            `
        }
        else{
            charClass.innerHTML += `
            <div class="col" style="height: 300px">
                <div class="card h-100 text-center">
                    <div class="card-body">
                        <h5 class="card-title">${charData[A].name}</h5>
                        ${charTitle}
                        <p class="card-text">${ranHouseMottos}</p>
                    </div>
                    <div class="card-footer">
                    <button  onclick="on(this.id)" type="button" class="btn btn-primary" id="${charData[A].allegiances}">Allegiances</button>
                    </div>
                </div>
            </div>
            `
        }
    }
    multi++
}
window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        page++;
        loadFetch(page);
    }
}, {
    passive: true
});
loadFetch()
