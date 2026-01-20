/**
 * StarWarsChallenge - Main Control Logic
 */

// --- 1. Element-Selektoren ---
const introOverlay = document.getElementById('intro-overlay');
const startBtn = document.getElementById('start-btn');
const crawlContainer = document.querySelector('.crawl-container');
const introMusic = document.getElementById('introTheme');
const forceMusic = document.getElementById('forceTheme');

// NEU: Selektor für den Skip-Hinweis
const skipHint = document.getElementById('skip-hint'); 

const fileInput = document.getElementById('fileInput');
const codeOutput = document.getElementById('codeOutput');
const codeDisplayArea = document.getElementById('codeDisplayArea');
const fileNameSpan = document.getElementById('fileName');
const fileChosenText = document.getElementById('file-chosen');
const downloadBtn = document.getElementById('downloadBtn');
const musicToggleBtn = document.getElementById('musicToggle');

// --- 2. Intro & Musik-Management ---

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    crawlContainer.classList.remove('hidden');
    
    // Musik starten
    introMusic.play().catch(err => console.error("Autoplay verhindert:", err));

    // NEU: Erscheinen des Skip-Hinweises nach 5 Sekunden Verzögerung
    setTimeout(() => {
        if (skipHint) skipHint.classList.remove('hidden');
    }, 5000);

    // Automatische Beendigung nach dem Crawl (jetzt auf 25s synchronisiert)
    setTimeout(fadeOutIntro, 50000);
});

/**
 * Funktion zum Ausblenden des Intros
 */
function fadeOutIntro() {
    introOverlay.classList.add('fade-out');
    document.body.classList.add('main-view-active');
    const fadeAudio = setInterval(() => {
        if (introMusic.volume > 0.1) {
            introMusic.volume -= 0.1;
        } else {
            introMusic.pause();
            clearInterval(fadeAudio);
            
            // Startet die Hintergrundmusik der Landingpage
            forceMusic.play().catch(e => console.log("Audio-Interaktion erforderlich")); 
            forceMusic.volume = 0.5;
        }
    }, 200);
}

// Ermöglicht das Überspringen des Intros durch Doppelklick
introOverlay.addEventListener('dblclick', fadeOutIntro);

musicToggleBtn.addEventListener('click', () => {
    if (forceMusic.paused) {
        forceMusic.play();
        musicToggleBtn.textContent = "Mute Theme";
    } else {
        forceMusic.pause();
        musicToggleBtn.textContent = "Play Theme";
    }
});

// --- 3. Datei-Operationen ---

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        fileChosenText.textContent = file.name;
        if (file.name.endsWith('.js')) {
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
    }
});

downloadBtn.addEventListener('click', () => {
    const code = codeOutput.textContent;
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileNameSpan.textContent || 'challenge.js';
    a.click();
    URL.revokeObjectURL(url);
});