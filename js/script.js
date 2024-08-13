"use strict";

const loadNext = document.getElementById("loadmore");
const loadPrev = document.getElementById("loadprev");

let currentPage = 1;
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (responseInfo) {
      if (!responseInfo.ok) {
        throw responseInfo.status;
      }
      return responseInfo.json();
    })
    .then(function (responseData) {
      const fragment = document.createDocumentFragment();

      responseData.data.forEach((element) => {
        const li = document.createElement("li");
        li.textContent = `${element.first_name} ${element.last_name}`;
        const img = document.createElement("img");
        img.src = element.avatar;
        li.appendChild(img);
        fragment.appendChild(li);
      });

      document.getElementById("ul-element").innerHTML = " ";
      document.getElementById("ul-element").appendChild(fragment);

      totalPages = responseData.total_pages;
      updateButtonState();
    })
    .catch(function (error) {
      const pError = document.createElement("p");
      pError.textContent = error === 404 ? "Page Not Found" : "Server Error";
      document.getElementById("data").appendChild(pError);
    });
}

function updateButtonState() {
  loadPrev.disabled = currentPage === 1;
  loadNext.disabled = currentPage === totalPages;
}

getUsers(currentPage);

loadPrev.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    getUsers(currentPage);
  }
});

loadNext.addEventListener("click", function () {
  if (currentPage < totalPages) {
    currentPage++;
    getUsers(currentPage);
  }
});
