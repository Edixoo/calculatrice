const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
const distExists = fs.existsSync(distPath);

// Serve static files from the 'dist' directory (Vite build output) if it exists
if (distExists) {
  app.use(express.static(distPath));
}

// Serve the CSS file from the public directory
app.use('/styles.css', express.static(path.join(__dirname, 'public', 'styles.css')));

// Serve the main HTML file for all routes (for client-side routing)
app.get('*', (req, res) => {
  if (distExists && fs.existsSync(path.join(distPath, 'index.html'))) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    // Return a simple HTML page for testing when dist doesn't exist
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test Server</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <h1>Test Server Running</h1>
          <p>This is a placeholder page for testing. The actual build is not available.</p>
        </body>
      </html>
    `);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
