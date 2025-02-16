const royalColors = [
    "#6A0DAD",  // Royal Purple
    "#4169E1",  // Royal Blue
    "#DC143C",  // Crimson
    "#FFD700",  // Gold
    "#50C878",  // Emerald Green
    "#800020",  // Burgundy
    "#000080",  // Navy Blue
    "#800000",  // Deep Maroon
    "#00555A",  // Deep Teal
    "#8B008B"   // Deep Magenta
    ];

    let random_color = (min=0, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let createType = (i, tag) => {
        let parent_badge = document.querySelector("#types")
        // console.log(parent_badge)
        let badge = document.createElement("div")
        badge.textContent = tag
        badge.id = "type" + i
        badge.className = "tag_class"
        badge.setAttribute('style', `background-color: ${royalColors[random_color(0, 9)]}`)
        parent_badge.append(badge)

    }

    let imageUpdater;

    const handleEvent = (event) => {

        let form = document.getElementById('form')

        if(!form.checkValidity()){
            return;
        }

        if(event){
            event.preventDefault();
        }

        let random_look1 = royalColors[random_color(0, 9)]
        document.querySelector("#image-container").setAttribute('style', `box-shadow: 0 0 15px ${random_look1}`)
        let random_look2 = royalColors[random_color(0, 9)]
        document.querySelector('#properties').setAttribute('style', `box-shadow: 0 0 10px ${random_look2}`);

        let input = document.querySelector('#search-input').value.trim().toLowerCase()

        let poke_image = document.querySelector("#sprite") 
        let poke_name = document.querySelector("#pokemon-name")
        let poke_id = document.querySelector("#pokemon-id")
        let poke_weight = document.querySelector("#weight")
        let poke_height = document.querySelector("#height")
        let poke_types = document.querySelector("#types")
        let poke_hp = document.querySelector("#hp")
        let poke_attack = document.querySelector("#attack")
        let poke_defense = document.querySelector("#defense")
        let poke_special_attack = document.querySelector("#special-attack")
        let poke_special_defense = document.querySelector("#special-defense")
        let poke_speed = document.querySelector("#speed")

        
        let arr_image = []

        fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
        .then((response) => {

            if(!response.ok){
                    throw new Error("Pokémon Not Found");
                }

            return response.json()
        })
        .then((data) => {

            let urlF, i;
            for (i=0; i<data.results.length; i++) {
                if(data.results[i].name == input || data.results[i].id == input){
                    urlF = data.results[i].url
                    break;
                }
            }

            if (!urlF) {
                alert("Pokemon Not Found")
                throw new Error("Pokémon Not Found");
            }


            return fetch(urlF)
        })
        .then((response) => {

            if(!response.ok){
                throw new Error("Pokémon Not Found");
            }

            return response.json()
        })
        .then((data) => {

            poke_name.textContent = data.name;
            poke_id.textContent = "#" + data.id
            poke_weight.textContent = data.weight
            poke_height.textContent = data.height
            poke_hp.textContent = data.stats[0].base_stat
            poke_attack.textContent = data.stats[1].base_stat
            poke_defense.textContent = data.stats[2].base_stat
            poke_special_attack.textContent = data.stats[3].base_stat
            poke_special_defense.textContent = data.stats[4].base_stat
            poke_speed.textContent = data.stats[5].base_stat

            // console.log(document.querySelectorAll('.tag_class').length)
            if(document.querySelectorAll('.tag_class').length){
                let remove_residueElements = document.querySelectorAll('.tag_class')

                remove_residueElements.forEach(element => {
                    element.remove();
                });
            }

            let arr_types = []
            
            if(data.types.length > 3){
                document.querySelector('.tag_class').setAttribute('style', 'font-size: small;')
            }

            for(let i=0; i<data.types.length; i++){
                arr_types.push(data.types[i].type.name.toUpperCase())
                createType(i, arr_types[i])
                // console.log(arr_types[i])
            }
            
            
            for(let key in data.sprites){
                arr_image.push(data.sprites[key])
            }
            

            let image = document.querySelector("#sprite")
            let image_iterator = 0;
            // console.log(image_iterator)
            if(imageUpdater){
                clearInterval(imageUpdater)
            }

            imageUpdater = setInterval(() => {
                image.setAttribute('src', arr_image[image_iterator++])
                if(image_iterator >= arr_image.length){
                    image_iterator = 0
                }
            }, 1000)

        })
        .catch((error) => {
            console.log(error)
        }) 
        .finally(
            setTimeout(() => {
                document.querySelector('#search-input').value = ''
            }, 1000)
        )       
    }