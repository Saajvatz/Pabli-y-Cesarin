function agregarCuadro() {
    const contenedor = document.getElementById('contenedor');
    const nuevoCuadro = document.createElement('div');
    nuevoCuadro.classList.add('cuadro');
    nuevoCuadro.textContent = contenedor.children.length + 1;
    contenedor.appendChild(nuevoCuadro);
}

export {agregarCuadro}