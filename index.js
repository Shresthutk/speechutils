console.log("js file included");
let mic = document.querySelector("#mic");
let abort = document.querySelector("#abort");
var micActive = false;
var textarea = document.querySelector("#textarea");
var preview = document.querySelector("#preview");
var clear = document.querySelector("#clear");

if(!window['webkitSpeechRecognition']){
    textarea.value="Only available for chrome users";
}
let recognition = new webkitSpeechRecognition() || SpeachRecognition();
recognition.lang = "en-US";
mic.addEventListener("click", () => {
  if (micActive == false) {
    recognition.start();
    console.log("mic stared");
    textarea.value = "listening...";
    micActive = true;
    recognition.onspeechend = () => {
      console.log("speech ended");
      recognition.onresult = function (e) {
        var speech = e["results"][0][0]["transcript"];
        textarea.value = speech;
        micActive = false;
        let wordCount = speech.match(/(\w+)/g).length;
        let characterCount = speech.length;
        preview.innerText = `You spoke ${wordCount} words which has in total ${characterCount} characters`;
      };
    };
  }
});
abort.addEventListener("click", () => {
  {
    recognition.abort();
    console.log("mic stopped");
    textarea.value = "Couldn't recognize speech :(";
    micActive = false;
  }
});

clear.addEventListener('click',()=>{
    textarea.value="";
})
