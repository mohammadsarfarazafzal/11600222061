const API_URL = "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtb2hhbW1hZHNhcmZhcmF6YWZ6YWxAZ21haWwuY29tIiwiZXhwIjoxNzU1NTgyOTc0LCJpYXQiOjE3NTU1ODIwNzQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIzYmVkMjAyOC0wMTljLTQ2YjQtODJiMy0wZDM4ZDY4NzQyOWQiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJtZCBzYXJmYXJheiBhZnphbCIsInN1YiI6IjkwMGNmYTM3LTYyYTctNGU2OS1iNDJkLWJiY2FkYjc4OWYwZSJ9LCJlbWFpbCI6Im1vaGFtbWFkc2FyZmFyYXphZnphbEBnbWFpbC5jb20iLCJuYW1lIjoibWQgc2FyZmFyYXogYWZ6YWwiLCJyb2xsTm8iOiIxMTYwMDIyMjA2MSIsImFjY2Vzc0NvZGUiOiJVd1ZmSnoiLCJjbGllbnRJRCI6IjkwMGNmYTM3LTYyYTctNGU2OS1iNDJkLWJiY2FkYjc4OWYwZSIsImNsaWVudFNlY3JldCI6ImRCR2FNcWR5SEdrUkRYWXgifQ.HU0XGa05BtiGfAdA1K-5Kyyr2UQZOu0M9Akaf5em2qk";

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
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logPayload) 
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`HTTP error! status: ${response.status}`, errorData);
      return;
    }

    const data = await response.json();
    console.log(`Log created successfully: ${data.logID}`);
  } catch (error) {
    console.error("An error occurred while trying to log:", error.message);
  }
}

export default Log;