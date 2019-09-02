import "jquery";
import "jquery-ui-bundle";
import "jquery.maskedinput";

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
	});
	
	var $input = $('input');
	$input.on('change', function() {
		if ($(this).val() == "") {
			$(this).addClass('error');
			$(this).parent('.input-card').removeClass('succsess-icon');
			$(this).parent('.input-card').addClass('error-icon');
			$(this).parent('.input-month').addClass('error-icon');
			$(this).parent('.input-month').removeClass('succsess-icon');
			$(this).parent('.input-security').addClass('error-icon');
			$(this).parent('.input-security').removeClass('succsess-icon');
			$(this).removeClass('succsess');
		} else if ($(this).val() != "") {
			$(this).removeClass('error');
			$(this).parent('.input-card').removeClass('error-icon');
			$(this).parent('.input-card').addClass('succsess-icon');
			$(this).parent('.input-month').removeClass('error-icon');
			$(this).parent('.input-month').addClass('succsess-icon');
			$(this).parent('.input-security').removeClass('error-icon');
			$(this).parent('.input-security').addClass('succsess-icon');
			$(this).addClass('succsess');
		}
	});
	
	$('.pay-btn').on('click', function(e) {
		e.preventDefault();
		$('.modals').css({
			display: "block"
		});
		$('.modal').addClass('modals-active');
	});
	$('.modal__close').on('click', function(e) {
		e.preventDefault();
		$('.modals').css({
			display: "none"
		});
		$(this).parent().removeClass('modals-active');
	});
	$('#modals').on('change input', function() {
		var active = $('#modals');
		if (active.val() == "") {
			$('.modal__btn').addClass('disabled-btn')
		} else if(active.val() != "") {
			$('.disabled-btn').removeClass('disabled-btn')
		}
	});
	
	$("#bankCard").mask("9999 9999 9999 9999");
	$("#cardMonth").mask("99/99");
	$("#securityCard").mask("999");
})