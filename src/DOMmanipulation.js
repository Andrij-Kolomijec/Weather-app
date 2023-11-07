const img = document.querySelector("img");
const button = document.querySelector("button");

export default function fetchGif(input = "cats") {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=7wKVqKRF01bWdUJTDZtEo3GE0E3tpNaN&s=${input}`,
    { mode: "cors" },
  )
    .then((response) => response.json())
    .then((response) => {
      img.src = response.data.images.original.url;
    })
    .catch(() => {
      console.error("An error occurred.");
      console.log("Wrong API");
    });
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  const input = document.querySelector("input").value;
  console.log(input);
  fetchGif(input);
});
