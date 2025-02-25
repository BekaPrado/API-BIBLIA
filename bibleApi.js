'use strict'

async function buscarVersiculo() {
    const referencia = document.getElementById('versiculo').value;
    if (!referencia) {
        alert('Digite uma referência válida!');
        return;
    }
    
    try {
        const url = `https://bible-api.com/${encodeURIComponent(referencia)}?translation=almeida`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            throw new Error('Versículo não encontrado');
        }
        
        sessionStorage.setItem('versiculo', JSON.stringify(data));
        window.location.href = 'resultado.html';
    } catch (error) {
        alert('Erro ao buscar o versículo.');
    }
}

async function buscarVersiculoAleatorio() {
    try {
        const url = `https://bible-api.com/?random=1&translation=almeida`; // URL corrigida para versículo aleatório
        const response = await fetch(url);
        const data = await response.json();

        if (!data || !data.reference || !data.text) {
            throw new Error('Erro ao obter versículo aleatório.');
        }

        sessionStorage.setItem('versiculo', JSON.stringify(data));
        window.location.href = 'resultado.html';
    } catch (error) {
        alert('Erro ao buscar um versículo aleatório.');
    }
}

function mostrarResultado() {
    const data = JSON.parse(sessionStorage.getItem('versiculo'));
    
    if (!data || !data.reference || !data.text) {
        document.getElementById('resultado').innerHTML = '<p>Nenhum versículo encontrado.</p>';
        return;
    }
    
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<h2>${data.reference}</h2><p>${data.text}</p>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const pesquisarBtn = document.getElementById('pesquisar');
    const aleatorioBtn = document.getElementById('aleatorio');

    if (pesquisarBtn) {
        pesquisarBtn.addEventListener('click', buscarVersiculo);
    }

    if (aleatorioBtn) {
        aleatorioBtn.addEventListener('click', buscarVersiculoAleatorio);
    }

    if (document.getElementById('resultado')) {
        mostrarResultado();
    }
});
