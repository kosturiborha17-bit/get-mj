// GET MJ - Client Interactive Systems Module v1.0.4

document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Time & Weather Widget Setup
    const liveTimeEl = document.getElementById('live-time');
    const liveTempEl = document.getElementById('live-temp');
    
    function updateLiveWidget() {
        // Date & Time
        const now = new Date();
        if (liveTimeEl) {
            liveTimeEl.textContent = now.toTimeString().split(' ')[0];
        }
        
        // Mock Weather rotation
        if (liveTempEl) {
            const cities = ["Cyber City", "Neo Tokyo", "San Francisco", "Bengaluru", "London"];
            const weatherSymbols = ["⛅", "🌧️", "⚡", "🔮", "❄️"];
            const currentHour = now.getHours();
            const cityIndex = currentHour % cities.length;
            const tempVal = 18 + (currentHour % 14);
            liveTempEl.textContent = `${weatherSymbols[cityIndex]} ${cities[cityIndex]}: ${tempVal}°C`;
        }
    }
    setInterval(updateLiveWidget, 1000);
    updateLiveWidget();

    // 2. Automated Active Node Generator
    const syncNodesEl = document.getElementById('sync-nodes');
    if (syncNodesEl) {
        setInterval(() => {
            const currentNodes = parseInt(syncNodesEl.textContent.replace(/,/g, ''));
            const deviation = Math.floor(Math.random() * 7) - 3;
            syncNodesEl.textContent = (currentNodes + deviation).toLocaleString();
        }, 4000);
    }

    // 3. Patch Update Toast Logic
    const updateToast = document.getElementById('update-toast');
    const closeToastBtn = document.getElementById('close-toast');
    if (updateToast) {
        // Show update notification after 2 seconds
        setTimeout(() => {
            updateToast.classList.remove('hidden');
        }, 2000);
        
        // Auto dismiss after 10 seconds
        const autoDismiss = setTimeout(() => {
            updateToast.classList.add('hidden');
        }, 10000);

        closeToastBtn?.addEventListener('click', () => {
            clearTimeout(autoDismiss);
            updateToast.classList.add('hidden');
        });
    }

    // 4. Mood alignment controller
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodText = document.getElementById('mood-text');
    const moodResponses = {
        laser: '"Laser Focus Mode activated. Low latency responses. No filler text. Only clean productivity."',
        creative: '"Creative Chaos initiated. Expect divergent thinking, wild tangents, and unconventional design solutions. Write with color."',
        chill: '"Chill state enabled. Ambient sounds optimized. Responses slowed to a relaxing human rhythm. Breathe in, code out."',
        toxic: '"Toxic AI protocol configured. Disabling polite barriers. Getting straight to your design and code flaws with critical precision."'
    };

    moodBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            moodBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedMood = btn.getAttribute('data-mood');
            if (moodText && moodResponses[selectedMood]) {
                moodText.textContent = moodResponses[selectedMood];
            }
        });
    });

    // 5. Multi-Tab controller (Workspace)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTabId = `tab-${btn.getAttribute('data-tab')}`;
            const targetContent = document.getElementById(targetTabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 6. Binaural Beats Simulator
    const playBtnSim = document.getElementById('play-btn-sim');
    const playbackStatus = document.getElementById('playback-status');
    const eqContainer = document.querySelector('.equalizer-bar-container');
    let isPlaying = false;

    playBtnSim?.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playBtnSim.textContent = "⏸ Pause Beats";
            playbackStatus.textContent = "Streaming 120Hz waves";
            playbackStatus.style.color = "var(--accent)";
            eqContainer?.classList.add('eq-active');
        } else {
            playBtnSim.textContent = "▶ Play Synth";
            playbackStatus.textContent = "Stopped";
            playbackStatus.style.color = "var(--text-muted)";
            eqContainer?.classList.remove('eq-active');
        }
    });

    // 7. Encrypted Local Journal saver
    const journalInput = document.getElementById('journal-input');
    const saveJournalBtn = document.getElementById('save-journal-btn');
    const journalStatus = document.getElementById('journal-status');

    // Load saved draft
    if (journalInput) {
        const savedDraft = localStorage.getItem('mj_journal_draft');
        if (savedDraft) {
            journalInput.value = savedDraft;
        }
    }

    saveJournalBtn?.addEventListener('click', () => {
        if (journalInput) {
            localStorage.setItem('mj_journal_draft', journalInput.value);
            if (journalStatus) {
                journalStatus.textContent = "Encrypted Local Draft Saved!";
                setTimeout(() => {
                    journalStatus.textContent = "";
                }, 3000);
            }
        }
    });

    // 8. Whiteboard Interactive Canvas
    const canvas = document.getElementById('whiteboard-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let drawing = false;
        const colorInput = document.getElementById('canvas-color');
        const sizeInput = document.getElementById('canvas-size');
        const clearBtn = document.getElementById('clear-canvas');

        // Set initial line parameters
        function initCanvasStyles() {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
        initCanvasStyles();

        // Get coordinates relative to canvas
        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            // support touch & mouse events
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: (clientX - rect.left) * (canvas.width / rect.width),
                y: (clientY - rect.top) * (canvas.height / rect.height)
            };
        }

        function startDrawing(e) {
            drawing = true;
            ctx.beginPath();
            const pos = getMousePos(e);
            ctx.moveTo(pos.x, pos.y);
            // Draw a single dot on tap
            draw(e);
        }

        function draw(e) {
            if (!drawing) return;
            e.preventDefault(); // prevent scrolling on mobile while drawing
            const pos = getMousePos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = colorInput ? colorInput.value : '#00F2FF';
            ctx.lineWidth = sizeInput ? sizeInput.value : 3;
            ctx.stroke();
        }

        function stopDrawing() {
            drawing = false;
        }

        // Mouse Listeners
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        // Touch Listeners (Mobile compatibility)
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        // Clear canvas functionality
        clearBtn?.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            initCanvasStyles();
        });
    }

    // 9. Interactive Local Chat System
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatUserInput = document.getElementById('chat-user-input');
    const chatMessages = document.getElementById('chat-messages');

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${sender}`;
        msgDiv.textContent = text;
        chatMessages?.appendChild(msgDiv);
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function getAIResponse(prompt) {
        const cleanPrompt = prompt.toLowerCase().trim();
        if (cleanPrompt.includes('help') || cleanPrompt.includes('focus')) {
            return "🎯 Tip: Switch on Laser Focus mood. Draft your main target, turn off phone notifications, and let MJ handle structural files.";
        } else if (cleanPrompt.includes('advice') || cleanPrompt.includes('bad')) {
            return "⚡ Toxic Insight: Stop spending 4 hours configuring custom CSS gradients. Pick one neon theme, implement grid layouts, and write actual working code.";
        } else if (cleanPrompt.includes('apk') || cleanPrompt.includes('download')) {
            return "📦 Head down to our Purchase section below. Complete payment using our direct UPI ID (khariya@fam) to unlock direct dashboard downloads.";
        } else {
            return "🤖 MJ Response: Process verified. Running parameters locally within safety sandbox. Connect your Phone to PC using Cloud Sync tab for external terminal execution.";
        }
    }

    sendChatBtn?.addEventListener('click', () => {
        if (chatUserInput && chatUserInput.value.trim() !== "") {
            const prompt = chatUserInput.value;
            addMessage(prompt, 'user');
            chatUserInput.value = "";
            
            // Simulating AI thought delay
            setTimeout(() => {
                const response = getAIResponse(prompt);
                addMessage(response, 'bot');
            }, 800);
        }
    });

    chatUserInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatBtn?.click();
        }
    });

    // 10. Phone-to-PC sync generator
    const generateSyncBtn = document.getElementById('generate-sync-btn');
    const syncCodeOutput = document.getElementById('sync-code-output');
    const syncCodeSpan = document.getElementById('sync-code');

    generateSyncBtn?.addEventListener('click', () => {
        const randomCode = Array.from({length: 3}, () => Math.floor(1000 + Math.random() * 9000)).join(' ');
        if (syncCodeSpan) {
            syncCodeSpan.textContent = randomCode;
        }
        syncCodeOutput?.classList.remove('hidden');
    });

    // 11. FAQ Accordion Systems
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            // Close other answers
            faqQuestions.forEach(otherQ => {
                const otherAnswer = otherQ.nextElementSibling;
                otherAnswer.style.maxHeight = null;
                otherAnswer.style.paddingTop = null;
                otherAnswer.style.paddingBottom = null;
                otherQ.querySelector('span').textContent = '+';
            });

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingTop = '10px';
                answer.style.paddingBottom = '18px';
                q.querySelector('span').textContent = '−';
            }
        });
    });

    // 12. Compliance Tabs
    const complianceTabs = document.querySelectorAll('.compliance-tab');
    const compTexts = document.querySelectorAll('.comp-text');

    complianceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            complianceTabs.forEach(t => t.classList.remove('active'));
            compTexts.forEach(txt => txt.classList.add('hidden'));

            tab.classList.add('active');
            const targetId = `comp-${tab.getAttribute('data-comp')}`;
            const targetText = document.getElementById(targetId);
            if (targetText) {
                targetText.classList.remove('hidden');
            }
        });
    });

    // 13. Secure Payment Gateway Modal & Checkout system (Paytm / UPI via khariya@fam)
    const buyBtn = document.getElementById('buy-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closePayment = document.getElementById('close-payment');
    const methodOptions = document.querySelectorAll('.method-option');
    const upiDetails = document.getElementById('upi-payment-details');
    const cardDetails = document.getElementById('card-payment-details');

    // Show modal
    buyBtn?.addEventListener('click', () => {
        paymentModal?.classList.remove('hidden');
    });

    // Hide modal
    closePayment?.addEventListener('click', () => {
        paymentModal?.classList.add('hidden');
    });

    // Switch payment methods inside modal
    methodOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            methodOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            
            const selectedMethod = opt.getAttribute('data-method');
            if (selectedMethod === 'upi') {
                upiDetails?.classList.remove('hidden');
                cardDetails?.classList.add('hidden');
            } else if (selectedMethod === 'card') {
                upiDetails?.classList.add('hidden');
                cardDetails?.classList.remove('hidden');
            }
        });
    });

    // Copy UPI ID Action
    const copyUpiBtn = document.getElementById('copy-upi-btn');
    const upiIdValue = document.getElementById('upi-id-value');
    copyUpiBtn?.addEventListener('click', () => {
        if (upiIdValue) {
            navigator.clipboard.writeText(upiIdValue.textContent).then(() => {
                copyUpiBtn.textContent = "Copied!";
                setTimeout(() => { copyUpiBtn.textContent = "Copy ID"; }, 2000);
            });
        }
    });

    // UTR / Transaction ID Verification flow
    const utrInput = document.getElementById('utr-input');
    const verifyPaymentBtn = document.getElementById('verify-payment-btn');
    const paymentErrorMsg = document.getElementById('payment-error-msg');
    const dashboardSection = document.getElementById('dashboard-section');

    verifyPaymentBtn?.addEventListener('click', () => {
        const utrVal = utrInput ? utrInput.value.trim() : "";
        if (utrVal.length === 12 && !isNaN(utrVal)) {
            // Successful checkout simulation
            if (paymentErrorMsg) {
                paymentErrorMsg.textContent = "Verifying with blockchain node... Signature confirmed!";
                paymentErrorMsg.style.color = "var(--accent)";
            }
            
            setTimeout(() => {
                paymentModal?.classList.add('hidden');
                dashboardSection?.classList.remove('hidden');
                dashboardSection?.scrollIntoView({ behavior: 'smooth' });
                
                // Show celebration toast
                if (updateToast) {
                    const toastMessage = document.getElementById('toast-message');
                    if (toastMessage) toastMessage.textContent = "Premium MJ Access Unlocked! Scroll down to download the APK.";
                    updateToast.classList.remove('hidden');
                }
            }, 1500);
        } else {
            if (paymentErrorMsg) {
                paymentErrorMsg.textContent = "Invalid Transaction reference. Please enter a 12-digit numeric UPI/UTR code.";
                paymentErrorMsg.style.color = "var(--pink)";
            }
        }
    });

    // Card Simulation Submit Action
    const cardSubmitBtn = document.getElementById('card-submit-btn');
    cardSubmitBtn?.addEventListener('click', () => {
        // Quick card success mock
        if (updateToast) {
            const toastMessage = document.getElementById('toast-message');
            if (toastMessage) toastMessage.textContent = "Card verified. MJ Premium client active!";
            updateToast.classList.remove('hidden');
        }
        paymentModal?.classList.add('hidden');
        dashboardSection?.classList.remove('hidden');
        dashboardSection?.scrollIntoView({ behavior: 'smooth' });
    });

    // License Copy Event
    const copyKeyBtn = document.getElementById('copy-key-btn');
    const licenseKeyText = document.getElementById('license-key-text');
    copyKeyBtn?.addEventListener('click', () => {
        if (licenseKeyText) {
            navigator.clipboard.writeText(licenseKeyText.textContent).then(() => {
                copyKeyBtn.textContent = "Copied!";
                setTimeout(() => { copyKeyBtn.textContent = "Copy Key"; }, 2000);
            });
        }
    });

    // Download APK simulator action
    const downloadApkBtn = document.getElementById('download-apk-btn');
    downloadApkBtn?.addEventListener('click', () => {
        alert("Preparing secure mirror connection... Downloading MJ_Pro_v1.0.4.apk (124 MB) with built-in neural weights. Keep this browser open.");
    });
});
