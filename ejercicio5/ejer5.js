function obtener(url)
  {
     let promesa = new Promise((resolve, reject)=>{
       let exito = false;
       let req = new XMLHttpRequest();
       req.open('GET',url);
       req.onload = function()
       {
         if(req.status == 200)
         {
           resolve(req.response);
         }
         else
         {
           reject(req.statusText);
         }
       };  
       req.send();
    });
    return promesa;
  }
  
let url1='https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json';
let url2='https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json';
 
//Leer detalle
obtener(url2).then(result =>{
    // Obtener json detalles
    let detalles = JSON.parse(result);
    //Leer productos
    obtener(url1).then(result2 =>{
        // Obtener json productos
        let productos = JSON.parse(result2);

        //Auxiliares para obtener mayor
        let contMax = 0
        let idMax = 0
        let nombreMax = ''

        // Iterar por cada producto
        for(let i = 0; i < productos.length;i++)
        {
            countActual = 0
            let idActual = productos[i].idproducto;
            let nombreActual = productos[i].nombreProducto;
            for(let j = 0 ; j < detalles.length; j++)
            {
                if(idActual == detalles[j].idproducto)
                {
                    countActual = countActual + parseInt(detalles[j].cantidad)
                }
            }
            if(contMax<countActual)
            {
                contMax = countActual;
                idMax = idActual;
                nombreMax = nombreActual;
            }
        }
        console.log(`El producto más vendido es ${nombreMax} con un total de ${countActual} cantidad pedida`);
    });  
});