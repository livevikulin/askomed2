import "jquery";
import "jquery-ui-bundle";

$(document).ready(function() {

	$('select').selectmenu();
	$('.ui-selectmenu-button').on('click', function() {
		$('.ui-selectmenu-icon').toggleClass('arrow');
	});
	$('.ui-selectmenu-menu').on('click', function() {
		$('.ui-selectmenu-icon').removeClass('arrow');
	});

	$('#search').on('change input', function() {
		if ($(this).val() == "") {
			$(this).parent().find('.search-close').hide({
				duration: 200,
			});
			$('.search__result').hide();
		} else if ($(this).val() != "") {
			$(this).parent().find('.search-close').show({
				duration: 200,
			});
			$('.search__result').show();
		}
	})
})