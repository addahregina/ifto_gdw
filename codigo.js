function pegaDocXML()
{
    const parser = new DOMParser();
    return parser.parseFromString(livraria,"text/xml");
}

function preencherTabela(xmlDoc){
    const raiz = xmlDoc.documentElement;
    const livros = raiz.getElementsByTagName("livro");
    let texto = "";
    for(let livro of livros)
        texto += livroParaTr(livro);
    const corpo = document.querySelector("tbody");
    corpo.innerHTML = texto;
}

function livroParaTr(livro) {
    const titulo = pagaDadoDoLivro("titulo", livro);
    const autor = pagaDadoDoLivro("autor", livro);
    const ano = pagaDadoDoLivro("ano", livro);
    const preco = pagaDadoDoLivro("preco", livro);

    return `<tr>
        <td>${titulo}</td>
        <td>${autor}</td>
        <td>${ano}</td>
        <td>${preco}</td>
    </tr>`;
}


function createList (elements, properties){
    let list = '<ul>';
    for(let el of elements )
        list+= '<li>'+eval("el"+properties)+"</li>";
    list += '</ul>'; 
    return list;

}


//const preco = livro.getElementsByTagName("preco")[0].firstChild.nodeValue;
//let pagaDadoDoLivro = (tag, livro) => livro.getElementsByTagName(tag)[0].firstChild.nodeValue;
function pagaDadoDoLivro(tag,livro){
   const tags = livro.getElementsByTagName(tag);   
   if(tags.length > 1){
    return createList(tags,".firstChild.nodeValue");
   } else {
    return tags[0].firstChild.nodeValue;
   }
}

preencherTabela(pegaDocXML());

// INCLUI FILTRO

let formatarParaBusca = (str) => str.replace(/( )/g, '').toLowerCase();



document.getElementById("titulo").onkeyup = pesquisar;

function pesquisar(e) {
  let pesquisa = e.target.value;
  pesquisa = formatarParaBusca(pesquisa);
  console.log(pesquisa);

  var dados = 'X Query Kick Start'; 
    dados = formatarParaBusca(dados);

  
  let resultadoPesquisa = dados.search(pesquisa);
  if(resultadoPesquisa > 0){
    console.log(titulo); 
  }

 
}
