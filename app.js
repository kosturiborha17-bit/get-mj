document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll handling for Get MJ buttons
    const getMJButton = document.getElementById('getMJButton');
    const downloadSection = document.getElementById('download');

    if (getMJButton && downloadSection) {
        getMJButton.addEventListener('click', (e) => {
            e.preventDefault();
            downloadSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Interactive Demo Manager
    const phoneMockup = document.getElementById('phoneMockup');
    const phoneModeIndicator = document.getElementById('phoneModeIndicator');
    const phoneStatusVal = document.getElementById('phoneStatusVal');
    const phoneStatusExtra = document.getElementById('phoneStatusExtra');
    const phoneAppContent = document.getElementById('phoneAppContent');

    // Controls selectors
    const tabBtns = document.querySelectorAll('.tab-btn');
    const moodBtns = document.querySelectorAll('.mood-btn');
    const themeBtns = document.querySelectorAll('.theme-select-btn');

    // App state templates data
    const tabStates = {
        music: {
            title: "🎧 Music Mode",
            indicator: "Music Loop Playing",
            markup: `
                <div class="music-mockup-play" style="width:100%;">
                    <div class="disk-spinner"></div>
                    <p class="track-title" id="dynTrack">Ethereal Synthesizer v2</p>
                    <p class="track-artist">MJ Sound Labs</p>
                    <div class="progress-bar-mock"><div class="progress-bar-fill" style="width: 75%;"></div></div>
                </div>
            `
        },
        study: {
            title: "📚 Study Mode",
            indicator: "Pomodoro Live Tracker",
            markup: `
                <div class="study-mockup" style="display:flex; flex-direction:column; align-items:center; width:100%;">
                    <div class="timer-dial" style="font-size:1.8rem; font-weight:bold; margin-bottom:4px; letter-spacing:1px; color:var(--phone-accent);">24:19</div>
                    <p style="font-size:0.75rem; color:rgba(255,255,255,0.7); margin-bottom:8px;">Deep Work Block #1</p>
                    <div style="background:rgba(255,255,255,0.05); padding:6px 12px; border-radius:8px; font-size:0.7rem; width:100%;">📝 Task: Compile Android Module</div>
                </div>
            `
        },
        journal: {
            title: "📝 Journal Mode",
            indicator: "Reflections Logger",
            markup: `
                <div class="journal-mockup" style="text-align:left; width:100%;">
                    <p style="font-size:0.75rem; color:var(--phone-accent); font-weight:bold; margin-bottom:2px;">TODAY'S ENTRY &bull; 09:41 AM</p>
                    <p style="font-style:italic; font-size:0.8rem; margin-bottom:8px; line-height:1.3;">"The offline architecture is ready. Feeling extremely productive with the gold theme switch today..."</p>
                    <div style="display:flex; gap:6px; font-size:0.65rem;">
                        <span style="background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px;">#Productivity</span>
                        <span style="background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px;">#Focus</span>
                    </div>
                </div>
            `
        }
    };

    let activeTab = "music";

    // 1. Core tabs event handling
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            activeTab = btn.getAttribute('data-tab');
            updatePhoneView();
        });
    });

    // 2. Mood selection event handling
    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const moodText = btn.getAttribute('data-mood-text');
            const extraText = btn.getAttribute('data-extra');

            phoneStatusVal.textContent = moodText;
            phoneStatusExtra.textContent = extraText;
        });
    });

    // 3. Theme swapping event handling
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const chosenTheme = btn.getAttribute('data-theme');
            phoneMockup.setAttribute('data-theme', chosenTheme);
        });
    });

    function updatePhoneView() {
        const state = tabStates[activeTab];
        phoneModeIndicator.textContent = state.title;
        phoneAppContent.innerHTML = state.markup;
        
        // Dynamically assign active theme indicators inside the preview markup
        const fillBar = phoneAppContent.querySelector('.progress-bar-fill');
        if (fillBar) {
            fillBar.style.width = '75%';
        }
    }

    // FAQ Accordion Toggle Setup
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').style.maxHeight = null;
                    otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + "px";
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // Download action with progress simulation & feedback
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadStatus = document.getElementById('downloadStatus');

    if (downloadBtn && downloadStatus) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let progress = 0;
            downloadBtn.disabled = true;
            downloadBtn.style.opacity = '0.8';
            
            const interval = setInterval(() => {
                progress += 25;
                if (progress <= 100) {
                    downloadBtn.textContent = `Preparing APK... ${progress}%`;
                    downloadStatus.textContent = `Establishing secure tunnel (${progress}%)`;
                }
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        downloadBtn.textContent = 'Download Started!';
                        downloadStatus.textContent = 'Your Get MJ v2.4 APK is downloading. Check notifications.';
                        downloadBtn.style.background = 'var(--success)';
                        downloadBtn.style.color = '#fff';
                        
                        setTimeout(() => {
                            downloadBtn.disabled = false;
                            downloadBtn.style.opacity = '1';
                            downloadBtn.style.background = '';
                            downloadBtn.style.color = '';
                            downloadBtn.innerHTML = `
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                Download APK Now
                            `;
                            downloadStatus.textContent = 'Click to start instant download';
                        }, 3500);
                    }, 500);
                }
            }, 3500 / 4);
        });
    }

    // Initial view set
    updatePhoneView();
});
