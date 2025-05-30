const fs = require('fs/promises')
const readline = require('readline');
const {jsonPath,taxes, erroMessage} = require('./config');
const {getCredit} = require('./getData') 

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
        getCredit()
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
        getCredit()
    }catch(error){
        console.error('There was an error on setting the values of history: ', error.message)
    }
}

const setDebts = async () => {
    try{
        const response = await askQuestion('how many money do you debt?: ')
        const value = Number(response)
        if(isNaN(value)){
            throw new Error('the value is not valid')
        }
        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        data.debts = value
        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2))
        getCredit()
    }catch(error){
        console.error('There was an error on the function setDebts', error.message)
    }
}

const setWishList = async () => {
    try{
        const name = await askQuestion('Set the name of the object that do you want to add: ')
        const value = await askQuestion('Set the priece of the object: ')
        const valueNumber = Number(value)
        if(isNaN(valueNumber)){
            throw new Error('the value is not valid')
        }

        const readData = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readData)
        
        data.wishList.push({object: name, priece: valueNumber})
        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8')

        getCredit()
    }catch(error){
        console.error('there was an error on the function setWishList on setData', error.message)
    }
}

const setTaxes = async () => {
    try{
        const readFile = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readFile)

        // variables

        const salary_per_month = await askQuestion('how amount money is your salary?: ')
        const salary = Number(salary_per_month)
        
        const taxe = taxes(salary)
        data.taxes = taxe

        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8')

    }catch(error){
        console.log(error)
    }
}

const setObjetive = async () => {
    try{
        const readFile = await fs.readFile(jsonPath, 'utf-8')
        let data = JSON.parse(readFile)

        const name = await askQuestion("which is your objetive?: ")
        let money = await askQuestion("How many money do you need? ")
        money = Number(money)
        
        data.Objetive.push({name: name, money: money})

        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2), 'utf-8')

    }catch(error){
        erroMessage("setObjetive", error)
    }   
}



module.exports = {
    askQuestion,
    setBudget,
    setHistory,
    setDebts,
    setWishList,
    setTaxes,
    setObjetive
}