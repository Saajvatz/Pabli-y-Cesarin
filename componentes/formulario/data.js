async function obtenerDatos() {
    try {
        const response = await fetch('http://localhost:5000/data'); // Asegúrate de que la URL sea correcta

       
        if (!response.ok) {
            throw new Error(`Error en la red: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); 

       
        const dataList = document.getElementById('data-list');
        if (!dataList) {
            console.error('El elemento con ID "data-list" no existe en el DOM.');
            return;
        }

        dataList.innerHTML = ''; 
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(item => {
                
                if (item.name) {
                    const li = document.createElement('li');
                    li.textContent = item.name; 
                    dataList.appendChild(li);
                } else {
                    console.warn('El objeto no tiene el campo "name":', item);
                }
            });
        } else {
            console.warn('Los datos no son un array o están vacíos:', data);
            dataList.innerHTML = '<li>No hay datos disponibles</li>';
        }
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}


obtenerDatos();