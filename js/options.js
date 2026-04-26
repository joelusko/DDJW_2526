<!DOCTYPE html>
<html lang="ca">
<head>
    <meta charset="UTF-8">
    <title>Memory - Opcions</title>
    <script src="../js/options.js" type="module"></script>
    <style>
        body { background-color: #222; color: white; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; padding: 20px; }
        .config-container { background-color: #333; padding: 30px; border-radius: 10px; width: 400px; text-align: center; }
        select, button { width: 100%; padding: 10px; margin: 10px 0; border-radius: 5px; border: none; font-weight: bold; }
        .btn-save { background-color: #4CAF50; color: white; cursor: pointer; }
        .btn-back { background-color: #555; color: white; cursor: pointer; }
        .hidden { display: none; } /* Para ocultar opciones según el modo */
    </style>
</head>
<body>
    <div class="config-container">
        <h1>Configuració</h1>

        <label for="mode-select">Mode de Joc:</label>
        <select id="mode-select">
            <option value="1">Modo 1 (Nivell Únic)</option>
            <option value="2">Modo 2 (Progressiu)</option>
        </select>

        <label for="group-size">Mida del grup (Parelles, trios...):</label>
        <select id="group-size">
            <option value="2">Parelles (2)</option>
            <option value="3">Trios (3)</option>
            <option value="4">Quartets (4)</option>
        </select>

        <div id="extra-mode2" class="hidden">
            <label for="start-level">Nivell inicial (Modo 2):</label>
            <select id="start-level">
                <option value="1">Nivell 1</option>
                <option value="2">Nivell 2</option>
                <option value="3">Nivell 3</option>
            </select>
        </div>

        <button id="save-config" class="btn-save">Guardar Configuració</button>
        <button id="back-menu" class="btn-back">Tornar al Menú</button>
    </div>
</body>
</html>