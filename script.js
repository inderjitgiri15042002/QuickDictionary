let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not__found");
const loading = document.querySelector(".loading");
const def = document.querySelector(".def");
const audioSection = document.querySelector(".audio");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let word = input.value.trim();

  if (word === "") {
    alert("Word is required");
    return;
  }

  getData(word);
});

async function getData(word) {
  loading.style.display = "block";
  def.innerText = "";
  notFound.innerText = "";
  audioSection.innerHTML = ""; // 🟢 REMOVE OLD AUDIO

  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  loading.style.display = "none";

  console.log(data);

  if (!data.length) {
    notFound.innerText = "No result Found";
    return;
  }

  def.innerText = data[0].meanings[0].definitions[0].definition;

  const audioURL = data[0].phonetics[0].audio;

  if (audioURL) {
    const newElement = document.createElement("audio");
    newElement.setAttribute("src", audioURL);
    newElement.setAttribute("controls", "");
    audioSection.appendChild(newElement);
  } else {
    audioSection.innerHTML = "No Audio is Present";
    audioSection.style.color = "red";
  }
}
