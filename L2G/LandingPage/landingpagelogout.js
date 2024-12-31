document.getElementById('logout').addEventListener('click', function() {
    // Remove user object from local storage
    console.log("Logout")
    localStorage.removeItem('user');

    // Redirect to signup.html
    window.location.href = '../Login/index.html';
});