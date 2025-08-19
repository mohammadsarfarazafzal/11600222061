const API_URL = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

async function Log(stack, level, component, message) {
  if (!ACCESS_TOKEN) {
    console.error("Access Token is not set. Cannot log to API.");
    return;
  }

  const logPayload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: component.toLowerCase(),
    message: message
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify(logPayload)
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(`Failed to log: ${JSON.stringify(data)}`);
      return;
    }

    console.log(`Log created successfully: ${data.logID}`);
  } catch (error) {
    console.error("An error occurred while trying to log:", error.message);
  }
}

export default Log;