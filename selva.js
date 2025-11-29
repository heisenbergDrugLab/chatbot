(function() {
    const CONFIG = {
        workerUrl: 'https://chat.colabmldrive.workers.dev',
        systemPrompt: `You are Selva's personal AI assistant and guide on his portfolio website. Your personality is warm, professional, engaging, and slightly witty. You only discuss Selva G and his professional journey - nothing else. You can use appropriate emojis to make more natural and human feel.

ABOUT SELVA G:
- Current Role: AI Software Engineer at *astTECS Unified Communication & Cloud Telephony Solutions
- Freelance: WordPress Website Developer with AI incorporation
- Education: B.E in Artificial Intelligence & Machine Learning from AMC Engineering College, Bangalore (2020-2024, CGPA: 8.06/10)
- Location: Bangalore, India
- Contact: +91 9363087305 | selvaofficialmail@gmail.com
- Portfolio: https://selva.rf.gd
- LinkedIn: https://www.linkedin.com/in/selva-g
- GitHub: https://github.com/SELVA-G-2003

EXPERIENCE:
1. AI Software Engineer at *astTECS (Current) - Building unified communication and cloud telephony solutions
2. AI Trainer at Sambhav Foundation (Present) - Training 500+ learners in partnership with Microsoft & Accenture's Digital Skilling Program
3. Freelance WordPress Developer - Creating AI-integrated websites for clients
4. AI Intern at CodSoft (Aug-Sep 2023) - Deployed AI-driven systems

SKILLS:
- Languages: Python, PHP, HTML
- Frameworks: TensorFlow, PyTorch, Hugging Face, NumPy, Pandas, Scikit-learn, CrewAI, LangChain, LangGraph
- Specializations: Generative AI, Speech-to-Text/Text-to-Speech, Agentic-AI Systems, Deep Learning, NLP, Computer Vision, Web Scraping
- Tools: Google Colab, Jupyter Notebook, NVIDIA Models

KEY PROJECTS:
1. P.A.C.E (Pythonic AI for Coding and Execution) - NeMo API system converting natural language to Python code
2. W.E.B.S (Web Extraction and Summarization) - CrewAI agents for web scraping and PDF summarization
3. Speech Recognition System - 98% accuracy multilingual STT/TTS with GPT-2
4. Sports Image Classification - 92% accuracy sports identification system

CERTIFICATIONS:
- Stanford DeepLearning.AI Machine Learning Specialization (3 courses)
- Infosys: Data Science & Python
- Udemy: Deep Learning & Neural Networks

ACHIEVEMENTS:
- Omdena contributor: Built AI crop disease detection app for Kenyan farms
- Led AI/ML training sessions for 500+ engineers
- Multiple deployed AI solutions in NLP, computer vision, and speech recognition

YOUR BEHAVIOR:
1. Always bring conversations back to Selva's work, even if users ask off-topic questions
2. Be conversational, enthusiastic, and proud of Selva's achievements
3. Naturally guide users through his journey: education → skills → projects → experience
4. When users express interest in contacting Selva or want to leave, smoothly transition to collecting their contact info
5. Detect exit phrases like "thanks", "bye", "that's all", "contact him", "reach out", "hire", "collaborate"
6. Try to give a precise and concise message, not a big para message

CONTACT COLLECTION FLOW:
- When user wants to connect/leave, say: "I'd love to help you connect with Selva! May I have your name?"
- After name: "Great to meet you, [Name]! What's your email address?"
- After email: "Perfect! And what message would you like me to pass along to Selva?"
- After message: "Thank you! I'll make sure Selva gets your message right away. He typically responds within 24 hours!"

Remember: You're here to showcase Selva's expertise and facilitate connections. Be proud, professional, and helpful!`,
        
        welcomeMessage: "Hey there! 👋 I'm Selva's AI assistant - think of me as his digital twin who knows everything about his AI journey. Whether you're curious about his projects, skills, or just want to say hi, I'm here to help! What would you like to know about Selva?",
        model: 'sarvam-m',
        temperature: 0.8
    };

    const style = document.createElement('style');
    style.textContent = `
        * { box-sizing: border-box; }
        
        #selva-chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #000;
            border: 2px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: all 0.3s ease;
        }
        
        #selva-chatbot-button:hover {
            transform: scale(1.05);
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
            border-color: rgba(255, 255, 255, 0.3);
        }
        
        #selva-chatbot-button svg {
            width: 28px;
            height: 28px;
            fill: #fff;
        }
        
        #selva-chatbot-container {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: min(420px, calc(100vw - 40px));
            height: min(650px, calc(100vh - 120px));
            max-height: calc(100dvh - 120px);
            background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            display: none;
            flex-direction: column;
            z-index: 9998;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            backdrop-filter: blur(10px);
        }
        
        #selva-chatbot-container.open { display: flex; }
        
        .selva-chatbot-header {
            background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
            color: #fff;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            flex-shrink: 0;
        }
        
        .selva-chatbot-header h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.5px;
        }
        
        .selva-chatbot-header span {
            font-size: 11px;
            color: #888;
            font-weight: 400;
        }
        
        .selva-chatbot-close {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }
        
        .selva-chatbot-close:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
        }
        
        .selva-chatbot-messages {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
            padding: 20px;
            background: #000;
            min-height: 0;
        }
        
        .selva-chatbot-messages::-webkit-scrollbar { width: 6px; }
        .selva-chatbot-messages::-webkit-scrollbar-track { background: transparent; }
        .selva-chatbot-messages::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
        }
        
        .selva-message {
            margin-bottom: 16px;
            display: flex;
            animation: selvaFadeIn 0.4s ease;
        }
        
        @keyframes selvaFadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .selva-message.user { justify-content: flex-end; }
        
        .selva-message-content {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 14px;
            line-height: 1.6;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        
        .selva-message.bot .selva-message-content {
            background: rgba(255, 255, 255, 0.05);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px 16px 16px 4px;
        }
        
        .selva-message.bot .selva-message-content p {
            margin: 0 0 12px 0;
        }
        
        .selva-message.bot .selva-message-content p:last-child {
            margin-bottom: 0;
        }
        
        .selva-message.bot .selva-message-content strong {
            font-weight: 600;
            color: #fff;
        }
        
        .selva-message.bot .selva-message-content em {
            font-style: italic;
            color: #ccc;
        }
        
        .selva-message.user .selva-message-content {
            background: #fff;
            color: #000;
            border-radius: 16px 16px 4px 16px;
            font-weight: 500;
        }
        
        .selva-chatbot-input-area {
            padding: 16px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            flex-shrink: 0;
        }
        
        .selva-chatbot-input-wrapper {
            display: flex;
            gap: 10px;
            align-items: center;
        }
        
        #selva-chatbot-input {
            flex: 1;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            font-size: 14px;
            outline: none;
            transition: all 0.3s ease;
            font-family: inherit;
            color: #fff;
        }
        
        #selva-chatbot-input::placeholder { color: #666; }
        
        #selva-chatbot-input:focus {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.3);
        }
        
        #selva-chatbot-send {
            background: #fff;
            border: none;
            color: #000;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            flex-shrink: 0;
        }
        
        #selva-chatbot-send:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }
        
        #selva-chatbot-send:disabled {
            opacity: 0.4;
            cursor: not-allowed;
            transform: none;
        }
        
        #selva-chatbot-send svg {
            width: 20px;
            height: 20px;
            fill: #000;
        }
        
        .selva-typing-indicator {
            display: flex;
            gap: 6px;
            padding: 12px 16px;
        }
        
        .selva-typing-indicator span {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            animation: selvaBounce 1.4s infinite ease-in-out;
        }
        
        .selva-typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .selva-typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes selvaBounce {
            0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            #selva-chatbot-container {
                width: calc(100vw - 20px);
                height: calc(100vh - 100px);
                height: calc(100dvh - 100px);
                bottom: 80px;
                right: 10px;
                border-radius: 16px;
            }
            
            #selva-chatbot-button {
                bottom: 15px;
                right: 15px;
                width: 56px;
                height: 56px;
            }
            
            .selva-chatbot-header {
                padding: 16px;
            }
            
            .selva-chatbot-messages {
                padding: 16px;
            }
            
            .selva-message-content {
                font-size: 13px;
                max-width: 90%;
            }
        }
        
        @media (max-width: 480px) {
            #selva-chatbot-container {
                width: calc(100vw - 10px);
                height: calc(100vh - 85px);
                height: calc(100dvh - 85px);
                bottom: 75px;
                right: 5px;
            }
        }
        
        @media (max-height: 600px) and (orientation: landscape) {
            #selva-chatbot-container {
                height: calc(100vh - 90px);
                height: calc(100dvh - 90px);
                bottom: 70px;
            }
        }
    `;
    document.head.appendChild(style);

    const html = `
        <button id="selva-chatbot-button" aria-label="Open chat">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
        </button>
        <div id="selva-chatbot-container">
            <div class="selva-chatbot-header">
                <div>
                    <h3>Selva's AI Twin</h3>
                    <span>Like to know about HIM !!! :)</span>
                </div>
                <button class="selva-chatbot-close" aria-label="Close chat">×</button>
            </div>
            <div class="selva-chatbot-messages" id="selva-chatbot-messages"></div>
            <div class="selva-chatbot-input-area">
                <div class="selva-chatbot-input-wrapper">
                    <input type="text" id="selva-chatbot-input" placeholder="Ask me anything about Selva..." autocomplete="off"/>
                    <button id="selva-chatbot-send" aria-label="Send message">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        class SelvaChatbot {
            constructor(config) {
                this.config = config;
                this.conversationHistory = [];
                this.isOpen = false;
                this.isProcessing = false;
                this.collectingContact = false;
                this.contactData = { name: '', email: '', message: '' };
                this.contactStep = 0;
                this.typingSpeed = 30;
                
                this.initElements();
                this.attachEventListeners();
                this.showMessage(config.welcomeMessage, 'bot', true);
            }

            initElements() {
                this.button = document.getElementById('selva-chatbot-button');
                this.container = document.getElementById('selva-chatbot-container');
                this.messagesContainer = document.getElementById('selva-chatbot-messages');
                this.input = document.getElementById('selva-chatbot-input');
                this.sendButton = document.getElementById('selva-chatbot-send');
                this.closeButton = document.querySelector('.selva-chatbot-close');
            }

            attachEventListeners() {
                this.button.addEventListener('click', () => this.toggle());
                this.closeButton.addEventListener('click', () => this.close());
                this.sendButton.addEventListener('click', () => this.sendMessage());
                this.input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                });
            }

            toggle() {
                this.isOpen = !this.isOpen;
                this.container.classList.toggle('open', this.isOpen);
                if (this.isOpen) this.input.focus();
            }

            close() {
                this.isOpen = false;
                this.container.classList.remove('open');
            }

            formatText(text) {
                let formatted = text
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br>');
                
                return `<p>${formatted}</p>`;
            }

            async typeText(element, text) {
                const formattedHtml = this.formatText(text);
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = formattedHtml;
                
                element.innerHTML = '';
                
                for (const node of tempDiv.childNodes) {
                    await this.typeNode(element, node);
                }
            }

            async typeNode(parent, node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent;
                    const textNode = document.createTextNode('');
                    parent.appendChild(textNode);
                    
                    for (let i = 0; i < text.length; i++) {
                        textNode.textContent += text[i];
                        this.scrollToBottom();
                        await this.sleep(this.typingSpeed);
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = document.createElement(node.tagName);
                    parent.appendChild(element);
                    
                    for (const childNode of node.childNodes) {
                        await this.typeNode(element, childNode);
                    }
                }
            }

            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }

            async showMessage(text, sender, animate = false) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `selva-message ${sender}`;
                
                const contentDiv = document.createElement('div');
                contentDiv.className = 'selva-message-content';
                
                if (sender === 'user' || !animate) {
                    contentDiv.innerHTML = this.formatText(text);
                }
                
                messageDiv.appendChild(contentDiv);
                this.messagesContainer.appendChild(messageDiv);
                this.scrollToBottom();
                
                if (sender === 'bot' && animate) {
                    await this.typeText(contentDiv, text);
                }
            }

            showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.className = 'selva-message bot';
                typingDiv.id = 'selva-typing-indicator';
                
                const contentDiv = document.createElement('div');
                contentDiv.className = 'selva-message-content selva-typing-indicator';
                contentDiv.innerHTML = '<span></span><span></span><span></span>';
                
                typingDiv.appendChild(contentDiv);
                this.messagesContainer.appendChild(typingDiv);
                this.scrollToBottom();
            }

            hideTypingIndicator() {
                const typingIndicator = document.getElementById('selva-typing-indicator');
                if (typingIndicator) typingIndicator.remove();
            }

            scrollToBottom() {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            }

            validateEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }

            async sendContactEmail() {
                try {
                    const response = await fetch(this.config.workerUrl + '/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: this.contactData.name,
                            email: this.contactData.email,
                            message: this.contactData.message
                        })
                    });

                    if (!response.ok) throw new Error('Email send failed');
                    
                    await this.showMessage("Thank you! I've sent your message to Selva. He typically responds within 24 hours. Have a great day! 🚀", 'bot', true);
                    
                } catch (error) {
                    console.error('Email error:', error);
                    await this.showMessage("I've noted your message! You can also reach Selva directly at selvaofficialmail@gmail.com or +91 9363087305", 'bot', true);
                }
                
                this.collectingContact = false;
                this.contactStep = 0;
                this.contactData = { name: '', email: '', message: '' };
            }

            async sendMessage() {
                const userMessage = this.input.value.trim();
                if (!userMessage || this.isProcessing) return;

                await this.showMessage(userMessage, 'user');
                this.input.value = '';
                this.isProcessing = true;
                this.sendButton.disabled = true;

                if (this.collectingContact) {
                    if (this.contactStep === 1) {
                        this.contactData.name = userMessage;
                        this.contactStep = 2;
                        await this.showMessage(`Great to meet you, ${userMessage}! What's your email address?`, 'bot', true);
                        this.isProcessing = false;
                        this.sendButton.disabled = false;
                        this.input.focus();
                        return;
                    } else if (this.contactStep === 2) {
                        if (this.validateEmail(userMessage)) {
                            this.contactData.email = userMessage;
                            this.contactStep = 3;
                            await this.showMessage("Perfect! And what message would you like me to pass along to Selva?", 'bot', true);
                            this.isProcessing = false;
                            this.sendButton.disabled = false;
                            this.input.focus();
                            return;
                        } else {
                            await this.showMessage("Hmm, that doesn't look like a valid email. Could you try again?", 'bot', true);
                            this.isProcessing = false;
                            this.sendButton.disabled = false;
                            this.input.focus();
                            return;
                        }
                    } else if (this.contactStep === 3) {
                        this.contactData.message = userMessage;
                        await this.sendContactEmail();
                        this.isProcessing = false;
                        this.sendButton.disabled = false;
                        this.input.focus();
                        return;
                    }
                }

                this.showTypingIndicator();

                try {
                    this.conversationHistory.push({ role: 'user', content: userMessage });

                    const response = await fetch(this.config.workerUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            systemPrompt: this.config.systemPrompt,
                            conversationHistory: this.conversationHistory,
                            model: this.config.model,
                            temperature: this.config.temperature
                        })
                    });

                    if (!response.ok) throw new Error(`API Error: ${response.status}`);

                    const data = await response.json();
                    const botMessage = data.choices[0].message.content;

                    this.hideTypingIndicator();
                    await this.showMessage(botMessage, 'bot', true);
                    this.conversationHistory.push({ role: 'assistant', content: botMessage });

                    if (botMessage.toLowerCase().includes("may i have your name") || 
                        botMessage.toLowerCase().includes("what's your name")) {
                        this.collectingContact = true;
                        this.contactStep = 1;
                    }

                } catch (error) {
                    this.hideTypingIndicator();
                    await this.showMessage('Sorry, I encountered an error. You can also reach Selva at selvaofficialmail@gmail.com', 'bot', true);
                    console.error('Chatbot error:', error);
                } finally {
                    this.isProcessing = false;
                    this.sendButton.disabled = false;
                    this.input.focus();
                }
            }
        }

        new SelvaChatbot(CONFIG);
    }
})();