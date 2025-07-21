// Esta função é chamada quando o usuário realiza uma pesquisa
function handleSearch() {
    // Obtém o termo de pesquisa digitado pelo usuário e converte para minúsculas para tornar a pesquisa insensível a maiúsculas e minúsculas
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Seleciona todos os elementos com a classe 'content-cursos', que representam os cursos a serem pesquisados
    const cursos = document.querySelectorAll('.content-cursos');

    // Variável para controlar se foram encontrados cursos relacionados à pesquisa
    let resultadosEncontrados = false;

    // Itera sobre cada curso
    cursos.forEach(curso => {
        // Obtém o conteúdo do elemento com a classe 'descricao-curso' dentro do curso atual e converte para minúsculas
        const descricao = curso.querySelector('.descricao-curso').textContent.toLowerCase();

        // Verifica se a descrição do curso inclui o termo de pesquisa
        if (descricao.includes(searchTerm)) {
            // Se o termo de pesquisa estiver contido na descrição, exibe o curso
            curso.style.display = 'block';
            // Atualiza a variável para indicar que resultados foram encontrados
            resultadosEncontrados = true;
        } else {
            // Se o termo de pesquisa não estiver contido na descrição, oculta o curso
            curso.style.display = 'none';
        }
    });
    // Verifica se foram encontrados resultados da pesquisa
    if (resultadosEncontrados) {
        // Se foram encontrados resultados, exibe a mensagem de "Resultados da pesquisa"
        document.getElementById('mensagemPesquisa').innerText = 'Resultados da pesquisa: ';
    } else {
        // Se nenhum resultado foi encontrado, exibe a mensagem de "Nada encontrado"
        document.getElementById('mensagemPesquisa').innerText = 'Nada encontrado';
    }
}
