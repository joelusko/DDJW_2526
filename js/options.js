document.addEventListener('DOMContentLoaded', () => {
    const modeSelect = document.getElementById('mode-select');
    const extraMode2 = document.getElementById('extra-mode2');
    const groupSizeSelect = document.getElementById('group-size');
    const startLevelSelect = document.getElementById('start-level');
    const saveBtn = document.getElementById('save-config');
    const backBtn = document.getElementById('back-menu');

    // 1. Cargar configuración previa si existe
    let config = JSON.parse(sessionStorage.getItem('config')) || { mode: 1, groupSize: 2, level: 1 };
    
    modeSelect.value = config.mode;
    groupSizeSelect.value = config.groupSize || 2;
    startLevelSelect.value = config.level || 1;

    // Función para mostrar/ocultar opciones según el modo (Requisito 4.a.iii)
    function updateUI() {
        if (modeSelect.value == "2") {
            extraMode2.classList.remove('hidden');
        } else {
            extraMode2.classList.add('hidden');
        }
    }

    modeSelect.addEventListener('change', updateUI);
    updateUI(); // Ejecutar al cargar

    // 2. Guardar al hacer clic
    saveBtn.addEventListener('click', () => {
        config.mode = parseInt(modeSelect.value);
        config.groupSize = parseInt(groupSizeSelect.value);
        config.level = parseInt(startLevelSelect.value);

        sessionStorage.setItem('config', JSON.stringify(config));
        alert("Configuració guardada correctament!");
    });

    backBtn.addEventListener('click', () => {
        window.location.assign("../index.html");
    });
});