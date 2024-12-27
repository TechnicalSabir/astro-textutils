window.onload = () => {
    const dark_mode = localStorage.getItem('dark_mode');
    const text_content = localStorage.getItem('text_content');
    hadle_word_textbox(text_content ?? "");
    if (dark_mode != 'false' && dark_mode != null) {
        dark_mode_radio.checked = true;
        handle_dark_mode(true);
    } else {
        dark_mode_radio.checked = false;
        handle_dark_mode(false);
    }

    const storage_content = localStorage.getItem('text_content');
    text_editor.value = storage_content;
}

function handle_dark_mode(enable = false) {
    const appearance_elem = document.querySelectorAll('.appearance_elem');
    if (enable == true) {
        appearance_elem.forEach((elem) => {
            elem.style.color = "var(--bs-light)";
        })
        document.body.style.background = "#35363e";
    } else {
        document.body.style.background = "white";
        appearance_elem.forEach((elem) => {
            elem.style.color = "var(--bs-dark)";
        })
    }
    localStorage.setItem("dark_mode", enable);
}

const facebook_total_char = 250;
const twitter_total_char = 280;
const google_total_char = 300;

function hadle_word_textbox(text) {
    let words = text.split(/\s+/).filter((element) => {
        return element.length !== 0
    }).length;
    // let character = text.split(" ").filter((element) => { return element.length !== 0 }).length;
    let rm_ex_character = text.split(" ").join("").length;
    let facebook_char = facebook_total_char - rm_ex_character;
    let twitter_char = twitter_total_char - rm_ex_character;
    let google_char = google_total_char - rm_ex_character;

    words_idle.innerText = words;
    char_idle.innerText = text.length;
    facebook_idle.innerText = facebook_char;
    twitter_idle.innerText = twitter_char;
    google_idle.innerText = google_char;

    localStorage.setItem('text_content', text);
}

function handle_uppercase() {
    if (text_editor.value.length > 0) {
        new_text = text_editor.value.toUpperCase();
        text_editor.value = new_text;
        localStorage.setItem('text_content', new_text);
    }
}

function handle_lowercase() {
    if (text_editor.value.length > 0) {
        new_text = text_editor.value.toLowerCase();
        text_editor.value = new_text;
        localStorage.setItem('text_content', new_text);
    }
}

function handle_copytext(elem) {
    text_editor.select();
    navigator.clipboard.writeText(text_editor.value)
    elem.innerText = "Copied";
    elem.disabled = true;
    setTimeout(() => {
        elem.innerText = "Copy Text";
        elem.disabled = false;
    }, 1000);
}

function rm_extra_spaces() {
    let text = text_editor.value;
    let newText = text.split(/[ ]+/).join(" ");
    text_editor.value = newText;
    hadle_word_textbox(newText);
}

function handle_download_txt_file() {
    if (text_editor.value.length > 0) {
        const blob = new Blob([text_editor.value], {
            type: "text/plain"
        });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.download = "textutils.txt";
        anchor.href = url;
        anchor.click();
        URL.revokeObjectURL(blob);
    } else {
        alert("Textbox is empty, Nothing to download.");
    }
}

function handle_clear_text() {
    text_editor.value = null;
    localStorage.removeItem('text_content');
    hadle_word_textbox("");

}