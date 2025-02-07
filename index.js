import { header } from "./componentes/header/header.js";
import { tarea } from "./componentes/tarea/tarea.js";
import { formulario } from "./componentes/formulario/for.js";


let DOM = document.querySelector("#root")

DOM.appendChild(header());
DOM.appendChild(tarea());
DOM.appendChild(formulario());