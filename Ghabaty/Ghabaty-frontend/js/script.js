
// Login validation
// Handle Login Form Submission
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Send POST request to backend
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (response.status === 200) {
      // Successful login: Store token (for example, in localStorage)
      localStorage.setItem("authToken", result.token);
      alert("Login successful!");
      // Redirect to the dashboard or home page
      window.location.href = "index.html";
    } else {
      alert("Error: " + result.error);
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
});

  // Toggle alert visibility
document.querySelectorAll('.alert-toggle').forEach((button) => {
    button.addEventListener('click', function () {
      const alertContent = this.nextElementSibling;
      alertContent.style.display =
        alertContent.style.display === 'none' ? 'block' : 'none';
    });
  });
  
// Report form submission
// Handle Report Form Submission
document.getElementById("report-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const reportDetails = document.getElementById("report-details").value;
  const token = localStorage.getItem("authToken"); // Get the JWT token

  try {
    // Send POST request to backend
    const response = await fetch("http://localhost:4000/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Add token to Authorization header
      },
      body: JSON.stringify({ reportDetails }),
    });

    const result = await response.json();

    if (response.status === 201) {
      alert("Report submitted successfully!");
      // Optionally, reset form or redirect
    } else {
      alert("Error: " + result.error);
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
});


  
// Report form submission
document.querySelector('#report-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const location = document.querySelector('#location').value.trim();
    const description = document.querySelector('#description').value.trim();
  
    if (!location || !description) {
      alert('Please complete all fields.');
    } else {
      alert('Report submitted successfully!');
      document.querySelector('#report-form').reset(); // Clear form
    }
  });

  // Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Highlight active page in navbar
const currentPage = window.location.pathname.split('/').pop();

document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// Fetch Alerts for the User
async function fetchAlerts() {
  const token = localStorage.getItem("authToken"); // Get the JWT token

  try {
    // Send GET request to fetch alerts
    const response = await fetch("http://localhost:4000/alerts/1", { // Replace 1 with actual user ID
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}` // Add token to Authorization header
      },
    });

    const alerts = await response.json();

    if (alerts.length > 0) {
      const alertContainer = document.getElementById("alert-container");
      alerts.forEach(alert => {
        const alertDiv = document.createElement("div");
        alertDiv.classList.add("alert");
        alertDiv.innerHTML = `
          <h3>${alert.title}</h3>
          <p>${alert.description}</p>
          <button class="alert-toggle">View Alert</button>
        `;
        alertContainer.appendChild(alertDiv);
      });
    } else {
      alertContainer.innerHTML = "<p>No alerts found.</p>";
    }
  } catch (err) {
    console.error(err);
    alert("An error occurred. Please try again.");
  }
}

// Call the function to load alerts
fetchAlerts();


