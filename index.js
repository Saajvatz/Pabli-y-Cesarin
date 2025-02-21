import { header } from "./componentes/header/header.js";
import { contenedor } from "./componentes/tarea/tarea.js";
import { formulario } from "./componentes/formulario/for.js";


let DOM = document.querySelector("#root")

function cargarDOM(){
  
DOM.appendChild(header());
DOM.appendChild(contenedor());
DOM.appendChild(formulario());
  
}
cargarDOM();
