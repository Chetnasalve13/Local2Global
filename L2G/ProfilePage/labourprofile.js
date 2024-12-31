import supabase from "../supabaseclient.js";
const userData = JSON.parse(localStorage.getItem('user'));

// Update the email field with user's email
if (userData && userData.email_id) {
    document.getElementById('email').textContent = userData.email_id;
    document.getElementById('userid').textContent = userData.user_id;
} else {
    document.getElementById('email').textContent = 'Email not found';
}

if (userData && userData.user_id) {
    const userId = userData.user_id;

    supabase
        .from('labour_data')
        .select('first_name, last_name, address, phone, skills')
        .eq('user_id', userId)
        .then(({ data, error }) => {
            if (error) {
                console.error('Error fetching data:', error.message);
                document.getElementById('address').textContent = 'Error fetching address';
                document.getElementById('phoneno').textContent = 'Error fetching phone number';
                document.getElementById('firstname').textContent = 'Error fetching first name';
                document.getElementById('lastname').textContent = 'Error fetching last name';
                document.getElementById('skills').textContent = 'Error fetching skills';
            } else if (data && data.length > 0) {
                const { first_name, last_name, address, phone, skills } = data[0];
                console.log(first_name)
                document.getElementById('address').textContent = address;
                document.getElementById('phoneno').textContent = phone;
                document.getElementById('firstname').textContent = first_name;
                document.getElementById('lastname').textContent = last_name;
                document.getElementById('skills').textContent = skills;
            } else {
                document.getElementById('address').textContent = 'Address not found';
                document.getElementById('phoneno').textContent = 'Phone number not found';
                document.getElementById('firstname').textContent = 'First name not found';
                document.getElementById('lastname').textContent = 'Last name not found';
                document.getElementById('skills').textContent = 'Skills not found';
            }
        });
} else {
    console.error('User ID not found in local storage');
    document.getElementById('address').textContent = 'User ID not found';
    document.getElementById('phoneno').textContent = 'User ID not found';
    document.getElementById('firstname').textContent = 'User ID not found';
    document.getElementById('lastname').textContent = 'User ID not found';
    document.getElementById('skills').textContent = 'User ID not found';
}

