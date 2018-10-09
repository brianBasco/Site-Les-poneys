document.addEventListener("DOMContentLoaded",
  function (event) {

      document.querySelector("#tous").addEventListener("click", selectTous);
      document.querySelector("#presents").addEventListener("click", selectPresents);
  }
);

function selectPresents () {
    document.querySelectorAll(".querySelect").forEach(el => {
        let present = el.getAttribute("data-present");
        if(present == 1 || present == 2) el.checked;
        else el.checked = false;
    })
}

function selectTous () {
    document.querySelectorAll(".querySelect").forEach(el => {
        el.checked = true;
    })
}

function recupAdressesMail() {
    let mails = [];
    document.querySelectorAll(".querySelect").forEach(el => {
        if(!el.checked) {
            let mail = el.value;
            mails.push(mail);
        }
    })
    return mails;
}
