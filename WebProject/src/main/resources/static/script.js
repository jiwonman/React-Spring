window.onload = () => {
    let rest_str = JSON.parse(window.localStorage.getItem("rest_cards"));
    let complete_str = JSON.parse(window.localStorage.getItem("complete_cards"));
    let rest = document.querySelector("#rest");
    let complete = document.querySelector("#complete");

    for(str of rest_str){
        let new_card = return_new_card(str.trim());
        let beforeNode = document.querySelectorAll("#rest .card");
        rest.insertBefore(new_card, beforeNode[beforeNode.length -1]);
    }

    for(str of complete_str){
        let new_card = return_new_card(str.trim());
        new_card.querySelector(".done-checkbox").checked = true;
        new_card.querySelector(".giveup-checkbox").disabled - true;
        let beforeNode = document.querySelectorAll("#complete .card");
        complete.insertBefore(new_card, beforeNode[beforeNode.length -1]);
    }
    todo_cnt();
}

function add_card(){
    let input = document.querySelector("#todo_input");
    let new_card = return_new_card(input.value);
    let rest = document.querySelector("#rest");
    let beforeNode = document.querySelectorAll("#rest .card");
    rest.insertBefore(new_card, beforeNode[beforeNode.length - 1]);
    todo_cnt();
    memory_card();
    input.value = "";
}

function return_new_card(value){
    return htmlToElement(`
    <div class="card">
        <div class="status-bar">
            <input type="checkbox" class="done-checkbox" onclick="move_card(this)">
            <label class="done-button">Done</label>
            <input type="checkbox" class="giveup-checkbox" onclick="remove_card(this)">
            <label class="giveup-button">Give Up</label>
        </div>
    <hr>
        <div class="item">
            ${value}
        </div>
    </div>
    `)
}

function htmlToElement(html){
    var template = document.createElement('template');
    html = html.trim();             //띄어쓰기, 공백 등 지워줌
    template.innerHTML = html;
    return template.content.firstChild;
}

function move_card(checkbox){
    let checked = checkbox.checked;

    if(checked){
        let card = checkbox.parentElement.parentElement;
        let giveup = checkbox.parentElement.querySelector(".giveup-checkbox");
        let complete = document.querySelector("#complete");
        let beforeNode = document.querySelectorAll("#complete .card");
        card.classList.add('remove');
        setTimeout(() => {
            complete.insertBefore(card, beforeNode[beforeNode.length - 1]);
            card.classList.remove('remove');
            giveup.disabled = true;
            todo_cnt();
            memory_card();
        }, 1200)
    } else{
        let card = checkbox.parentElement.parentElement;
        let giveup = checkbox.parentElement.querySelector(".giveup-checkbox");
        let rest = document.querySelector("#rest");
        let beforeNode = document.querySelectorAll("#rest .card");
        card.classList.add('remove');
        setTimeout(() => {
            rest.insertBefore(card, beforeNode[beforeNode.length - 1]);
            card.classList.remove('remove');
            giveup.disabled = false;
            todo_cnt();
            memory_card();
        }, 1200)
    }
}

function remove_card(checkbox){
    let checked = checkbox.checked;

    if(checked){
        let card = checkbox.parentElement.parentElement;
        card.classList.add('remove');
        setTimeout(() => {
            card.parentNode.removeChild(card);
            todo_cnt();
            memory_card();
        }, 1200);
    }
}

function todo_cnt(){
    let title = document.querySelector(".todo-title");
    let cnt = document.querySelectorAll("#rest .card").length -1;
    title.innerText = `Life Todo (남은 할일 ${cnt}개)`;
}

function memory_card(){
    let rest_cards = document.querySelectorAll("#rest .card");
    let complete_cards = document.querySelectorAll("#complete .card");
    let rest_str = [];
    let complete_str = [];

    for(card of rest_cards){
        let item = card.querySelector(".item");
        if(item){
            rest_str.push(item.textContent);
        }
    }

    for(card of complete_cards){
        let item = card.querySelector(".item");
        if(item){
            complete_str.push(item.textContent);
        }
    }

    window.localStorage.setItem("rest_cards", JSON.stringify(rest_str));
    window.localStorage.setItem("complete_cards", JSON.stringify(complete_str));
}
