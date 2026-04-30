const containerCadastrar = document.querySelector('.cadastrar');
const inputTarefa = containerCadastrar.querySelector('input');
const btnAdicionar = containerCadastrar.querySelector('button');
const containerTarefas = document.querySelector('.tarefas');
const templateTarefa = containerTarefas.querySelector('template');

function salvarTarefas() {
    const nodeListTarefas = containerTarefas.querySelectorAll(':scope > .tarefa span');
    const arrayTarefas = Array.from(nodeListTarefas).map(span => span.textContent);
    const stringTarefas = JSON.stringify(arrayTarefas);
    localStorage.setItem('tarefas', stringTarefas);
}

function carregarTarefas() {
    const stringTarefas = localStorage.getItem('tarefas');
    const arrayTarefas = JSON.parse(stringTarefas) || [];
    arrayTarefas.forEach(criarTarefa);
}

function criarTarefa(texto) {
    if (texto.trim() === '') return;
    const tarefa = templateTarefa.content.cloneNode(true);
    const spanTitle = tarefa.querySelector('span');
    const btnExcluir = tarefa.querySelector('button');
    spanTitle.textContent = texto;
    btnExcluir.onclick = () => {
        btnExcluir.closest('.tarefa').remove();
        salvarTarefas();
    }
    containerTarefas.appendChild(tarefa);
    salvarTarefas();
}

btnAdicionar.onclick = function () {
    const texto = inputTarefa.value.trim();
    criarTarefa(texto);
    inputTarefa.value = '';
}


inputTarefa.addEventListener('keypress', (event) => {
    if (event.key !== 'Enter') return;
    btnAdicionar.click();
})

carregarTarefas();