import supabase from "../supabaseclient.js";

document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Retrieve form data
    const jobTitle = document.getElementById('jobtitle').value;
    const jobDesc = document.getElementById('jobdesc').value;
    const experience = document.getElementById('experience').value;
    const companyImageFile = document.getElementById('companyimage').files[0];

    // Check if all required fields are filled
    if (!jobTitle || !jobDesc || !experience || !companyImageFile) {
        console.error('Please fill all required fields');
        return;
    }

    // Convert company image to base64 format
    const reader = new FileReader();
    reader.readAsDataURL(companyImageFile);
    reader.onload = () => {
        const companyImageBase64 = reader.result;

        // Retrieve user ID from local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData.user_id;

        // Insert data into the job_desc table
        supabase
            .from('job_desc')
            .insert([
                { 
                    user_id: userId,
                    job_title: jobTitle, 
                    job_desc: jobDesc, 
                    experience_required: experience, 
                    company_image: companyImageBase64 
                }
            ])
            .then(({ data, error }) => {
                if (error) {
                    console.error('Error inserting data into job_desc table:', error.message);
                    return;
                }
                console.log('Data inserted successfully:', data);
                window.location.href = '../LandingPage/landingpage.html';
                // Optionally, redirect to another page after successful insertion
            });
    };
});
