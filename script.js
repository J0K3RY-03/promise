const rules = fetch("becode.json");
const btn = document.querySelector("button");
const container = document.querySelector(".container");

rules.then(async (response) => {
  try {
    const rulesList = await response.json();

    btn.addEventListener("click", function () {
      console.log("NOOB");
      const newList = document.createElement("ul");
      container.insertBefore(newList, btn);
      rulesList.forEach((element) => {
        console.log(element);
        const newItemList = document.createElement("li");
        newList.append(newItemList);
        newItemList.append(element);
      });
    });
    console.log(rulesList);
  } catch (error) {
    console.log(error);
  }
});
