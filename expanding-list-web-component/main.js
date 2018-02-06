// Create a class for the element
class ExpandingList extends HTMLUListElement {
  constructor() {
    // Always call super first in constructor
    super();

		window.onload = function  () {
			var uls = document.querySelectorAll(':root ul');
			var lis = document.querySelectorAll(':root li');
		  for (var i = 0; i < uls.length; i++) {
				  if(i > 0) {
		        uls[i].style.display = 'none';
				  }
			}

			for (var j = 0; j < lis.length; j++) {
					var childText = lis[j].childNodes[0];
		      var newSpan = document.createElement('span');
					newSpan.textContent = childText.textContent;
					childText.parentNode.insertBefore(newSpan, childText);
					childText.parentNode.removeChild(childText);
		  }

		  var spans = document.querySelectorAll(':root span');
		  for (var k = 0; k < spans.length; k++) {
				  if(spans[k].nextElementSibling) {
		        spans[k].style.cursor = 'pointer';
						spans[k].parentNode.setAttribute('class', 'closed');
		        spans[k].onclick = showul;
				  }
		  }
		  function showul(e) {
		      var nextul = e.target.nextElementSibling;
		      if(nextul.style.display == 'block') {
		          nextul.style.display = 'none';
							nextul.parentNode.setAttribute('class', 'closed');
		      } else {
		          nextul.style.display = 'block';
							nextul.parentNode.setAttribute('class', 'open');
					}
		  }
		};
  }
}

// Define the new element
customElements.define('expanding-list', ExpandingList, { extends: 'ul' });
