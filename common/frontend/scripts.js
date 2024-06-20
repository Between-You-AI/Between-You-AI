const GPTChatAssistant = (() => {
  const init = () => {
      document.getElementById("send-button").addEventListener("click", sendMessage);
      document.getElementById("user-input").addEventListener("keypress", (event) => {
          if (event.key === 'Enter') {
              sendMessage();
          }
      });
  }

  const sendMessage = () => {
      const userInput = document.getElementById('user-input');
      const message = userInput.value;
      if (!message) return;

      appendMessage(message, 'user');
      userInput.value = '';

      // Simulate bot response
      setTimeout(() => {
          appendMessage('🤔 Thinking about your question...', 'bot');
          startResearch(message);
      }, 500);
  };

  const startResearch = (task) => {
      const { protocol, host, pathname } = window.location;
      const ws_uri = `${protocol === 'https:' ? 'wss:' : 'ws:'}//${host}${pathname}ws`;
      const socket = new WebSocket(ws_uri);
      const converter = new showdown.Converter();

      socket.onopen = () => {
          const requestData = {
              task: task,
              report_type: 'chat',
              report_source: 'web',
              agent: 'Chat Agent',
          };
          socket.send(`start ${JSON.stringify(requestData)}`);
      };

      socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'logs' || data.type === 'report') {
              const markdownOutput = converter.makeHtml(data.output);
              appendMessage(markdownOutput, 'bot');
          }
      };
  };

  const appendMessage = (message, sender) => {
      const chatBox = document.getElementById('chat-box');
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', sender);
      messageElement.innerHTML = message;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
  };

  document.addEventListener("DOMContentLoaded", init);

  // Adding default short note
  window.onload = () => {
      appendMessage('Hello! How can I assist you with your research today?', 'bot');
  };

  return {
      sendMessage,
      startResearch,
      appendMessage,
  };
})();
