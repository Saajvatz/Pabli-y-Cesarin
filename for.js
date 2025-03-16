import { handleCheckbox } from "./checkbox.js";

// Constantes para URLs y clases CSS
const API_URL = 'http://localhost:5000/tareas';
const CLASS_FORM_TAREAS = "form_tareas";
const CLASS_DIV_TAREAS = "div_tareas";
const CLASS_CONTENEDOR_FORM = "contenedor_form";
const CLASS_FORM_CREAR_TAREA = "form_crear_tarea";
const CLASS_INPUT_TAREA = "input_tarea";
const CLASS_BOTON_AGREGAR = "boton_agregar";

// Función para obtener tareas desde la API
async function obtenerTareas() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        alert("Hubo un problema al obtener las tareas.");
        return [];
    }
}

// Función para crear un elemento de tarea
function crearElementoTarea(tarea, index) {
    const div = document.createElement("div");
    div.className = CLASS_DIV_TAREAS;

    div.innerHTML = `
        <input type="checkbox" id="tarea-${index}" ${tarea.estado === 'Completada' ? 'checked' : ''}>
        <label for="tarea-${index}">${tarea.nombre}</label>
    `;

    const checkbox = div.querySelector(`#tarea-${index}`);
    const label = div.querySelector(`label[for="tarea-${index}"]`);

    handleCheckbox(checkbox, label, div);
    return div;
}

// Función para renderizar el formulario de tareas
async function renderizarFormularioTareas() {
    const footer = document.createElement("footer");
    footer.className = CLASS_FORM_TAREAS;

    const tareas = await obtenerTareas();
    tareas.forEach((tarea, index) => {
        const elemento = crearElementoTarea(tarea, index);
        footer.appendChild(elemento);
    });

    return footer;
}

// Función para crear el formulario de agregar tarea
function crearFormularioAgregarTarea() {
    const divContenedor = document.createElement("div");
    divContenedor.className = CLASS_CONTENEDOR_FORM;

    const form = document.createElement("form");
    form.className = CLASS_FORM_CREAR_TAREA;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nueva tarea";
    input.className = CLASS_INPUT_TAREA;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Agregar";
    button.className = CLASS_BOTON_AGREGAR;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const tareaNombre = input.value.trim();

        if (tareaNombre) {
            const nuevaTarea = await agregarTarea(tareaNombre, "Pendiente");
            if (nuevaTarea) {
                const nuevoFormulario = await renderizarFormularioTareas();
                document.querySelector(`.${CLASS_FORM_TAREAS}`).replaceWith(nuevoFormulario);
                input.value = "";
            }
        } else {
            alert("Por favor ingrese un nombre para la tarea.");
        }
    });

    form.appendChild(input);
    form.appendChild(button);
    divContenedor.appendChild(form);

    return divContenedor;
}

// Función para agregar una tarea a la API
async function agregarTarea(nombre, estado) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, estado }),
        });

        if (!response.ok) {
            const errorDetails = await response.text();
            throw new Error(`Error al agregar la tarea: ${errorDetails}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al agregar la tarea. Revisa la consola para más detalles.');
        return null;
    }
}

// Exportar funciones principales
export { crearFormularioAgregarTarea, renderizarFormularioTareas };
