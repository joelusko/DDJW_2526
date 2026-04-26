document.addEventListener('DOMContentLoaded', () => {
    const modeSelect = document.getElementById('mode-select');
    const extraMode2 = document.getElementById('extra-mode2');
    const groupSizeSelect = document.getElementById('group-size');
    const startLevelSelect = document.getElementById('start-level');
    const saveBtn = document.getElementById('save-config');
    const backBtn = document.getElementById('back-menu');

    let config = JSON.parse(sessionStorage.getItem('config')) || { mode: 1, groupSize: 2, level: 1 };
    
    modeSelect.value = config.mode;
    groupSizeSelect.value = config.groupSize || 2;
    startLevelSelect.value = config.level || 1;

    function updateUI() {
        if (modeSelect.value == "2") {
            extraMode2.classList.remove('hidden');
        } else {
            extraMode2.classList.add('hidden');
        }
    }

    modeSelect.addEventListener('change', updateUI);
    updateUI();

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