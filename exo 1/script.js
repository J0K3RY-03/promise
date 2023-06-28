const rules = fetch("becode.json");
const btn = document.querySelector("button");
const container = document.querySelector(".container");

rules.then(async (response) => {
  try {
    const rulesList = await response.json();

    btn.addEventListener("click", function () {
      const newList = document.createElement("ul");
      container.insertBefore(newList, btn);
      rulesList.forEach((element) => {
        const newItemList = document.createElement("li");
        newList.append(newItemList);
        newItemList.append(element);
      });
    });
  } catch (error) {
    console.log(error);
  }
});
