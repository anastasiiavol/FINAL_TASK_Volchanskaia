'use strict';

var titleFilter = document.getElementsByClassName('filter__dropdown_title');
var dropdownFilter = document.getElementsByClassName('dropdown-btn_content');
for (var i = 0; i < dropdownFilter.length; i++) {
    for (var j = 0; j < dropdownFilter[i].children.length; j++) {
        dropdownFilter[i].children[j].addEventListener('click', function () {
            this.parentNode.previousElementSibling.innerHTML = this.innerHTML;
        });
    }
}