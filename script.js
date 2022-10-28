let i = 0;
let promisse
const mensagens = document.querySelector('.corpo');
setInterval(chat, 3000);
function chat(){
    promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(sucesso);
    promisse.catch(erro);
}
function sucesso(resposta){
    resposta = resposta.data;
    while( i < resposta.length){
        mensagens.innerHTML +=`
        <div>
        <h1>
        (${resposta[i].time}) ${resposta[i].from} para ${resposta[i].to}: ${resposta[i].text}
        </h1>
        </div>
        `
        
        i++;
    }
    
}
function erro(){
    console.log('erro');
}
