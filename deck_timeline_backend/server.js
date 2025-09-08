import app from './app.js';

const port = 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
