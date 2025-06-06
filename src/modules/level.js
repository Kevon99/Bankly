const fs = require('fs/promises')
const {jsonPath} = require('./config');
const colors = require('colors')
const config = require('./config')

const setLevel = async () => {
    try{
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        let level;

        if(data.budget < 10000){
            data.level = "Beginner"
        }
        else if(data.budget >= 10000 && data.budget < 100000){
            data.level = "Intermediate"
        }
        else if(data.budget >= 100000 && data.budget < 1000000){
            data.level = "Profetional"
        }
        else if(data.budget >= 1000000 && data.budget < 30000000){
            data.level = "Rich"
        }
        else if(data.budget >= 30000000){
            data.level = "Genius Rich"
        }

        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8')

        table = [
            {"Your Level" : data.level}
        ]

        console.table(table)

    }catch(error){
        config.erroMessage("setLevel", error)
    }
}

setLevel()




module.exports = {
    setLevel
}