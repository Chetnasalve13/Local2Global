document.getElementById('myprofile').addEventListener('click', function() {
    // Retrieve user object from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if user data exists and contains role information
    if (userData && userData.role) {
        // Redirect the user based on their role
        switch (userData.role) {
            case 'labour':
                window.location.href = '../ProfilePage/labourprofile.html';
                break;
            case 'vendor':
                window.location.href = '../ProfilePage/vendorprofile.html';
                break;
            case 'industry':
                window.location.href = '../ProfilePage/industryprofile.html';
                break;
            default:
                // Redirect to a default page if the role is not recognized
                window.location.href = 'default.html';
                break;
        }
    } else {
        // Redirect to a default page if user data or role is missing
        window.location.href = 'default.html';
    }
});
