const textEl=document.getElementById("text-el")
const saveEl=document.getElementById("save-el")
const tabEl=document.getElementById("tab-el")
const delEl=document.getElementById("del-el")
const ulEl=document.getElementById("ul-el")
let myLeads=[]
let leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

saveEl.addEventListener("click",function(){
    myLeads.push(textEl.value)
    textEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads){
    let listItems=""
    for(let i=0;i<leads.length;i++){
        listItems+=`<li><a target='_blank' href='${leads[i]}'>${leads[i]}<a><li>`
    }
    ulEl.innerHTML=listItems
}

tabEl.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

delEl.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    ulEl.innerHTML=""
})