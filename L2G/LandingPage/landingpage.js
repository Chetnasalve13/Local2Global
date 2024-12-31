

document.getElementById('navAction').addEventListener('click', function() {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem('user'));

    // Check if user data exists and contains role information
    if (userData && userData.role) {
        // Print the user's role to the console
        console.log('User role:', userData.role);
        
        // Redirect the user based on their role
        switch (userData.role) {
            case 'labour':
                window.location.href = '../ProfileDetails/labourprofile.html';
                break;
            case 'vendor':
                window.location.href = '../ProfileDetails/vendorprofile.html';
                break;
            case 'industry':
                window.location.href = '../ProfileDetails/industryprofile.html';
                break;
            default:
                // Redirect to a default page if the role is not recognized
                window.location.href = 'defaultprofilepage.html';
                break;
        }
    } else {
        // Redirect to a default page if user data or role is missing
        window.location.href = 'defaultprofilepage.html';
    }
});

