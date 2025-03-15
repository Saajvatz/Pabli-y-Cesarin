export function handleCheckbox(checkbox, label, div) {
   
    const LabelStyle = () => {
        if (checkbox.checked) {
            label.style.textDecoration = "line-through";
        } else {
            label.style.textDecoration = "none";
        }
    };

    // Asegúrate de que el checkbox, label y div existan antes de agregar eventos.
    if (checkbox && label && div) {
        // Establecer el estilo al cargar
        LabelStyle();

        // Agregar evento de cambio al checkbox
        checkbox.addEventListener('change', LabelStyle);

        // Agregar evento de click al div para cambiar el estado del checkbox
        div.addEventListener('click', () => {
            checkbox.checked = !checkbox.checked;
            LabelStyle();  // Actualizar el estilo
        });

        // Agregar evento de mouseover al div
        div.addEventListener('mouseover', () => {
            label.style.textDecoration = "line-through";
        });

       
        div.addEventListener('mouseout', () => {
            if (!checkbox.checked) {
                label.style.textDecoration = "none";
            }
        });
    } else {
        console.error('Uno o más elementos no están definidos.');
    }
}
