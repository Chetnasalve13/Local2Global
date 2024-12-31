// Function to fetch and populate job openings and add event listener for applying

import supabase from "../supabaseclient.js";
console.log("Hello")
async function populateOpenings() {
    // Fetch job openings
    const { data: jobData, error: jobError } = await supabase
        .from('job_desc')
        .select('job_id, job_title, job_desc, experience_required, company_image,user_id');

    if (jobError) {
        console.error('Error fetching job data:', jobError.message);
        return;
    }

    if (jobData && jobData.length > 0) {
        for (const job of jobData) {
            const { job_id, job_title, job_desc, experience_required, company_image,user_id } = job;

            // Fetch industry name based on user ID
            const { data: industryData, error: industryError } = await supabase
                .from('industry_data')
                .select('industry_name')
                .eq('user_id', user_id)
                .single();

            if (industryError) {
                console.error('Error fetching industry data:', industryError.message);
                return;
            }

            const industryName = industryData ? industryData.industry_name : 'Industry Name not found';

            // Create apply button with job_id as dataset
            const jobHtml = `
                <div class="w-full md:w-1/3 px-2 pb-12">
                    <!-- Job Card HTML -->
                    <div class="h-full bg-white rounded overflow-hidden shadow-md hover:shadow-lg relative smooth containerProduct">
                    <a href="#" class="no-underline hover:no-underline">
                        <img src="${company_image}" class="h-48 w-full rounded-t shadow-lg" id="companyimage">
                        <div class="p-6 h-auto md:h-48">	
                            <p class="text-gray-600 text-xs md:text-sm" id="industryname">${industryName}</p>
                            <div class="font-bold text-xl text-gray-900" id="jobtitle">${job_title}</div>
                            <p class="text-gray-800 font-serif text-base mb-5" id="jobdesc">${job_desc}</p>
                        </div>
                        <br><br><br>

                        <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-4 containerProduct">
                            <div class="flex items-center justify-center">
                                <button class="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-4 py-3 px-6 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out apply-button" data-jobid="${job_id}">
                                    Apply
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center justify-between inset-x-0 bottom-0 p-6">
                            <p class="text-gray-600 text-xs md:text-sm" id="experiencerequired">Experience Required: ${experience_required}</p>
                        </div>
                    </a>
                </div>
            



                    
                </div>
            `;

            // Append job HTML to container
            document.getElementById('jobOpeningsContainer').innerHTML += jobHtml;
        }
    } else {
        console.log('No job openings found.');
    }

    // Add event listener for apply buttons
    document.addEventListener('click', async (event) => {
        if (event.target.classList.contains('apply-button')) {
            // Get the job ID from the dataset
            alert("Are you sure want to Apply for job")
            alert("Thank you for Applying to job , company will soon contact you on your Email id Provided!!")
            const jobId = event.target.dataset.jobid;
    
            // Fetch the user ID from local storage
            //const userId = localStorage.getItem('user_id');
            const userData = JSON.parse(localStorage.getItem('user'));
            const userId = userData.user_id;
    
            // If user ID is found in local storage
            if (userId) {
                // Fetch user_id_jobpost from job_desc table based on job_id
                const { data: jobData, error: jobError } = await supabase
                    .from('job_desc')
                    .select('user_id')
                    .eq('job_id', jobId)
                    .single();
    
                if (jobError) {
                    console.error('Error fetching job data:', jobError.message);
                    return;
                }
    
                if (jobData) {
                    const { user_id } = jobData;
    
                    // Insert job application into the job_applications table
                    const { error } = await supabase
                        .from('job_applications')
                        .insert([
                            { job_id: jobId, user_id_session: userId, user_id_jobpost: user_id }
                        ]);
    
                    if (error) {
                        console.error('Error applying for job:', error.message);
                    } else {
                        console.log('Successfully applied for job:', jobId);
                        window.location.href = '../LandingPage/landingpage.html';
                        // Optionally, you can perform additional actions after applying for the job
                    }
                } else {
                    console.log('Job data not found for job ID:', jobId);
                }
            } else {
                console.log('User ID not found in local storage.');
            }
        }
    });
}

// Call the function to fetch and populate job openings and add event listener
populateOpenings();
