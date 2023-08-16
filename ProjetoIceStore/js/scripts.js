var header = document.getElementById("header");
var navigationHeader = document.getElementById("header_navegacao");
var content = document.getElementById("content");
var showSidebar = false;
var subMenu = document.getElementById("subMenu");

function aplicarDesfoque() {
  content.classList.toggle("blurred", showSidebar || subMenu.classList.contains("open_menu"));
}

function fecharMenuLateral() {
  showSidebar = false;
  navigationHeader.style.cssText = "margin-left: -100vw; animation-name: animacaoslide2;";
  aplicarDesfoque();
}

function fecharSubMenu() {
  subMenu.classList.remove("open_menu");
  aplicarDesfoque();
}

function fecharMenus() {
  fecharMenuLateral();
  fecharSubMenu();
}

function mostrarSidebar() {
  showSidebar = !showSidebar;

  if (showSidebar) {
    navigationHeader.style.cssText = "margin-left: -10vw; animation-name: animacaoslide;";
  } else {
    fecharMenus();
  }

  aplicarDesfoque();
}

function verificarTamanhoJanela() {
  if (window.innerWidth > 768) {
    fecharMenus();
  }
}

window.addEventListener("resize", verificarTamanhoJanela);

function abrirmenu() {
  subMenu.classList.toggle("open_menu");
  aplicarDesfoque();
}

function fecharMenusClick(event) {
  if (!header.contains(event.target) && !event.target.classList.contains("btn_header")) {
    fecharMenus();
  }
}

function updateCarousel() {
  const windowWidth = window.innerWidth;
  const isSmallScreen = windowWidth < 768;

  const imagesOriginal = [
    "imagens/carrosel1.png",
    "imagens/carrosel2.png",
    "imagens/aaaa.png",
  ];

  const imagesMaior = [
    "imagens/1maior.png",
    "imagens/2maior.png",
    "imagens/3maior.png",
  ];

  const carouselSlides = document.querySelectorAll(
    "#carouselExampleAutoplaying .carousel-item img"
  );

  carouselSlides.forEach((imgElement, index) => {
    imgElement.src = isSmallScreen ? imagesMaior[index] : imagesOriginal[index];
  });
}

updateCarousel();
window.addEventListener("resize", updateCarousel);
window.addEventListener("click", fecharMenusClick);


function formatarCPF(input) {
    let cpf = input.value.replace(/\D/g, '');
    cpf = cpf.slice(0, 11);

    if (cpf.length > 3 && cpf.length <= 6) {
        cpf = cpf.replace(/^(\d{3})(\d{0,3})/, '$1.$2');
    } else if (cpf.length > 6 && cpf.length <= 9) {
        cpf = cpf.replace(/^(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else if (cpf.length > 9) {
        cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }

    input.value = cpf;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
        document.getElementById('cpf-validation-result').textContent = '';
        return;
    }

    let sum = 0;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
        document.getElementById('cpf-validation-result').textContent = 'CPF inválido';
        return;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
        document.getElementById('cpf-validation-result').textContent = 'CPF inválido';
    } else {
        document.getElementById('cpf-validation-result').textContent = '';
    }
}
function validarCartao(cartao) {
    cartao = cartao.replace(/\s/g, ''); 
    let brand = '';
    let imagePath = '';

    if (/^4/.test(cartao)) {
        brand = 'Visa';
        imagePath = 'imagens/visa.png';
    } else if (/^5[1-5]/.test(cartao)) {
        brand = 'Mastercard';
        imagePath = 'imagens/mastercard.png';
    } else if (/^3[47]/.test(cartao)) {
        brand = 'American Express';
        imagePath = 'imagens/amex.png';
    } else {
        brand = '';
        imagePath = '';
    }

    const brandImage = document.getElementById('cartao-image');
    const brandText = document.getElementById('cartao-brand-text');

    if (cartao.length > 0 && brand !== '') {
        brandImage.style.display = 'block';
        brandImage.src = imagePath;
        brandText.textContent = brand;
    } else {
        brandImage.style.display = 'none';
        brandText.textContent = '';
    }
}

function formatarCartao(input) {
    let cartao = input.value.replace(/\s/g, ''); // Remover espaços em branco
    cartao = cartao.slice(0, 19);
    cartao = cartao.replace(/\D/g, '');

    if (cartao.length > 0) {
        cartao = cartao.match(/.{1,4}/g).join(' ');
    }

    input.value = cartao;
}
function redirecionarParaPagina(url) {
  window.location.href = url;
}