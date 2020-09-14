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

const urlProv =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlCli =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";

function generateTableHead(table, data) {
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

function generateTable(table, data) {
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

// Funcion para llenar tabla1
function doTable1(table, data, headers) {
  let promesa = new Promise((resolve, reject) => {
    generateTable(table, data);
    generateTableHead(table, headers);
    resolve();
  });
  return promesa;
}

link = document.title === 'Proveedores' ? urlProv : urlCli;

obtener(link).then((result) => {
  // Obtener json detalles
  let data = JSON.parse(result);
  let table = document.querySelectorAll("table");
  let headers = Object.keys(data[0]);
  doTable1(table[0], data, headers);
});
