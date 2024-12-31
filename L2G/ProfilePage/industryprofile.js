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
        .from('industry_data')
        .select(' address, phone, about_us,industry_name')
        .eq('user_id', userId)
        .then(({ data, error }) => {
            if (error) {
                console.error('Error fetching data:', error.message);
                document.getElementById('address').textContent = 'Error fetching address';
                document.getElementById('phoneno').textContent = 'Error fetching phone number';
                document.getElementById('about').textContent = 'Error fetching skills';
                document.getElementById('industryname').textContent = 'Error fetching skills';
            } else if (data && data.length > 0) {
                const {  address, phone, about_us ,industry_name} = data[0];
                
                document.getElementById('address').textContent = address;
                document.getElementById('phoneno').textContent = phone;
                
                document.getElementById('about').textContent = about_us;
                document.getElementById('industryname').textContent = industry_name;
            } else {
                document.getElementById('address').textContent = 'Address not found';
                document.getElementById('phoneno').textContent = 'Phone number not found';
                
                document.getElementById('about').textContent = 'Skills not found';
            }
        });
} else {
    console.error('User ID not found in local storage');
    document.getElementById('address').textContent = 'User ID not found';
    document.getElementById('phoneno').textContent = 'User ID not found';
    document.getElementById('about').textContent = 'User ID not found';
}

