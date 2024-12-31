import supabase from "../supabaseclient.js";
console.log("Connected")

document.getElementById('addIndustryForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Retrieve form data
    const industryname = document.getElementById('industryname').value;
    const phoneno = document.getElementById('phoneno').value;
    const address = document.getElementById('address').value;
    const aboutus = document.getElementById('about').value;
    console.log("Connected")


    // Retrieve user ID from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.user_id;

    console.log("Connected")

    // Insert form data into Supabase table
    if (userId) {
        try {
            const { data, error } = await supabase.from('industry_data').insert([
                { user_id: userId, about_us:aboutus, phone: phoneno, address: address,industry_name:industryname }
            ]);

            if (error) {
                console.error('Error inserting shop data:', error.message);
                // Handle error
            } else {
                console.log('Shop data inserted successfully:', data);
                window.location.href = '../ProfilePage/industryprofile.html';
            }
        } catch (error) {
            console.error('Error inserting shop data:', error.message);
            // Handle error
        }
    } else {
        console.error('User ID not found in local storage');
        // Handle error
    }
});
