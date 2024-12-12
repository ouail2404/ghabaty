// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Load environment variables from .env file
dotenv.config();

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Database setup (using PostgreSQL)
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware to protect routes that require authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from the Authorization header

  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  // Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token is invalid or expired' });
    }
    req.user = user; // Add user data to request object
    next();
  });
};

// Root route
app.get('/', (req, res) => {
  res.send('API is running. Use /register or /login to interact with the system.');
});

// User Registration Route
app.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role]
    );

    res.status(201).json(result.rows[0]); // Respond with the created user data
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// User Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(403).json({ error: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expiration
    );

    res.json({ token }); // Send the token to the client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get Alerts for a User (Protected Route)
app.get('/alerts/:userId', authenticateJWT, async (req, res) => {
  const { userId } = req.params;

  if (parseInt(userId) !== req.user.user_id) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    // Fetch alerts for the specific user
    const result = await pool.query('SELECT * FROM alerts WHERE user_id = $1', [userId]);
    res.json(result.rows); // Respond with the alerts
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Add a Report (Protected Route)
app.post('/reports', authenticateJWT, async (req, res) => {
  const { reportDetails } = req.body;

  try {
    // Ensure the report includes details
    if (!reportDetails) {
      return res.status(400).json({ error: 'Report details are required' });
    }

    // Insert the report into the database
    const result = await pool.query(
      'INSERT INTO reports (user_id, details) VALUES ($1, $2) RETURNING *',
      [req.user.user_id, reportDetails]
    );

    res.status(201).json({ message: 'Report submitted successfully', report: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Function to start the server and handle port conflicts
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying another port...`);
      startServer(port + 1); // Try the next port
    }
  });
};

// Start the server on port 4000 or fallback to another port
const PORT = process.env.PORT || 4000;
startServer(PORT);
