// Load conversation history from localStorage
const savedConversation =
  JSON.parse(localStorage.getItem("conversation")) || [];
const conversationDiv = document.getElementById("conversation");
savedConversation.forEach((entry) => appendMessage(entry));

async function call() {
  try {
    const user = document.getElementById("user").value;
    const response = await fetch(
      "https://simple-chatgpt-api.p.rapidapi.com/ask",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "6f7dc64f62msh08c52308733dee9p18038fjsn6073178de888",
          "X-RapidAPI-Host": "simple-chatgpt-api.p.rapidapi.com",
        },
        body: JSON.stringify({ question: user }),
      }
    );
    const result = await response.text();
    document.getElementById("result").textContent = result;
    console.log(result);

    // Check if the user's input and response are different before appending
    if (user !== result.trim()) {
      // Display user input on the left and response on the right
      conversationDiv.innerHTML += `
                    <div class="message">
                        <div class="user-message">${user}</div>
                        <div class="response-message">${result}</div>
                    </div>
                `;

      // Update the conversation history in localStorage
      const newEntry = { user, answer: result };
      savedConversation.push(newEntry);
      localStorage.setItem("conversation", JSON.stringify(savedConversation));
    }

    // Clear the input after sending
    document.getElementById("user").value = "";
  } catch (error) {
    console.error(error);
  }
}

// Function to append a message to the conversation
function appendMessage(entry) {
  const { user, answer } = entry;
  conversationDiv.innerHTML += `
      <div class="message">
          <div class="user-message">${user}</div>
          <div class="response-message">${answer}</div>
      </div>
  `;
}
