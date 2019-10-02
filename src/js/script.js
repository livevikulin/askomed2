import "jquery";
import "jquery-ui-bundle";
import "jquery.maskedinput";
import "@fancyapps/fancybox";
function chechErrorForm(form, check=false, star=false, radio=false){
    var error = '';
    if ($(form).find('.req:visible').length > 0) {
        $(form).find('.req:visible').each(function (i, elem) {
            var errEach = '';
            if($(elem).data('pattern') && $(elem).val() != ''){
                switch($(elem).data('pattern')){
                    case 'mail':
                        var patternMail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
                        if(!patternMail.test($(elem).val())){
                            error = 'mail';
                            errEach='Y';
                        }
                    break;
                }
                
            }else if ($(elem).val() == '') {
                error = 'text';
                errEach='Y';
            }
            if(!errEach) {
                $(elem).removeClass('error');
            }else{
                $(elem).addClass('error');
            }
        });
    }
    if ($(form).find('.req_select:visible').length > 0) {
        $(form).find('.req_select:visible').each(function (i, elem) {
            if ($(elem).find('option:selected').val() == 0) {
                error = 'text';
                $(elem).parent().addClass('error');
            } else {
                $(elem).parent().removeClass('error');
            }
        });
    }
    if(error){
        switch(error){
            case 'text':
                $(form).find('.mess_info').text('Заполните обязательные поля');
            break;
            case 'mail':
                $(form).find('.mess_info').text('Не верный формат почты');
            break;
        }
        $(form).find('.mess_info').css('color', 'red');
    }
    if(radio && !error){
        if($(form).find(".radi[data-errname]:visible").length > 1 && $(form).find(".radi:visible").data('errname')){
            $(form).find(".radi[data-errname]:visible").each(function(i,elem){
                if($(elem).find('[type="radio"]:checked').length == 0){
                    error = 'Y';
                    var text_error = $(elem).data('errname');
                    $(form).find('.mess_info').css('color', 'red').text(text_error);
                }
            });
        }else if($(form).find(".radi:visible").data('errname')){
            if($(form).find('[type="radio"]:visible:checked').length == 0){
                error = 'Y';
                var text_error = $(form).find(".radi:visible").data('errname');
                $(form).find('.mess_info').css('color', 'red').text(text_error);
            }
        }
    }
    if(star && !error){
        if ($(form).find('.star-group').find('input:checked').length == 0) {
            error = 'Y';
            $(form).find('.mess_info').css('color', 'red').text('Поставьте рейтинг');
        } else if(!error) {
            $(form).find('.mess_info').css('color', '').text('');
        }
    }
    if(check && $(form).find('.req[type="checkbox"]:visible').length != 0){
		var checFor = $(form).find('.req[type="checkbox"]:visible:checked');
		var checOff = $(form).find('.req[type="checkbox"]:visible:not([checked])');
        if (checOff.length > 0) {
			error = 'Y';
				checOff.each(function(i, elem){
					var id_check = $(elem).attr('id');
					if($(form).find('[for="'+id_check+'"]:visible').length > 0){
						$(form).find('[for="'+id_check+'"]:visible').css('border-bottom', '1px solid red');
					}
				}); 
        } else {
			checFor.each(function(i, elem){
				var id_check = $(elem).attr('id');
				if($(form).find('[for="'+id_check+'"]:visible').length > 0){
					$(form).find('[for="'+id_check+'"]:visible').css('border-bottom', '1px solid red');
				}
			});
            if($(form).find('.req[type="checkbox"]:visible').length > 0){
                $(form).find('[for="checknda"]:visible').css('border-bottom', '');
            }
        }
    }

    return error;
}
$(document).ready(function() {

	$('select').selectmenu({
		change: function( event, ui ) {
			var option = ui.item.element, select = option.closest('select');
			if(select.attr('name')=='address')
			window.location = '?sect='+$(option).val();
		}
	});
	$('.ui-selectmenu-button').on('click', function() {
		$('.ui-selectmenu-icon').toggleClass('arrow');
	});
	$('.ui-selectmenu-menu').on('click', function() {
		$('.ui-selectmenu-icon').removeClass('arrow');
	});

	$('#search').on('change input', function() {
		var value = $(this).val(), sec = $(this).data('sec'), $this = $(this);
		if (value == "") {
			$this.parent().find('.search-close').hide({
				duration: 200,
			});
			$('.search__result').hide();
		} else if (value != "") {
			$this.parent().find('.search-close').show({
				duration: 200,
			}).on('click', function(){
				$this.val('');
				value = '';
			});
			$.ajax({
				url: "/local/scripts/ajax.php",
				type: "post",
				dataType: "json",
				data: {
					'sec':sec,
					'query':value,
					'type':'search'
				},
				success: function (data) {
					if(data.item){
						if(data.item.length > 0){
							var html = '';
							data.item.forEach(element => {
								html+= '<div class="result-box">\
									<a href="'+element.url+'">\
										<p>Препарат</p><span class="result-box__title">'+element.name+'</span>\
										<p>Дозировка</p><span class="result-box__dosage"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">\
										<path d="M6 2.06667L2.7 5.36667C2.04741 6.01933 1.603 6.85085 1.42297 7.75609C1.24294 8.66132 1.33539 9.5996 1.68861 10.4523C2.04183 11.305 2.63997 12.0338 3.40739 12.5466C4.17481 13.0593 5.07704 13.333 6 13.333C6.92296 13.333 7.82519 13.0593 8.59261 12.5466C9.36003 12.0338 9.95817 11.305 10.3114 10.4523C10.6646 9.5996 10.7571 8.66132 10.577 7.75609C10.397 6.85085 9.9526 6.01933 9.3 5.36667L6 2.06667ZM6 0.181335L10.2427 4.424C11.0818 5.26312 11.6532 6.33222 11.8847 7.4961C12.1162 8.65999 11.9974 9.86638 11.5433 10.9627C11.0891 12.0591 10.3201 12.9962 9.33342 13.6554C8.34672 14.3147 7.18669 14.6666 6 14.6666C4.81332 14.6666 3.65328 14.3147 2.66659 13.6554C1.6799 12.9962 0.91086 12.0591 0.456732 10.9627C0.00260456 9.86638 -0.11622 8.65999 0.115286 7.4961C0.346791 6.33222 0.918228 5.26312 1.75734 4.424L6 0.181335ZM2.66667 8.66667H9.33333C9.33333 9.55072 8.98215 10.3986 8.35702 11.0237C7.7319 11.6488 6.88406 12 6 12C5.11595 12 4.2681 11.6488 3.64298 11.0237C3.01786 10.3986 2.66667 9.55072 2.66667 8.66667Z" fill="#607D8B"/>\
										</svg><span>'+element.doze+'</span></span><span class="result-box__price">'+element.price+'</span>\
									</a>\
								</div>';
							});
							if(html){
								$this.parent().find('.search__result').html(html);
								$('.search__result').show();
							}
						}
					}else{
						$this.parent().find('.search__result').html('');
						$('.search__result').hide();
					}
			}
			});
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
		$('.modal').find('.modal__cost').text($(this).data('formatp'));
		$('.modal').find('[name="id_product"]').val($(this).data('id'));
	});
	$('.modal__close').on('click', function(e) {
		e.preventDefault();
		$('.modals').css({
			display: "none"
		});
		$(this).parent().removeClass('modals-active');
	});
	function moneyFormat(n) {
		return parseFloat(n).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.0', '');
	}
	$('#modals').on('change input', function() {
		var active = $('#modals');
		if (active.val() == "") {
			$('.modal__btn').addClass('disabled-btn')
		} else if(active.val() != "") {
			var modal = active.closest('.modal');
			var price = $(document).find('input[name="price"]').val();
			var quant = Math.ceil(Number(active.val())/10)
			var fulp = quant*Number(price);
			$(modal).find('[name="sum"]').val(fulp);
			$(modal).find('[name="quant"]').val(quant);
			$(modal).find('.modal__cost').text(moneyFormat(fulp)+' руб.');
			$('.disabled-btn').removeClass('disabled-btn')
		}
	});
	
	$("#bankCard").mask("9999 9999 9999 9999");
	$("#cardMonth").mask("99/99");
	$("#securityCard").mask("999");
	$('[data-submit]').on('submit', function(e){
		if($(this).data('prevent'))
		e.preventDefault();
		var fun = $(this).data('submit'), $ths = $(this);
		switch(fun){
			case 'pay':
					var body = new FormData($ths.get(0));
					body.append("type","order");
					if(!chechErrorForm($ths, true)){
						$.ajax({
                            url: "/local/scripts/ajax.php",
                            type: "post",
                            contentType: false,
                            processData: false,
                            dataType: "json",
                            data: body,
                            success: function (data) {
								console.log(data);
								if(data.order_id){
									window.location.href = '/order/?order_id='+data.order_id+'&id_product='+data.id_product+'&sum='+data.sum;
									/*$.ajax({
										url: "/local/scripts/pay.php",
										type: "post",
										data: data,
										success: function (data2) {
											$ths.html(data2);
										}
									});*/
								}
							}
						});
					}
			break;
		}
	});
})