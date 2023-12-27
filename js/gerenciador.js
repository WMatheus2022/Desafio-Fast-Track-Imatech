document.addEventListener('DOMContentLoaded', function () {
    const elements = {
        inputNovaTarefa: document.querySelector('#inputTarefa'),
        btnCriarTarefa: document.querySelector('#btn-tarefa'),
        listasTarefas: document.querySelector('#listaTarefas'),
        inputDataInicio: document.querySelector('#inputDataInicio'),
        inputDataTermino: document.querySelector('#inputDataTermino'),
        inputHoraInicio: document.querySelector('#inputHoraInicio'),
        inputHoraTermino: document.querySelector('#inputHoraTermino'),
        inputDescricao: document.querySelector('#validationTextarea'),
        navBarPerfil: document.querySelector('#profile-tab')
    };

    // Função para pegar o nome do usuário no LocalStorage
    const loginData = JSON.parse(localStorage.getItem('loginData'));

    // Atualizar o nome na NavBar
    if (loginData && loginData.nome.value) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        a.innerHTML = loginData.nome;

        li.appendChild(a);
        elements.navBarPerfil.appendChild(li); // Assuming navBarPerfil is a ul or ol element
    }

    const validFields = {
        inputNovaTarefa: false,
        inputDataInicio: false,
        inputDataTermino: false,
        inputHoraInicio: false,
        inputHoraTermino: false,
        inputDescricao: false,
    };

    // Função para validar e atualizar o estilo do campo
    function validateAndStyleInput(input, minLength) {
        const value = input.value.trim();
        const isValid = value.length >= minLength && value !== '';

        input.style.borderColor = isValid ? 'green' : 'red';
        input.style.color = isValid ? 'green' : 'red';

        return isValid;
    }

    // Adicionando eventos de teclado para validação em tempo real
    for (const key in validFields) {
        if (validFields.hasOwnProperty(key)) {
            const element = elements[key];
            element.addEventListener('input', () => {
                validFields[key] = validateAndStyleInput(element, 1);
            });
        }
    }

    elements.btnCriarTarefa.addEventListener('click', criarTarefa);

    function criarTarefa() {
        if (Object.values(validFields).every(field => field)) {
            const tarefa = {
                nome: elements.inputNovaTarefa.value,
                id: gerarId(),
                dataInicio: elements.inputDataInicio.value,
                dataTermino: elements.inputDataTermino.value,
                horaInicio: elements.inputHoraInicio.value,
                horaTermino: elements.inputHoraTermino.value,
                descricao: elements.inputDescricao.value,
            };
            const li = criarTagLi(tarefa);
            elements.listasTarefas.appendChild(li);
            resetFields();
        } else {
            alert("Preencha todos os campos.");
        }
    }

    function resetFields() {
        for (const key in validFields) {
            if (validFields.hasOwnProperty(key)) {
                const element = elements[key];
                element.value = '';
                element.style.borderColor = '';
                element.style.color = '';
            }
        }
    }

    function gerarId() {
        return Math.floor(Math.random() * 3000);
    }

    function criarTagLi(tarefa) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('textoTarefa');
        span.innerHTML = tarefa.nome;

        const div = document.createElement('div');
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btnAcao', 'edit-btn');
        btnEditar.innerHTML = '<i class="fa fa-pencil"></i></button>';
        btnEditar.setAttribute('data-toggle', 'modal');
        btnEditar.setAttribute('data-target', '#editModal');

        const btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btnAcao', 'delete-btn');
        btnExcluir.innerHTML = '<i class="fa fa-trash"></i></button>';
        btnExcluir.setAttribute('data-toggle', 'modal');
        btnExcluir.setAttribute('data-target', '#deleteModal');

        div.appendChild(btnEditar);
        div.appendChild(btnExcluir);

        li.appendChild(span);
        li.appendChild(div);
        return li;
    }

    // Adiciona eventos de clique nos botões de editar e excluir
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-btn')) {
            // Lógica para lidar com o botão de editar
            const li = event.target.closest('li');
            const span = li.querySelector('.textoTarefa');
            const inputEditTarefa = document.querySelector('#editInputTarefa');
            inputEditTarefa.value = span.innerHTML;
        } else if (event.target.classList.contains('delete-btn')) {
            // Lógica para lidar com o botão de excluir
            // Você pode adicionar aqui o código para confirmar a exclusão
        }
    });
});
