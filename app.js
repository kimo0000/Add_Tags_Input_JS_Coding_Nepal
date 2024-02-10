const ulEl = document.querySelector("ul"),
  inputEl = ulEl.querySelector("input"),
  tagNumber = document.querySelector(".details p span"),
  btnRemove = document.querySelector("button");

console.log(tagNumber);

let tags = JSON.parse(localStorage.getItem("tags") || "[]");

let maxtag = 10;

function tagsCount() {
  inputEl.focus();
  tagNumber.innerText = maxtag - tags.length;
}

tagsCount();

function createTag() {
  ulEl.querySelectorAll("li").forEach((li) => li.remove());
  // console.log(tags);
  tags.reverse().forEach((tag, index) => {
    // console.log(tags, tag, index);
    let tagLI = `<li id="${index}">${tag}<i class="fa-solid fa-xmark" onclick="deleteTag(this, '${tag}')"></i></li>`;
    ulEl.insertAdjacentHTML("afterbegin", tagLI);
  });

  tagsCount();
}

createTag();

function deleteTag(element, index) {
  // console.log(element, tag);
  tags.splice(index, 1);
  // let index = tags.indexOf(tag);
  // tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  // console.log(tags, index);
  element.parentElement.remove();
  localStorage.setItem("tags", JSON.stringify(tags));
  tagsCount();
}

inputEl.addEventListener("keyup", (e) => {
  let tagValue = e.target.value.toLowerCase().trim().replace(/\s+/g, " ");

  if (e.key === "Enter") {
    if (tagValue.length > 1 && !tags.includes(tagValue)) {
      if (tags.length < 10) {
        tagValue.split(",").forEach((tag) => {
          tags.push(tag);
          localStorage.setItem("tags", JSON.stringify(tags));
          createTag();
        });
      }
    }

    e.target.value = "";
  }
});

btnRemove.addEventListener("click", () => {
  tags.length = 0;
  localStorage.setItem("tags", JSON.stringify(tags));
  ulEl.querySelectorAll("li").forEach((li) => li.remove());
  createTag();
});
