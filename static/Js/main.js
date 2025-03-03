const message_content = document.querySelector("messages");
const ignore_svg = document.querySelector("ignore");

console.log("No JavaScrito!");

function ReduxOpacityOfMessagesToZero(){
    console.log("Na função ReduxOpaityOfMessageToZero");
    message_content.addEventListener("click", ChangeOpacity());
}

function ChangeOpacity(){
    console.log("Na ChangeOpacity");
    message_content.classList.toggle("hidden");
}

ReduxOpacityOfMessagesToZero();