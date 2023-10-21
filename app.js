var usuarios=Array();
var currentIndex = -1; // Índice del elemento actual
function bloquearFormulario() {
    // Obtiene todos los elementos del formulario
    var elementosFormulario = document.getElementById("formulario").elements;
    // Itera a través de los elementos y los deshabilita
    for (var i = 0; i < elementosFormulario.length; i++) {
      elementosFormulario[i].disabled = true;
    }
  }

  function desbloquearFormulario() {
    // Obtiene todos los elementos del formulario
    var elementosFormulario = document.getElementById("formulario").elements;
    // Itera a través de los elementos y los habilita
    for (var i = 0; i < elementosFormulario.length; i++) {
        elementosFormulario[i].disabled = false;
    }
}

function nuevo() {
    // Habilitar los controles del formulario para agregar un nuevo elemento
    desbloquearFormulario();
    document.getElementById("formulario").reset();
}

function cancelar() {
  bloquearFormulario();
  // Revertir el formulario a la última ubicación en el array
  if (usuarios.length > 0) {
      var ultimoUsuario = usuarios[usuarios.length - 1]; // Obtener el último usuario
      document.getElementById("nombre").value = ultimoUsuario[0];
      document.getElementById("Apellido").value = ultimoUsuario[1];
      // Restablecer el campo "opciones" seleccionando la opción adecuada
      var opcionesSelect = document.getElementById("opciones");
      for (var i = 0; i < opcionesSelect.options.length; i++) {
          if (opcionesSelect.options[i].text === ultimoUsuario[2]) {
              opcionesSelect.selectedIndex = i;
              break;
          }
      }
      var sexo = ultimoUsuario[3];
      if (sexo === "m") {
          document.getElementById("masculino").checked = true;
      } else if (sexo === "f") {
          document.getElementById("femenino").checked = true;
      }
      var egresados = ultimoUsuario[4];
      document.getElementById("egresados").checked = egresados;
  }
} 

function eliminar() {
    if (usuarios.length > 0 && currentIndex >= 0 && currentIndex < usuarios.length) {
      usuarios.splice(currentIndex, 1); // Elimina el elemento en la posición actual
  
      // Si hay elementos restantes en el array, muestra el elemento siguiente
      if (currentIndex < usuarios.length) {
        mostrarElemento();
      } else {
        // Si no quedan elementos en el array, limpia todos los campos del formulario
        document.getElementById("nombre").value = "";
        document.getElementById("Apellido").value = "";
        document.getElementById("opciones").selectedIndex = 0;
        var opcionesSexo = document.getElementsByName("sexo");
        for (var i = 0; i < opcionesSexo.length; i++) {
          opcionesSexo[i].checked = false;
        }
        document.getElementById("egresados").checked = false;
        bloquearFormulario();
      }
    }
  }
  

// Funciones para navegar por los elementos
function primerElemento() {
  if (usuarios.length > 0) {
      currentIndex = 0;
      mostrarElemento();
  }
}

function elementoAnterior() {
  if (usuarios.length > 0 && currentIndex > 0) {
      currentIndex--;
      mostrarElemento();
  }
}

function elementoSiguiente() {
  if (usuarios.length > 0 && currentIndex < usuarios.length - 1) {
      currentIndex++;
      mostrarElemento();
  }
}

function ultimoElemento() {
  if (usuarios.length > 0) {
      currentIndex = usuarios.length - 1;
      mostrarElemento();
  }
}

// Muestra los datos del elemento actual
// Muestra los datos del elemento actual
function mostrarElemento() {
    if (currentIndex >= 0 && currentIndex < usuarios.length) {
      var usuarioActual = usuarios[currentIndex];
      document.getElementById("nombre").value = usuarioActual[0];
      document.getElementById("Apellido").value = usuarioActual[1];
      
      // Corregir la selección del campo "opciones" utilizando selectedIndex
      var opcionesSelect = document.getElementById("opciones");
      for (var i = 0; i < opcionesSelect.options.length; i++) {
        if (opcionesSelect.options[i].text === usuarioActual[2]) {
          opcionesSelect.selectedIndex = i;
          break;
        }
      }
      
      document.querySelector("input[name='sexo'][value='" + usuarioActual[3] + "']").checked = true;
      document.getElementById("egresados").checked = usuarioActual[4];
    }
  }
  


function guardar(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("Apellido").value;
    let sexo = document.querySelector("input[name='sexo']:checked").value;
    let egresados = document.getElementById("egresados").checked;
    let lista = document.getElementById("opciones");
    let texto = lista.options[lista.selectedIndex].text;
    console.log(nombre);
    console.log(apellido);
    console.log(sexo);
    console.log(texto);
    console.log(egresados);
    let nuevoElemento= Array();
    nuevoElemento.push(nombre);
    nuevoElemento.push(apellido);
    nuevoElemento.push(texto);
    nuevoElemento.push(sexo);
    nuevoElemento.push(egresados);
    usuarios.push(nuevoElemento);

    bloquearFormulario();
    return false;
}