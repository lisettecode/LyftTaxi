function init(){
    var lista = document.getElementById('lista-paises');
    var links = lista.getElementsByTagName('a'); 
    for ( var i = 0; i < links.length; i++)
        {
            links[i].addEventListener('click', onLinkClick);
        }
}

function onLinkClick(){
    localStorage.setItem('pais', this.textContent);
}