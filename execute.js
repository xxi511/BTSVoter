var mail = "YOUR_MAIL";
var cheatMode = false;
main();

function main() {
    if (wantToClickVoteView()) return;

    const btn = getSocialButton();
    if (!btn) {
        alert("not figcaption");
        return;
    }
    btn.click();
    wantToClickVoteView();
}

function getSocialButton() {
    const btn = document.getElementsByTagName("figcaption")[0];
    return btn ? btn : null;
}

function wantToClickVoteView() {
    const bts = getVoteView();
    if (!bts) return false;

    bts.getElementsByTagName("button")[0].click();
    wantToClickConfirmVote();
    return true;
}

function getVoteView() {
    const items = Array.from(document.getElementsByClassName("view-vote-item"));
    if (!items || items.length === 0) {
        return null;
    }
    const bts = items.filter(item =>
        item.getElementsByClassName("name")[0].textContent.includes("BTS")
    )[0];
    return bts;
}

function wantToClickConfirmVote() {
    const voteBlock = document.getElementById("thankscat2-A1");
    if (!voteBlock.querySelector("div.name").textContent.includes("BTS")) {
        alert("can't find BTS string");
        return;
    }

    voteBlock.querySelector("div.wrapper-button button").click();
    signInWithMain();
}

function signInWithMain() {
    const optin = document.getElementById("optin_1");
    if (!optin) {
        voteAgain();
        return;
    }
    optin.checked = true;
    optin.value = true;
    optin.setAttribute("class", "");
    const mailLoginString =
        "div.auth-content div.wrapper-buttons button.btn-reveal-email";
    document.querySelector(mailLoginString).click();

    const mailInputSelector = "form.auth-email fieldset input";
    document.querySelector(mailInputSelector).value = mail;

    const confirmSelector = "form.auth-email button.btn-auth-email";
    const confirm_mail_btn = document.querySelector(confirmSelector);
    confirm_mail_btn.disabled = false;
    confirm_mail_btn.click();
    confirm_mail_btn.click();
    voteAgain();
}

function voteAgain() {
    const btn = document.querySelector(
        "div.wrapper-buttons button.btn-thanks-again"
    );
    if (!btn) {
        setTimeout(() => voteAgain(), 200);
        return;
    }
    btn.click();
    if (cheatMode) {
        main();
    }
}
