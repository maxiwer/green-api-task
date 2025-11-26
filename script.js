document.addEventListener('DOMContentLoaded', () => {
    const outputJson = document.getElementById('outputJson');
    const outputLabel = document.querySelector('.output-label');
    
    function updateOutput(data, buttonName) {
        if (buttonName) {
            outputLabel.textContent = `Ответ: ${buttonName}`;
        }
        outputJson.textContent = JSON.stringify(data, null, 2);
    }

    document.getElementById('getSettings').addEventListener('click', async () => {
        const idInstance = document.getElementById('idInstance').value;
        const apiTokenInstance = document.getElementById('apiTokenInstance').value;
        
        if (!idInstance || !apiTokenInstance) {
            updateOutput({ 
                error: 'Please fill in both idInstance and apiTokenInstance'
            }, 'getSettings');
            return;
        }

        const url = `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            updateOutput({ 
                url: url,
                response: data
            }, 'getSettings');
        } catch (error) {
            updateOutput({ 
                url: url,
                error: error.message
            }, 'getSettings');
        }
    });

    document.getElementById('sendMessage').addEventListener('click', async () => {
        const idInstance = document.getElementById('idInstance').value;
        const apiTokenInstance = document.getElementById('apiTokenInstance').value;
        const recipient = document.getElementById('messageRecipient').value;
        const message = document.getElementById('messageText').value;
        
        if (!idInstance || !apiTokenInstance || !recipient || !message) {
            updateOutput({ 
                error: 'Please fill in all required fields: idInstance, apiTokenInstance, recipient, and message'
            }, 'sendMessage');
            return;
        }

        const url = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
        const body = {
            chatId: `${recipient}@c.us`,
            message: message
        };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            updateOutput({ 
                url: url,
                requestBody: body,
                response: data
            }, 'sendMessage');
        } catch (error) {
            updateOutput({ 
                url: url,
                requestBody: body,
                error: error.message
            }, 'sendMessage');
        }
    });

    // document.getElementById('sendFileByUrl').addEventListener('click', () => {
    //     const recipient = document.getElementById('fileRecipient').value;
    //     const fileUrl = document.getElementById('fileUrl').value;
    //     updateOutput({ 
    //         idMessage: "3EB0C7C7D037B7C7C030",
    //         recipient: recipient,
    //         fileUrl: fileUrl
    //     }, 'sendFileByUrl');
    // });
});
