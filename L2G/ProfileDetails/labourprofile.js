import supabase from "../supabaseclient.js";
console.log("Connected")

document.getElementById('addLabourForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Retrieve form data
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const phoneno = document.getElementById('phoneno').value;
    const address = document.getElementById('address').value;
    const skills = document.getElementById('skills').value;
    console.log("Connected")


    // Retrieve user ID from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData.user_id;

    console.log("Connected")

    // Insert form data into Supabase table
    if (userId) {
        try {
            const { data, error } = await supabase.from('labour_data').insert([
                { user_id: userId,first_name:firstname,last_name:lastname,phone:phoneno, address: address ,skills:skills}
            ]);

            if (error) {
                console.error('Error inserting shop data:', error.message);
                // Handle error
            } else {
                console.log('Shop data inserted successfully:', data);
                window.location.href = '../ProfilePage/labourprofile.html';
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
