function initializePage() 
{
    addHeader();
    addFooter();
    addDate();
}

function initializeContactPage() 
{
    initializePage();
    initializeEJS();
}

function initializeEJS() 
{
    try 
    {
        emailjs.init(
        {
            publicKey: 'geS2qWKzC39WSHNX1',
            // Do not allow headless browsers
            blockHeadless: true,
            blockList: 
            {
                // Block the suspended emails
                list: [],
                // The variable contains the email address
                watchVariable: 'userEmail',
            },
            limitRate: 
            {
                // Set the limit rate for the application
                id: 'app',
                // Allow 2 request per second
                throttle: 2000
            },
        });
    } 
    catch(err) 
    {
        alert(`EJS Init failed: ${err.message}`);
    }

    // Get 'Contact' form and add the event listener
    const submitForm = document.getElementById("submit_form");
    if (submitForm != null) 
    {
        submitForm.addEventListener("submit", OnContactSubmit);
    } 

    // Get the 'Refer a Patient' form and add the event listener
    const referralForm = document.getElementById("referral_form");
    if (referralForm != null) 
    {
        referralForm.addEventListener("submit", OnReferralSubmit);
    }
}

async function OnContactSubmit(event) 
{
    // Prevent the default form submission behavior
    event.preventDefault();

    const form = document.querySelector('#submit_form');

    // Create a FormData object from the form element
    var formData = new FormData(form);

    // Convert all data to a plain JavaScript object
    const formObject = Object.fromEntries(formData.entries());
    formObject['email'] = 'jla.armstrong@gmail.com';    // Target email for EmailEJS
    
    // Replace 'on'/'off' with 'Yes'/'No'
    newPatientRaw = formObject['new_patient'];
    newPatient = (newPatientRaw=='on') ? "Yes" : "No";
    formObject['new_patient'] = newPatient;

    console.log('Form Object: ', formObject);

    try 
    {
        emailjs.send("service_hze44sb","template_mjifqer", formObject)
        .then(function(response) 
        {
            console.log('SUCCESS!', response.status, response.text);
            alert("Message sent");
            window.location.reload();
        }, 
        function(error) 
        {
            console.log('FAILED...', error);
            alert("Send failed");
        });
    } 
    catch (error) 
    {
        console.error("Failed to send email:", error);
    }
}

async function OnReferralSubmit(event) 
{
    // Prevent the default form submission behavior
    event.preventDefault();

    const form = document.querySelector('#referral_form');

    // Create a FormData object from the form element
    var formData = new FormData(form);

    // Convert all data to a plain JavaScript object
    const formObject = Object.fromEntries(formData.entries());
    formObject['email'] = 'jla.armstrong@gmail.com';    // Target email for EmailEJS
    
    console.log('Form Object: ', formObject);

    try 
    {
        emailjs.send("service_hze44sb","template_scy36iw", formObject)
        .then(
        function(response) 
        {
            console.log('SUCCESS!', response.status, response.text);
            alert("Referral sent");
            window.location.reload();
        }, 
        function(error) 
        {
            console.log('FAILED...', error);
            alert("Send failed");
        });
    } 
    catch (error) 
    {
        console.error("Failed to send email:", error);
    }
}

function addDate() 
{
    // Create a new Date object for the current date and time
    const currentDate = new Date();
    const currentYearNumber = currentDate.getFullYear(); // Returns a number, e.g., 2025
    const currentYearString = currentYearNumber.toString(); // Converts the number to a string, e.g., "2025"

    // Get the HTML element by its ID
    const dateElement = document.getElementById("dateYear");

    // Set the element's content to a user-friendly string format
    // toLocaleDateString formats the date based on the user's browser settings (e.g., December 11, 2025)
    dateElement.innerHTML = currentYearString;
}

function addHeader() 
{
    const hdrText = `
    <nav class="navbar navbar-expand-lg bg-light" style="padding: 8px 15% 8px 10%">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="./Images/Tru-Value Care Logo.png" height="130px" alt="True Value Care Logo"/>
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="./services.html">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="https://pp-wfe-101.advancedmd.com/account/logon?lk=161930">Patient Portal</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            About Us
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="./our_practice.html">Our Practice</a></li>
                            <li><a class="dropdown-item" href="./ngozi.html">Ngozi Kalu, AGNP-C</a></li>
                            <li><a class="dropdown-item" href="./sussan.html">Dr. Sussan Tanyi</a></li>
                            <li><hr class="dropdown-divider" /></li>
                            <li><a class="dropdown-item" href="#">Testimonials</a></li>
                            <li><a class="dropdown-item" href="#">Gallery</a></li>
                        </ul>
                    </li>
                    <li pl-5">
                        <a  href="./contact.html" class="btn btn-primary">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`
    ;

    // Get the header element by its ID
    const hdrElement = document.getElementById("hdrSection");

    // Insert the header
    hdrElement.innerHTML = hdrText;
}

function addFooter() 
{
    const ftrText = `
        <br>
        <hr style="margin-left:5%" width="90%">

        <footer class="py-3 my-4">
            <ul class="nav justify-content-center pb-3 mb-3">
                <li class="nav-item"><a href="./index.html" class="nav-link px-2 text-body-secondary">Home</a></li>
                <li class="nav-item"><a href="./services.html" class="nav-link px-2 text-body-secondary">Services</a></li>
                <li>
                    <a href="./contact.html" class="btn btn-primary">Contact</a>                    
                </li>
            </ul>

        <hr style="margin-left:5%" width="90%">

        <p class="text-center text-body-secondary">© 2025-<span id="dateYear"></span> Tru-Value Care, LLC</p>
        </footer>`
    ;

    // Get the footer element by its ID
    const ftrElement = document.getElementById("ftrSection");

    // Insert the header
    ftrElement.innerHTML = ftrText;
}
