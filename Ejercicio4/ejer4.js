// Ejercicio 1
function encrypt(array, aux)
{
    for(let i = 0; i < array.length; i++)
    {
        array[i] = array[i] + aux;
    }
    return array;
}

function decrypt(array, aux)
{
    for(let i = 0; i < array.length; i++)
    {
        array[i] = array[i] - aux;
    }
    return array;
}

function secret(array, doThis, aux)
{
    return doThis(array, aux);
}

console.log(secret([1,2,3,4], encrypt, 10))
console.log(secret([11,12,13,14], decrypt, 10))

// Ejercicio 2
mcd = (a, b) => (a === b) ? a : ((a < b) ? mcd(a,b-a) : mcd(b,a-b))
console.log(mcd(5,10))
console.log(mcd(5,5))
console.log(mcd(15,2))
console.log(mcd(7,17))
console.log(mcd(30,6))