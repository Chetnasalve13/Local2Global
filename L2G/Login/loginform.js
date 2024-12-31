// Import Supabase client
import supabase from "../supabaseclient.js";

// Log a message to indicate script execution
console.log("Hello world123");
console.log("SS");

// Log a message to indicate successful Supabase import
console.log("Supabase import successful");

// Function to handle login form submission
const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get user input values
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validate user input (optional)

    // Authenticate user using Supabase
    const { data, error } = await supabase
        .from('users')
        .select('user_id, role, email_id')
        .eq('email_id', email)
        .eq('password', password)
        .single(); // Expecting a single user, as email should be unique

    // Handle authentication result
    if (error) {
      alert("Invalid Credentials,login with proper credentials")
        console.error('Error authenticating user:', error.message);
        
        return;
    }

    if (data) {
        // User authenticated successfully
        console.log('User authenticated successfully:', data);

        // Store user data in local storage for further operations
        localStorage.setItem('user', JSON.stringify(data));

        // Redirect to landing page
        window.location.href = '../LandingPage/landingpage.html';
    } else {
        // User not found or invalid credentials
        console.log('Invalid credentials');
        alert("Invalid Credentials,login with proper credentials")
    }
};

// Function to handle sign-up form submission
const handleSignUp = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get user input values
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;

    // Validate user input (optional)

    // Insert user data into Supabase table
    const { data, error } = await supabase
        .from('users')
        .insert([{ email_id: email, password: password, role: role }]);

    // Handle insertion result
    if (error) {
        console.error('Error inserting user data:', error.message);
        alert("User already exists,login to your account")
        return;
    }
    console.log("Redirection")
    alert("Now login with your newly created account,Thank you for choosing Local2Global")

    window.location.href = 'index.html';
};

// Event listener for login form submission
document.getElementById('loginForm').addEventListener('submit', handleLogin);

// Event listener for sign-up form submission
document.getElementById('signupForm').addEventListener('submit', handleSignUp);
