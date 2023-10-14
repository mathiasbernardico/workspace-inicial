// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const IDinicial =25801;
    const url = `https://japceibal.github.io/emercado-api/user_cart/${IDinicial}.json`;

    var arrayItems = JSON.parse(localStorage.getItem('items')) || [];
    // Objeto para almacenar la cantidad de veces que se repite cada ID
    const idContador = {};

    // Filtra y cuenta los elementos
    const filtrados = arrayItems.filter(item => {
      const id = item.id;
      if (!idContador[id]) {
        idContador[id] = 1;
        return true;
      } else {
        idContador[id]++;
        return false;
      }
    });


    function agregandoItems() {
      const contenedor = document.getElementById("tbody");
      filtrados.forEach(producto => {
        const idProducto = producto.id;
        const valor = idContador[idProducto];
        const precioTotal = valor * producto.cost;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <tr>
            <td><img src="${producto.img}" alt=""></td>
            <td>${producto.name}</td>
            <td>${producto.cost}</td>
            <td><input type="number" name="inputQuantity" id="${idProducto}" value="${valor}"></td>
            <td id="costo${producto.id}">${precioTotal}</td>
          </tr>
        `;
        contenedor.appendChild(tr);
    
        
    
        // Crear una función para el evento input dentro del bucle
        function actualizarPrecioTotal() {
          let caputandoTD = document.getElementById("costo" + idProducto);
          let capturandoInput = parseFloat(input.value);
          let multiplicando = capturandoInput * producto.cost;
          caputandoTD.textContent = multiplicando;
        }
    
        let input = tr.querySelector('input[type="number"]');
        input.addEventListener('input', actualizarPrecioTotal);
      });
    }
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //Condicion para que solo agrege una vez el auto de la consigna
        let arrayItems = JSON.parse(localStorage.getItem('items')) || [];
        if (arrayItems.length === 0) {
          //Cargandolo como un objeto
          const item = data.articles[0];
          const img = item.image;
          const name = item.name;
          const cost = item.unitCost;
          const agregandoItem = {
          "id" : IDinicial,
          "name" : name,
          "img" : img,
          "cost" : cost,
          "cantidad" : "1"
          }
        //Actualizando array items
        arrayItems.push(agregandoItem);
        localStorage.setItem('items', JSON.stringify(arrayItems));
        } else {
        agregandoItems();
        
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  });
  