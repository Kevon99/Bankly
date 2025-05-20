const fs = require('fs/promises')
const readline = require('readline');
const {jsonPath} = require('./config') 

const askQuestion = (query) => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question(query, (answer) => {
            rl.close()
            resolve(answer)
        })
    })

}


const setBudget = async () => {
    try{
        const response = await askQuestion("How many money do you deposite?: ")
        const value = Number(response)
        if(isNaN(value)){
            throw new Error('There was an error in setData: setBudget. : ')
        }
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        data.budget = value

        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2))

    }catch(error){
        console.error('There was an error on the specification of the number: ' , error.message)
    }
}

const setHistory = async () =>{
    try{
        const response = await askQuestion('How many times do you got to pay the bills?: ')
        const value = Number(response)
        if(isNaN(value)){
            throw new Error('the value is not valid')
        }
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        data.history = value

        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2))

    }catch(error){
        console.error('There was an error on setting the values of history: ', error.message)
    }
}


module.exports = {
    askQuestion,
    setBudget,
    setHistory
}