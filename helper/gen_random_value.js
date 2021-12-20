
module.exports = {
    genRandomValue: () =>{
        let firstValue = String(Math.floor(Math.random() * 9) + 1);
        let secondValue = String(Math.floor(Math.random() * 9) + 1);
        let thirdValue = String(Math.floor(Math.random() * 9) + 1) ;
        let fourthValue = String(Math.floor(Math.random() * 9) + 1);
        let fifthValue = String(Math.floor(Math.random() * 9) + 1);
        let sixthValue = String(Math.floor(Math.random() * 9) + 1);
    
        return firstValue + secondValue + thirdValue + fourthValue + fifthValue + sixthValue;
    }
}
    