function listaSignos(signoBase) {
	while ( signos[0] != signoBase )
		signos.unshift(signos.pop());
	return signos;
}

function insereOpcoesdeSignos() {
	$.each(signos, function(chave, valor) {
		$('<option>').attr('value', valor).text(valor).appendTo($('.seletor-signo'));
	});
}

function montaAspectos() {
	$.each(aspectos, function(chave, valor) {
		$('<option>').attr('value', valor).text(valor).appendTo($('.seletor-aspecto '));
	});
}

function preencheLinha(signos) {
 	var i = 0;
 	$('.signo').each(function() {
 		$(this).text(signos[i]);
 		i++;
 	});
}

function montaTabela() {

	var tabela = $('<table>').attr('id', 'tabela-signo').addClass('table table-striped table-hover table-responsive text-center');

	var head = $('<thead>').appendTo(tabela);
	$('<th>').addClass('col-xs-2 text-center').text('Casas').appendTo(head);
	$('<th>').addClass('col-xs-4 text-center').text('Signo').appendTo(head);
	$('<th>').addClass('col-xs-6 text-center').text('Aspectos').appendTo(head);

	var body = $('<tbody>').appendTo(tabela);
	for ( var i = 0; i < 12; i++ ) {
		var linha = $('<tr>').appendTo(body);
		if ( i == 0 ) linha.addClass('info'); // refatorar
		$('<td>').text(i+1).appendTo(linha);
		$('<td>').appendTo(linha).addClass('signo');
		$('<td>').appendTo(linha).addClass('aspecto');
	}

	tabela.appendTo($('#dados'));
}

function adicionaAspecto() {
	var signo = $(".seletor-signo.aspecto option:selected").val();
	var aspecto = $(".seletor-aspecto option:selected").val();

	var celula = $('#tabela-signo').find(".signo:contains(" + signo + ")").next();
	var rotulo = $('<span>').addClass('label label-default').text(aspecto);

	rotulo.appendTo(celula);
}

function getText(signo, aspecto) {
	if ( aspecto )
		return data[signo][aspecto];
	else {
		var campo = 'desc';
		return data[signo][campo];
	}
}

function significadoLetra(letra) {
	return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut pa qui offi'
}

function inserePainel(local, signo, aspecto) {
	// código painel + inserir após resultado
	var titulo, texto;
	if ( aspecto != null ) {
		titulo = aspecto + ' em ' + signo;
		texto = getText(signo, aspecto);
	}
	else {
		titulo = signo;
		texto = getText(signo);
	}
	var painel = $('<div>').addClass('panel panel-default')
		.appendTo($('<div>').attr('id','paineis').addClass('col-xs-12').appendTo(local));
	$('<h3>').addClass('panel-title').text(titulo)
		.appendTo($('<div>').addClass('panel-heading')
			.appendTo(painel));
	$('<div>').addClass('panel-body').text(texto)
		.appendTo(painel);
}

function getAspectos() {
	var aspectos = [];
	$('td.aspecto').each(function() {
		$(this).children().each(function() {
			aspectos.push($(this));
		});
	});
	return aspectos;
}

function incluirPainelSignos() {
	$('.signo').each(function() {
		inserePainel('#resultado-signos',$(this).text(), null);
	});
}

function incluirPainelAspectos() {
	var aspectos = [];
	$('.signo').each(function() {
		var signo = $(this).text();
		$(this).next().children().each(function() {
			aspectos.push(($(this).text()));
		});

		for (var i = 0; i < aspectos.length; i++) {
			inserePainel('#resultado-aspectos',signo, aspectos[i]);
		}
		aspectos = [];
	});
}

function incluirAnaliseNome() {
	var letras = $('#nome').val().toUpperCase().split("");

	for ( var i = 0; i < letras.length; i++ ) {
		var linha = $('<tr>');
		$('<th>').addClass('col-xs-1').text(letras[i]).appendTo(linha);
		$('<td>').addClass('col-xs-11').text(significadoLetra(letras[i])).appendTo(linha);
		linha.appendTo($('#analise-nome > tbody'));
	}
}

function geraResultado() {
	$('#resultados').children().remove();

	var divSignos = $('<div>').attr('id', 'resultado-signos').appendTo('#resultados');
	var divAspectos = $('<div>').attr('id', 'resultado-aspectos').appendTo('#resultados');
	var divNome = $('<div>').attr('id', 'resultado-nome').appendTo('#resultados');

	$('<h2>').text('Signos').appendTo(divSignos);
	$('<h2>').text('Aspectos').appendTo(divAspectos);
	$('<h2>').text('Análise do Nome').appendTo(divNome);

	var estruturaTabela = $('<table>', {
		'id':'analise-nome',
		'class':'table table-bordered table-striped table-hover'
	});

	var cab = $('<thead>');
	$('<th>').text('Letras').appendTo(cab);
	$('<th>').text('Significado').appendTo(cab);
	$('<tbody>').appendTo(estruturaTabela);
	cab.appendTo(estruturaTabela);

	estruturaTabela.appendTo(
		$('<div>').addClass('col-xs-12')
			.appendTo($('<div>').addClass('row'))
			.appendTo(divNome)
	);
	incluirPainelSignos();
	incluirPainelAspectos();
	incluirAnaliseNome();

	$('#paineis .panel').first().removeClass('panel-default').addClass('panel-primary');
	$('#btn-baixa-pdf').removeClass('hidden');
	$('<hr>').insertAfter($('#btn-baixa-pdf'));
}

function deletaAspectos() {
	$('td.aspecto').each(function() {
		$(this).children().each(function() {
			$(this).remove();
		});
	});
}

function testeAutomatizado() {

	// seleciona signo
	$(preencheLinha(listaSignos('Áries')));

	// insere aspectos
	var celula = $('#tabela-signo').find(".signo:contains(Touro)").next();
	$('<span>').addClass('label label-default').text("Lua").appendTo(celula);
	$('<span>').addClass('label label-default').text("Marte").appendTo(celula);
}

function geraPDF() {
	console.log('Gerar PDF');
	var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
	var doc = new jsPDF();

	doc.setFontSize(40);
	doc.text(20,20, 'Mapa Astral');

	doc.setFontSize(18);
	doc.text(20,30, 'Signos');

	doc.setFontSize(12);
	doc.text(20,40, lorem);

	doc.save('mapa.pdf');
}

$(document).ready( function() {
	$(insereOpcoesdeSignos());
	$(montaTabela());
	$(montaAspectos());
	// $(testeAutomatizado());

	$('form').attr('onsubmit', 'return false;'); // previne que a página seja recarregada

	$('#select').change(function() {
		$('#run').removeAttr('disabled');
	});

	$('#run').click(function() {
		var signo = $(".seletor-signo option:selected").val();
		$(preencheLinha(listaSignos(signo)));
		deletaAspectos();
		$('select, #gera-resultado').removeAttr('disabled');
	});

	$('#adiciona-aspecto').click(adicionaAspecto);

	$('span.label').dblclick(function() {
		$(this).remove();
	});

	$('#gera-resultado').click(geraResultado);
});
