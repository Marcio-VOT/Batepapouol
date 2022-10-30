let i = 0;
let promisse
const mensagens = document.querySelector('.corpo');
let nome = ""
let mandaNome
let msg = {
    from:"", to:"", text:"",type:""
}
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
    i = 0;
    mensagens.innerHTML = "";
    while( i < resposta.length){
        // 1-- mensagem de entrando/saindo // 2-- mensagens globais// 3-- mensagens pessoais (só exibe se for pra vc msm)
        
        if(resposta[i].type == "message"){
            mensagens.innerHTML +=`
            <div class="normal texto">
            <h1>
            (${resposta[i].time}) ${resposta[i].from} para ${resposta[i].to}: ${resposta[i].text}
            </h1>
            </div>
            `
        }
        else if(resposta[i].type == "status"){
            mensagens.innerHTML +=`
            <div class="status texto">
            <h1>
            (${resposta[i].time}) ${resposta[i].from} ${resposta[i].text}
            </h1>
            </div>
            `
        }
        else if(resposta[i].type == "private_message" && resposta[i].to == nome.name){
            mensagens.innerHTML +=`
            <div class="private texto">
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
function enviarMensagem(){
    msg.from = nome.name;
    msg.to = "Todos"
    msg.text = document.getElementById('texto').value;
    msg.type = "message"
    if(msg.text != ""){
        let postaMsg = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', msg);
        postaMsg.catch(recarrega);
        postaMsg.then(chat)
    }
    document.getElementById('texto').value = ""
}
function recarrega(){
    window.location.reload();
}
