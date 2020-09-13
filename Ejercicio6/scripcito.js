// Funcion para obtener la data
function obtener(url) {
  let promesa = new Promise((resolve, reject) => {
    let exito = false;
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
      if (req.status == 200) {
        resolve(req.response);
      } else {
        reject(req.statusText);
      }
    };
    req.send();
  });
  return promesa;
}

let link =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

function generateTableHeadEvents(table, data) {
  // Crear head de la tabla y adicionar la columna de # manualmente
  let thead = table.createTHead();
  let row = thead.insertRow();
  let index = document.createElement("th");
  let text = document.createTextNode("#");
  index.appendChild(text);
  index.setAttribute("scope", "col");
  row.appendChild(index);

  // Adicionar columna por cada key existente
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    th.setAttribute("scope", "col");
    row.appendChild(th);
  }
}

function generateTableEvents(table, data) {
  // contador de numero de elementos
  let cont = 1;

  // Iterar todos los elementos
  for (let element of data) {
    // añadir una row y ver si el valor de squirrel es true, si lo es entonces la row va con clase de danger de boostrap
    let row = table.insertRow();
    if (element["squirrel"]) {
      row.classList.add("table-danger");
    }
    let cell = row.appendChild(document.createElement("th"));
    let text = document.createTextNode(cont);
    cell.appendChild(text);
    cell.setAttribute("scope", "row");
    cont++;

    // Iterar cada key en el elmento, crear celda de asignar el valor del key
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

function generateTableHead2(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let col = document.createElement("th");
  let text = document.createTextNode("#");
  col.appendChild(text);
  col.setAttribute("scope", "col");
  row.appendChild(col);

  col = document.createElement("th");
  text = document.createTextNode("Event");
  col.appendChild(text);
  col.setAttribute("scope", "col");
  row.appendChild(col);

  col = document.createElement("th");
  text = document.createTextNode("Correlation");
  col.appendChild(text);
  col.setAttribute("scope", "col");
  row.appendChild(col);
}

function generateTable2(table, data) {
  let cont = 1;
  let eventos = [];
  for (let element of data) {
    // Crear una lista con eventos que se procesan, con cada uno hacer la cuenta y calcular la correlacion  
    for (let evento of element["events"]) {
      if (!eventos.includes(evento)) {
        let row = table.insertRow();
        
        // Adicionar celda de # con el contador
        let cell = row.appendChild(document.createElement("th"));
        let text = document.createTextNode(cont);
        cell.appendChild(text);
        cell.setAttribute("scope", "row");
        cont++;
        eventos.push(evento);
        calcularYLlenarCelda(row, data, evento);
      }
    }
  }
}

function calcularYLlenarCelda(row, data, evento) {
  let tn = 0;
  let tp = 0;
  let fn = 0;
  let fp = 0;
  for (let dato of data) {
    if (dato["events"].includes(evento)) {
      if (dato["squirrel"]) {
        tp++;
      } else {
        fn++;
      }
    } else {
      if (dato["squirrel"]) {
        fp++;
      } else {
        tn++;
      }
    }
  }
  // Escribir evento
  let cell = row.insertCell();
  let text = document.createTextNode(evento);
  cell.appendChild(text);

  // Escribir correlacion
  cell = row.insertCell();
  text = document.createTextNode(calcularCorre(tn,tp,fn,fp));
  cell.appendChild(text);
}

// Funcion para obtener correlacion
function calcularCorre(tn, tp, fn, fp) {
  return (
    (tp * tn - fp * fn) /
    Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn))
  );
}

// Funcion para llenar tabla1
function doTable1(table, data, headers) {
  let promesa = new Promise((resolve, reject) => {
    generateTableEvents(table, data);
    generateTableHeadEvents(table, headers);
    resolve();
  });
  return promesa;
}

// Funcion para llenar tabla2
function doTable2(table, data, headers) {
  let promesa = new Promise((resolve, reject) => {
    generateTable2(table, data);
    generateTableHead2(table, headers);
    resolve();
  });
  return promesa;
}

obtener(link).then((result) => {
  // Obtener json detalles
  let data = JSON.parse(result);
  let table = document.querySelectorAll("table");
  let headers = Object.keys(data[0]);
  doTable1(table[0], data, headers);
  doTable2(table[1], data, headers);
});
