
const usuarios = [
    { id: 1, usuario: 'usuario1', clave: '1234' },
    { id: 2, usuario: 'usuario2', clave: '5678' },
    { id: 3, usuario: 'usuario3', clave: '9101' },
    { id: 4, usuario: 'usuario4', clave: '1121' },
    { id: 5, usuario: 'usuario5', clave: '3141' }
];

// validación
function validarLogin(event) {
    event.preventDefault(); 

    const usuarioInput = document.getElementById('usuario').value;
    const claveInput = document.getElementById('clave').value;
    const mensaje = document.getElementById('message');

    // Obtener el número de intentos fallidos del localStorage
    let intentosFallidos = parseInt(localStorage.getItem(usuarioInput), 10);

    // `intentosFallidos debe ser numero`
    if (isNaN(intentosFallidos)) {
        intentosFallidos = 0;
    }

    // Verificar credenciales de usuario
    const usuario = usuarios.find(user => user.usuario === usuarioInput && user.clave === claveInput);

    if (intentosFallidos >= 3) {
        /*mensaje.textContent = 'Tres intentos fallidos. El usuario ha sido bloqueado.';
        mensaje.style.color = 'red';*/ //No pude hacer desaparecer mensaje al ingresar nuevo usuario
        alert('Usuario bloqueado');
    } else {
        if (usuario) {
            mensaje.textContent = 'Inicio de sesión exitoso !Bienvenido!';
            mensaje.style.color = 'green';
            localStorage.removeItem(usuarioInput); // Limpiar el contador if true
        } else {
            // Incrementar el contador de intentos fallidos
            intentosFallidos += 1;
            localStorage.setItem(usuarioInput, intentosFallidos.toString());     
            alert('Usuario o clave incorrectos. Intentos fallidos: ' + intentosFallidos);
        }
    } 
}


document.getElementById('loginForm').addEventListener('submit', validarLogin);
