"use strict";

var CURRENT_MENU_ITEM = null;

window.addEventListener("load", function () {
  let items = document.querySelectorAll(".menu-item");
  for (let i = 0; i < items.length; ++i) {
    items[i].addEventListener(
      "click",
      function (event) {
        event.stopPropagation();

        if (null != CURRENT_MENU_ITEM) {
          CURRENT_MENU_ITEM.classList.remove("active");
        }

        this.classList.add("active");
        CURRENT_MENU_ITEM = this;
      },
      true
    );
  }

  items[0].click();
});
