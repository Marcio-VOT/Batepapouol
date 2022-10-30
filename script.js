let i = 0;
let promisse
const mensagens = document.querySelector('.corpo');
let nome = ""
let mandaNome
let msg = ""
perguntaNome();
chat();
setInterval(chat, 3000);
setInterval(ficaOn, 5000);
function ficaOn(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nome);
}
function perguntaNome(){
    nome = { name:`${prompt("seu lindo nome")}`}
    mandaNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);
    mandaNome.catch(perguntaNome);
}
function chat(){
    promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(sucesso);
    promisse.catch(erro);
}
function sucesso(resposta){
    resposta = resposta.data;
    i = 0
    mensagens.innerHTML = "";
    while( i < resposta.length){
        // 1-- mensagem de entrando/saindo // 2-- mensagens globais// 3-- mensagens pessoais (só exibe se for pra vc msm)
        
        if(resposta[i].type == "message"){
            mensagens.innerHTML +=`
            <div class="normal">
            <h1>
            (${resposta[i].time}) ${resposta[i].from} para ${resposta[i].to}: ${resposta[i].text}
            </h1>
            </div>
            `
        }
        else if(resposta[i].type == "status"){
            mensagens.innerHTML +=`
            <div class="status">
            <h1>
            (${resposta[i].time}) ${resposta[i].from} ${resposta[i].text}
            </h1>
            </div>
            `
        }
        else if(resposta[i].type == "private_message" && resposta[i].to == nome){
            mensagens.innerHTML +=`
            <div class="private">
            <h1>
            (${resposta[i].time}) ${resposta[i].from} reservadamente para ${resposta[i].to}: ${resposta[i].text}
            </h1>
            </div>
            `
        }
        i++;
    }
    
}
function erro(){
    alert('erro');
}
