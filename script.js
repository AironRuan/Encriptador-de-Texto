document.addEventListener('DOMContentLoaded', function () {
    var campoTexto = document.getElementById('areaTexto');
    var btnCriptografar = document.getElementById('btnCriptografar');
    var btnDescriptografar = document.getElementById('btnDescriptografar');
    var textoDestino = document.getElementById('areaCopia');
    var btnCopiar = document.getElementById('botaoCopiar');
    var campoCopia = document.getElementById('areaCopia');
    var conteudoAreaCopia = document.querySelector('.conteudo__area-de-copia');
    var conteudoMensagens = document.querySelector('.conteudo__principal__mensagens');
    var logoAlura = document.querySelector('.logo-alura');

    // Recarregar a página ao clicar na logo
    logoAlura.addEventListener('click', function () {
        location.reload();
    });

    // Função para criptografar ou descriptografar o texto
    function transformarTexto(funcaoTransformacao) {
        var texto = campoTexto.value.trim();
        if (!texto) return; // Retorna se o campo estiver vazio

        var textoTransformado;
        if (funcaoTransformacao === "criptografar") {
            textoTransformado = texto.replace(/e/g, "enter")
                .replace(/i/g, "imes")
                .replace(/a/g, "ai")
                .replace(/o/g, "ober")
                .replace(/u/g, "ufat");
        } else if (funcaoTransformacao === "descriptografar") {
            textoTransformado = texto.replace(/enter/g, "e")
                .replace(/imes/g, "i")
                .replace(/ai/g, "a")
                .replace(/ober/g, "o")
                .replace(/ufat/g, "u");
        }

        textoDestino.textContent = textoTransformado;
        textoDestino.classList.add('ativo');

        conteudoAreaCopia.style.display = 'block';
        conteudoMensagens.style.display = 'none';
    }

    // Evento de clique para criptografar
    btnCriptografar.addEventListener('click', function () {
        transformarTexto("criptografar");
    });

    // Evento de clique para descriptografar
    btnDescriptografar.addEventListener('click', function () {
        transformarTexto("descriptografar");
    });

    // Evento de clique para copiar o texto
    btnCopiar.addEventListener('click', function () {
        if (campoCopia.value.length > 0) {
            campoCopia.select();
            campoCopia.setSelectionRange(0, 99999);
            document.execCommand('copy');

            // Limpa o campo de texto após copiar
            campoTexto.value = '';
        }
    });

    // Evento de entrada no campo de texto
    campoTexto.addEventListener('input', function () {
        this.value = this.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        this.value = this.value.replace(/[^\w\s]/gi, "");

        // Verifica se o campo de texto está vazio para habilitar/desabilitar os botões
        btnCriptografar.disabled = !this.value.trim();
        btnDescriptografar.disabled = !this.value.trim();
    });
});
