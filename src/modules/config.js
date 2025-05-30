const path = require('path')


const taxes = (salary) => {
    const onePerSent = salary / 100
    const taxe = onePerSent * 30 //change if you want
    return taxe
}

const erroMessage = (funcion,error) => {
    console.error(`There was an error on the function: ${funcion}`, error.message)
}


module.exports = {
    jsonPath: path.join(__dirname,'..', 'data', 'data.json'),
    taxes,
    erroMessage
    
}

