
let produtos = JSON.parse(localStorage.getItem("produtos")) || []
let vendas = JSON.parse(localStorage.getItem("vendas")) || []

function salvar(){
localStorage.setItem("produtos",JSON.stringify(produtos))
localStorage.setItem("vendas",JSON.stringify(vendas))
}

function login(){
let u=document.getElementById("user").value
let p=document.getElementById("pass").value

if(u==="admin" && p==="admin"){
document.getElementById("login").style.display="none"
document.getElementById("app").style.display="block"
render()
}else{
alert("Login inválido")
}
}

function logout(){
location.reload()
}

function showPage(p){
document.querySelectorAll(".page").forEach(x=>x.style.display="none")
document.getElementById(p).style.display="block"
}

function addProduto(){

let nome=document.getElementById("nome").value
let qtd=Number(document.getElementById("qtd").value)
let preco=Number(document.getElementById("preco").value)

if(!nome)return

produtos.push({nome,qtd,preco})

salvar()
render()
}

function remover(i){
produtos.splice(i,1)
salvar()
render()
}

function registrarVenda(){

let i=document.getElementById("produtoVenda").value
let qtd=Number(document.getElementById("qtdVenda").value)

let p=produtos[i]

if(p.qtd<qtd){
alert("Estoque insuficiente")
return
}

p.qtd-=qtd

let valor=qtd*p.preco

vendas.push({
nome:p.nome,
qtd:qtd,
valor:valor
})

salvar()
render()
}

function render(){

let lp=document.getElementById("listaProdutos")
let lv=document.getElementById("listaVendas")
let select=document.getElementById("produtoVenda")

if(lp){
lp.innerHTML=""
produtos.forEach((p,i)=>{
lp.innerHTML+=`
<tr>
<td>${p.nome}</td>
<td>${p.qtd}</td>
<td>R$ ${p.preco}</td>
<td><button onclick="remover(${i})">Excluir</button></td>
</tr>
`
})
}

if(select){
select.innerHTML=""
produtos.forEach((p,i)=>{
select.innerHTML+=`<option value="${i}">${p.nome}</option>`
})
}

if(lv){
lv.innerHTML=""
vendas.forEach(v=>{
lv.innerHTML+=`
<tr>
<td>${v.nome}</td>
<td>${v.qtd}</td>
<td>R$ ${v.valor}</td>
</tr>
`
})
}

dashboard()
}

function dashboard(){

document.getElementById("totalProdutos").innerText=produtos.length

let estoque=produtos.reduce((t,p)=>t+p.qtd,0)
document.getElementById("totalEstoque").innerText=estoque

document.getElementById("totalVendas").innerText=vendas.length

let fat=vendas.reduce((t,v)=>t+v.valor,0)
document.getElementById("faturamento").innerText="R$ "+fat
}

function exportar(){

let csv="Produto,Quantidade,Preco\n"

produtos.forEach(p=>{
csv+=`${p.nome},${p.qtd},${p.preco}\n`
})

let blob=new Blob([csv])
let a=document.createElement("a")
a.href=URL.createObjectURL(blob)
a.download="estoque.csv"
a.click()
}
