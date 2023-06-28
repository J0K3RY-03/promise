const body = document.querySelector("body");
const btn = document.querySelector(".new_joke");
const btnSave = document.querySelector(".save_joke");
const btnRefresh = document.querySelector(".refresh_joke");
const categorieList = document.querySelector("select");
const getRandomApi = () => fetch("https://api.chucknorris.io/jokes/random");

btn.addEventListener("click", function () {
  const value = categorieList.value;
  console.log(value, "value");
  if (value === "" || value === "none") {
    getRandomApi().then(async (response) => {
      try {
        const randomResponse = await response.json();
        createDivWithResponse([randomResponse]);
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    console.log("ok2");
    const getElementByCategorie = fetch(
      `https://api.chucknorris.io/jokes/random?category=${value}`
    );
    getElementByCategorie.then(async (response) => {
      try {
        const responseCategorie = await response.json();
        createDivWithResponse([responseCategorie]);
      } catch (error) {
        console.log(error);
      }
    });
  }
});

function createDivWithResponse(response) {
  const creatDiv = document.createElement("div");
  body.append(creatDiv);

  response.forEach((item) => {
    for (let key in item) {
      const value = item[key];
      const paragraph = document.createElement("p");
      paragraph.textContent = `${key}: ${value}`;
      creatDiv.appendChild(paragraph);
    }
  });
}

function createCategorie() {
  const getCategorieToApi = fetch(
    "https://api.chucknorris.io/jokes/categories"
  );
  getCategorieToApi.then(async (response) => {
    try {
      const categorie = await response.json();
      categorie.unshift("none");
      const categorieList = document.querySelector("select");
      categorie.forEach(function (elem) {
        const createOptionList = document.createElement("option");
        categorieList.append(createOptionList);
        createOptionList.innerText = elem;
        createOptionList.setAttribute("value", elem);
      });
    } catch (error) {
      console.log("ERROR");
    }
  });
}

btnSave.addEventListener("click", function () {
  let dataJoke = [];
  let paragraphContent = document.querySelectorAll("p");
  for (let joke of paragraphContent) {
    let content = joke.textContent;
    dataJoke.push(content);
  }
  localStorage.setItem("jokeValue", JSON.stringify(dataJoke));
  console.log("STORAGE SAVE");
});

btnRefresh.addEventListener("click", function () {
  localStorage.removeItem("jokeValue");
  location.reload();
});

createCategorie();
