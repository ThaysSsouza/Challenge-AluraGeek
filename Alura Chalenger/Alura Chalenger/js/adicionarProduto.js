
async function enviarNovoProduto(produto) {
    try {
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });
        
        if (!response.ok) {
            throw new Error('Erro ao adicionar o produto: ' + response.statusText);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Erro ao enviar novo produto:', error);
        return null;
    }
}


function adicionarNovoProduto() {
    const nome = document.getElementById('nome').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const imagem = document.getElementById('imagem').value;

   
    if (nome && valor && imagem) {
        const novoProduto = {
            nome: nome,
            preco: valor,
            imagem: imagem
        };

        enviarNovoProduto(novoProduto).then(data => {
            if (data) {
           
                document.getElementById('nome').value = '';
                document.getElementById('valor').value = '';
                document.getElementById('imagem').value = '';

          
                listarProdutos(); 
            }
        }).catch(error => {
            console.error('Erro ao adicionar novo produto:', error);
        });
    } else {
        console.error('Por favor, preencha todos os campos do formulário.');
    }
}


document.getElementById('guardar').addEventListener('click', adicionarNovoProduto);