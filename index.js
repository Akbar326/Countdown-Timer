import inquirer from "inquirer";
const res = await inquirer.prompt([
    {
        name: "minutes",
        type: "number",
        message: "Please enter the number of minutes:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            }
            else if (input < 0) {
                return "Please enter a positive number";
            }
            else {
                return true;
            }
        },
    },
    {
        name: "seconds",
        type: "number",
        message: "Please enter the number of seconds:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            }
            else if (input < 0 || input >= 60) {
                return "Please enter a number between 0 and 59";
            }
            else {
                return true;
            }
        },
    },
]);
const inputMinutes = res.minutes;
const inputSeconds = res.seconds;
// Total seconds for the timer
const totalSeconds = (inputMinutes * 60) + inputSeconds;
function startTimer(val) {
    const endTime = Date.now() + (val * 1000); // Miliseconds mein set time
    const timer = setInterval(() => {
        const currentTime = Date.now();
        const timeDiff = Math.ceil((endTime - currentTime) / 1000); // Round up to next whole second
        if (timeDiff <= 0) {
            console.log("Timer has expired");
            clearInterval(timer); // Stop the timer
            process.exit(0); // Exit process
        }
        const minutes = Math.floor(timeDiff / 60);
        const seconds = Math.floor(timeDiff % 60);
        console.log(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
}
startTimer(totalSeconds);
