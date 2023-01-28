const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})

var flag = false;
$("#br").prop("disabled",true);

$(document).click(function(){
	if($("#bTech").prop("checked"))
		$("#br").prop("disabled",false);
	else{
		$("#br").prop("disabled",true);
	}

})




