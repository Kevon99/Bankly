const path = require('path')


const taxes = (salary) => {
    const onePerSent = salary / 100
    const taxe = onePerSent * 30 //change if you want
    return taxe
}


module.exports = {
    jsonPath: path.join(__dirname,'..', 'data', 'data.json'),
    taxes
    
}

