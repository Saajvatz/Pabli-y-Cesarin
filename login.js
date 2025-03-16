function crearFormulario(tipo, cargarContenidoPrincipal) {
    let contenedor = document.createElement("section");
    contenedor.className = "auth-container";

    let formulario = document.createElement("form");
    formulario.id = tipo === "login" ? "login-form" : "register-form";

    const campos = [
        { label: "Usuario", type: "text", id: "username", required: true },
        ...(tipo === "register" ? [{ label: "Correo", type: "email", id: "email", required: true }] : []),
        { label: "Contraseña", type: "password", id: "password", required: true }
    ];

    campos.forEach(({ label, type, id, required }) => {
        let grupo = document.createElement("div");
        grupo.className = "input-group";

        let etiqueta = document.createElement("label");
        etiqueta.htmlFor = id;
        etiqueta.textContent = label;

        let input = document.createElement("input");
        input.type = type;
        input.id = id;
        input.name = id;
        input.required = required;

        grupo.appendChild(etiqueta);
        grupo.appendChild(input);
        formulario.appendChild(grupo);
    });

    let botonEnvio = document.createElement("button");
    botonEnvio.type = "submit";
    botonEnvio.textContent = tipo === "login" ? "Ingresar" : "Registrarse";
    formulario.appendChild(botonEnvio);

    if (tipo === "login") {
        let botonRegistro = document.createElement("button");
        botonRegistro.type = "button";
        botonRegistro.textContent = "Registrarse";
        botonRegistro.addEventListener("click", () => {
            contenedor.innerHTML = "";
            contenedor.appendChild(crearFormulario("register", cargarContenidoPrincipal));
        });
        formulario.appendChild(botonRegistro);
    }

    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault();
        
        let datos = {};
        campos.forEach(({ id }) => {
            datos[id] = document.getElementById(id).value.trim();
        });

        if (Object.values(datos).some(valor => !valor)) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/${tipo}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            const data = await response.json();

            if (response.ok) {
                cargarContenidoPrincipal();  // Solo se llama si la respuesta es exitosa
            } else {
                alert(data.error || "Hubo un problema, intenta de nuevo.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema con la conexión.");
        }
    });

    contenedor.appendChild(formulario);
    return contenedor;
}

export { crearFormulario };
