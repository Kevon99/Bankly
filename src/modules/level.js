const fs = require('fs/promises')
const {jsonPath} = require('./config');

const status = [
    {
        "name" : "Beginner",
        "money" : 0,
        "range" : 5000,
        "color" : "Pink"
    },
    {
        "name" : "Intermediate",
        "money" : 5000,
        "range" : 50000,
        "color" : "Blue"
    },
    {
        "name" : "Advanced",
        "money" : 50000,
        "range" : 250000,
        "color" : "Red",
    },
    {
        "name" : "profetional",
        "money" : 250000,
        "range" : "Does'nt exist",
        "color" : "Purple"
    }
]

const level = async () => {
    const readFile = await fs.readFile(jsonPath, 'utf-8')
    const data = JSON.parse(readFile)

    const stat = data.budget
    let position; 
    let color;

    if(stat >= status[0].money && stat <= status[0].range){
        position = status[0].name
        color = status[0].color
    }
    else if(stat >= status[1].money && stat <= status[1].range){
        position = status[1].name
        color = status[1].color
    }
    else if(stat >= status[2].money && stat <= status[2].range){
        position = status[2].name
        color = status[2].color
    }
    else if(stat >= status[3].money){
        position = status[3].name
        color = status[3].color
    }

    return{position, color}
}

const main = async () => {
    const result = await level();
    console.log(result.color)
    console.log(result.position)
}

main()