function initializePage() {
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
