'use strict';

let titleFilter = document.getElementsByClassName('filter__dropdown_title');
let dropdownFilter = document.getElementsByClassName('dropdown-btn_content');
for (let i = 0; i < dropdownFilter.length; i++) {
    for (let j = 0; j < dropdownFilter[i].children.length; j++) {
        dropdownFilter[i].children[j].addEventListener('click', function () {
            this.parentNode.previousElementSibling.innerHTML = this.innerHTML;
        })

    }

}
