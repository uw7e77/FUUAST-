(function(){
  // Inject minimal widget markup
  const launcher = document.createElement('button');
  launcher.className = 'chatbot-launcher';
  launcher.title = 'Chat Assistant';
  launcher.innerHTML = '<i class="fas fa-comment"></i>';

  const panel = document.createElement('div');
  panel.className = 'chatbot-panel';
  panel.innerHTML = `
    <div class="chatbot-header">
      <h4>Ask FUUAST Assistant</h4>
      <button class="chatbot-close" aria-label="Close">×</button>
    </div>
    <div class="chatbot-messages" id="chatMessages"></div>
    <div class="chatbot-input">
      <input type="text" id="chatInput" placeholder="Type your question..." />
      <button id="chatSend">Send</button>
    </div>
  `;

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  const closeBtn = panel.querySelector('.chatbot-close');
  const messagesEl = panel.querySelector('#chatMessages');
  const inputEl = panel.querySelector('#chatInput');
  const sendBtn = panel.querySelector('#chatSend');

  let history = [];

  function addMessage(role, content){
    const msg = document.createElement('div');
    msg.className = `message ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = content;
    msg.appendChild(bubble);
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function togglePanel(){ panel.classList.toggle('active'); if(panel.classList.contains('active')) inputEl.focus(); }

  launcher.addEventListener('click', togglePanel);
  closeBtn.addEventListener('click', togglePanel);

  async function sendMessage(){
    const text = inputEl.value.trim();
    if(!text) return;
    inputEl.value = '';
    addMessage('user', text);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });
      const data = await res.json();
      const reply = data.reply || 'Sorry, I could not fetch a response.';
      addMessage('assistant', reply);
      history.push({ role: 'user', content: text });
      history.push({ role: 'assistant', content: reply });
    } catch (err) {
      addMessage('assistant', 'Error contacting assistant. Please try again.');
      console.error(err);
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') sendMessage(); });
})();