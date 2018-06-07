$('.inicio, .logo').click(function () {
    window.open(
        'index.html',
        '_self'
    );
});
$('.contacto').click(function () {
    window.open(
        'contacto.html',
        '_self'
    );
});
$('.noticias').click(function () {
    window.open(
        'categoria.html',
        '_self'
    );
});

$('.categorias').click(function () {
    $('.overlay').show();
    $('.categorias-big').show();
});
$('.buscar').click(function () {
    $('.overlay').show();
    $('.buscar-big').show();
});
$('.cerrar').click(function () {
    $('.overlay').hide();
    $('.categorias-big').hide();
    $('.buscar-big').hide();
});


// onload
window.onload = function(){
    $('#div').hide();
}
// var count
var currentWinner;
currentWinner = "1";
  if(currentWinner == "1") {          
}
// slider
$('.slider').slick({
    dots: true,
    autoplay: false,
    pauseOnHover: true,
    autoplaySpeed: 5000,
    infinite: true,
});

$('.previous').click(function () {
    $('.slider').slickPrev();
});
$('.next').click(function () {
    $('.slider').slickNext();
});
// menutoggle
$("#menutoggle").click(function () {
    $("#menu").slideToggle("slow", function () {
        // Animation complete.
    });
});
// others
$('#div').addClass('animated fadeIn');
$('#div').removeClass('animated fadeIn');
$('#div').hide();

// onclicks
$('.logo').click(function () {    $('.logo').hide();
    $('#div').attr('checked', false);
    $('#div').css('background-image', 'url(../img/img.png)');
});
// animated buttons
$("#div").mouseover(function () {
    $("#div").removeClass('class');
    $("#div").addClass('animated tada');
});
$("#div").mouseout(function () {
    $("#div").removeClass('class');
    $("#div").removeClass('animated tada ');
});
// optionals
$('#div').click(function () {
    $('.div')[this.checked ? "show" : "hide"]();
    $("#div").addClass('class');
});
// links
$('#div').click(function () {
    window.open(
        'https://www.url.com/',
        '_blank'
    );
});
// fakeclick
  document.getElementById("#div").click();
// animation revealer
new WOW().init();