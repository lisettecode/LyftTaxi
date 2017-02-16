var cargar = function () {
	var locationhref = location.href.indexOf("map.html");
	if (locationhref > 0) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}

	$("#numero").keydown(validaNumeros);
	$("#numero").keyup(longCel);
	$("#numero").keypress(deshabilitarTecla);
	$("#siguiente").click(generadorCodigo);
	$(".codigo").keypress(longCodigo);
	$(".codigo").keydown(validaNumeros);
	$(".codigo").keyup(cambiaInput);
	$("#siguienteValidar").click(validarCodigo);
	$("#resend").click(reenviar);
	$("#siguienteRegistro").click(validarData);
	$(".datos").keyup(primeraMayuscula);
	$("#nombre").keypress(soloLetras);
	$("#apellidos").keypress(soloLetras);
	$("#cel").text(window.localStorage.getItem("celu"));
	$("#nombre-perfil").text(window.localStorage.getItem("nombre"));
	$("#apellido-perfil").text(window.localStorage.getItem("apellido"));
	$("#fecha").text(window.localStorage.getItem("fecha"));
	$("#contacto").click(aparecePerfil);
	$("#mitad").click(apareceMap);
	$("#dire").dblclick(limparInput);
	$("#inputFile").change(cambiarFoto);
	$("#pick").click(generarDirec);
	$("#done").click(nuevaData);

	$("#username").text(localStorage.getItem("nombre") + " " + localStorage.getItem("apellido"));

	var fotoPerfil = localStorage.getItem("guarFoto");
	var nombre = localStorage.getItem("nombre");
	var apellido = localStorage.getItem("apellido");
	var correo = localStorage.getItem("email");
	if (fotoPerfil != null) {
		$("#fotoGuar").attr("src", fotoPerfil);
		$("#fotoprev").attr("src", fotoPerfil);
		$("#semiFoto").attr("src", fotoPerfil);
	}
	if (nombre != null && apellido != null && correo != null) {
		$("#name").val(nombre);
		$("#lastname").val(apellido);
		$("#email").val(correo);
	}
}
$(document).ready(cargar);
var validaNumeros = function (e) {
	var ascii = e.keyCode;
	if (ascii == 8 || ascii == 9 || (ascii >= 48 && ascii <= 57)) {
		return true;
	} else {
		return false;
	}
}
var longCel = function () {
	if ($(this).val().length == 9) {
		$("#siguiente").attr("href", "verificar-numero.html");
	} else {
		$("#siguiente").removeAttr("href");
	}
}

var deshabilitarTecla = function () {
	if ($(this).val().length < 9) {
		return true;
	} else {
		return false;
	}
}

var generadorCodigo = function (e) {
	e.preventDefault();
	var longitud = $("#numero").val().length;
	var numeroAleatorio = Math.floor(Math.random() * 900) + 99;
	if (longitud === 9) {
		window.localStorage.setItem("numberRandom", numeroAleatorio);
		swal({
			title: "Tu codigo aleatorio es : ",
			text: "LAB-" + localStorage.getItem("numberRandom"),
			type: "success",
			showCancelButton: false,
			confirmButtonText: "OK",
			closeOnConfirm: true
		}, function () {
			localStorage.setItem("celu", $("#numero").val());
			window.location.href = $("#siguiente").attr("href");
		});
	}
}


var reenviar = function (e) {
	e.preventDefault();
	var numeroAleatorio2 = Math.floor(Math.random() * 900) + 99;
	window.localStorage.setItem("numberRandom2", numeroAleatorio2);
	swal({
		title: "Tu codigo aleatorio es : ",
		text: "LAB-" + localStorage.getItem("numberRandom2"),
		timer: 2000,
		showConfirmButton: false
	});

	$(".codigo").val("");
	$(".codigo").eq(0).focus();

}

var longCodigo = function () {
	if ($(this).val().length === 0) {
		$("#siguiente").attr("href", "signup.html");
	} else {
		return false;
	}

}

var cambiaInput = function (e) {
	var long = $(this).val().length;
	if (long == 1) {
		$(this).next().focus();
	}
	if (e.keyCode == 8) {
		$(this).prev().focus();
	}
}

var validarCodigo = function () {
	var concatCode = $(".codigo").eq(0).val() + $(".codigo").eq(1).val() + $(".codigo").eq(2).val();
	if (concatCode === localStorage.getItem("numberRandom") || concatCode === localStorage.getItem("numberRandom2")) {
		$("#siguienteValidar").attr("href", "signup.html");
	} else if ($(".codigo").val().length == 0) {
		swal("Ingrese su código por favor")
	} else {
		$(".codigo").val("");
		$(".codigo").eq(0).focus();
		swal("Código inválido")
	}
}

var validarData = function () {
	var nombre = $("#nombre").val().trim().length;
	var apellidos = $("#apellidos").val().trim().length;
	var emailong = $("#email").val().trim().length;
	var email = $("#email").val().trim();
	var regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

	var validacheck = $("#checkbox").is(":checked");

	if (nombre > 1 && nombre < 20 && apellidos > 1 && apellidos < 30 && emailong > 5 && emailong < 50 && regexEmail.test(email) && validacheck) {
		window.localStorage.setItem("nombre", $("#nombre").val());
		window.localStorage.setItem("apellido", $("#apellidos").val());
		$(this).attr("href", "map.html");
	} else {
		swal({
			title: "Datos incorrectos",
			text: "Ingresa correctamente tu información",
			timer: 2000,
			showConfirmButton: false
		});
	}
	var obtenerName = $("#nombre").val();
	localStorage.setItem("nombre", obtenerName);

	var obtenerLastName = $("#apellidos").val();
	localStorage.setItem("apellido", obtenerLastName);

	var obtenerEmail = $("#email").val();
	localStorage.setItem("email", obtenerEmail);
}

var primeraMayuscula = function (e) {
	var dato = $(this).val();
	var letraMayuscula = dato.charAt(0).toUpperCase(); // Saca la primera letra y la vuelve Mayuscula
	// S //       +  Toda la palabra
	var concatenarDato = letraMayuscula + dato.substr(1, dato.length);
	$(this).val(concatenarDato);
}

var soloLetras = function (e) {
	key = e.keyCode || e.which;
	tecla = String.fromCharCode(key).toLowerCase();
	letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
	especiales = "8-37-39-46";
	tecla_especial = false
	for (var i in especiales) {
		if (key == especiales[i]) {
			tecla_especial = true;
			break;
		}
	}
	if (letras.indexOf(tecla) == -1 && !tecla_especial) {
		return false;
	}
	var meses = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var f = new Date();
	var fecha = "JOINED " + meses[f.getMonth()].toUpperCase() + " " + f.getFullYear();
	inicio = localStorage.setItem("fecha", fecha);
}
var funcionExito = function (pos) {
	var lat = pos.coords.latitude;
	var lon = pos.coords.longitude;
	var latlon = new google.maps.LatLng(lat, lon);
	$("#map").addClass("tamanoMapa");

	var misOpciones = {
		center: latlon,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.SMALL
		}
	};

	var mapa = new google.maps.Map(document.getElementById("map"), misOpciones);

	var marcador = new google.maps.Marker({
		position: latlon,
		map: mapa,
		title: "You are here"
	});

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		"latLng": latlon
	}, direcActual);
}
var direcActual = function (resultado, estado) {
	if (estado == google.maps.GeocoderStatus.OK) {
		if (resultado[0]) {
			$("#dire").val(resultado[0].formatted_address);
		}
	}
}
var funcionError = function (error) {
	swal("ERROR");
}
var aparecePerfil = function () {
	$("#mitad").removeClass("ocultar");
}
var apareceMap = function () {
	$("#mitad").addClass("ocultar");
}
var generarDirec = function () {
	var direccion = $("#dire").val();
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		"address": direccion
	}, dirResultado);
}
var dirResultado = function (resultado, estado) {
	if (estado) {
		var opMap = {
			center: resultado[0].geometry.location,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};

		var mapa = new google.maps.Map(document.getElementById("map"), opMap);
		mapa.fitBounds(resultado[0].geometry.viewport);

		var markerOptions = {
			position: resultado[0].geometry.location
		}
		var marker = new google.maps.Marker(markerOptions);
		marker.setMap(mapa);
	}
}
var limparInput = function () {
	$("#dire").val("");
}
var cambiarFoto = function (e) {
	if (e.target.files && e.target.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			var guardarFoto = e.target.result;
			$("#fotoprev").attr("src", guardarFoto);
			localStorage.setItem("guarFoto", guardarFoto);
		}
		reader.readAsDataURL(e.target.files[0]);

	}
}

var nuevaData = function () {
	var nombre = $("#name").val().trim().length;
	var apellidos = $("#lastname").val().trim().length;
	if (nombre > 1 && nombre < 20 && apellidos > 1 && apellidos < 30) {
		window.localStorage.setItem("nombre", $("#name").val());
		window.localStorage.setItem("apellido", $("#lastname").val());
		$(this).attr("href", "geolocation.html");
	} else {
		swal({
			title: "Datos incorrectos",
			text: "Ingresa correctamente tu información",
			timer: 2000,
			showConfirmButton: false
		});
	}

}