
async function fetchProdutos() {
    try {
        const response = await fetch(''../produtos.json'');
        if (!response.ok) {
            throw new Error('Erro ao buscar os produtos: ' + response.statusText);
        }
        const data = await response.json();
        return data.produtos;
    } catch (error) {
        console.error('Erro na busca de produtos:', error);
        return []; 
    }
}


async function renderizarProdutos() {
    try {
        const produtos = await fetchProdutos();
        const produtosContainer = document.querySelector('.principal__meus_produtos__produtos');

        produtosContainer.innerHTML = ''; 

        produtos.forEach(produto => {
            const produtoCard = `
                <div class="card" data-id="${produto.id}">
                    <img class="principal__meus_produtos__produtos__img" src="${produto.imagem}" alt="Imagem do produto">
                    <div class="card-container--info">
                        <p>${produto.nome}</p>
                        <div class="card-container--value">
                            <p>Preço: $${produto.preco.toFixed(2)}</p>
                            <img src="caminho/para/icono-de-eliminacion" alt="Ícone de eliminação" data-id="${produto.id}" class="excluir-produto">
                        </div>
                    </div>
                </div>
            `;
            produtosContainer.insertAdjacentHTML('beforeend', produtoCard);
        });

       
        const botoesExcluir = document.querySelectorAll('.#limpar');
        botoesExcluir.forEach(botao => {
            botao.addEventListener('click', async () => {
                const idProduto = botao.getAttribute('data-id');
                await excluirProduto(idProduto);
                await renderizarProdutos(); 
            });
        });

    } catch (error) {
        console.error('Erro ao renderizar produtos:', error);
    }
}


document.addEventListener('DOMContentLoaded', renderizarProdutos);
