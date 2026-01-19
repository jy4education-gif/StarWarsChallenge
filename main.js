const fileInput = document.getElementById('fileInput');
const codeOutput = document.getElementById('codeOutput');
const codeDisplayArea = document.getElementById('codeDisplayArea');
const fileNameSpan = document.getElementById('fileName');
const music = document.getElementById('forceTheme');
const musicBtn = document.getElementById('musicToggle');

// 1. Musik-Steuerung
musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicBtn.textContent = "Mute Theme";
    } else {
        music.pause();
        musicBtn.textContent = "Play Theme";
    }
});

// 2. File Upload Handling
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.js')) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            codeOutput.textContent = e.target.result;
            fileNameSpan.textContent = file.name;
            codeDisplayArea.classList.remove('hidden');
        };
        
        reader.readAsText(file);
    } else {
        alert("Bitte lade eine gültige .js Datei hoch.");
    }
});

// 3. Download Funktion (Blob)
document.getElementById('downloadBtn').addEventListener('click', () => {
    const code = codeOutput.textContent;
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNameSpan.textContent || 'challenge.js';
    a.click();
    URL.revokeObjectURL(url);
});