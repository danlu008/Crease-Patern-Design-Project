// Get modal and modal content
let modal = document.getElementById( "Modal_About" );
let modalContent = document.getElementById( "ModalContent_About" );

// Get the button that opens the modal
let btn = document.getElementById( "NavButton_About" );

// Get the <span> element that closes the modal
let span = document.getElementById( "ModalCloseButton_About" );

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modalContent.style.animationName = "animate_fade_in";
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    HideModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function ( event ) {
    if ( event.target != modal ) {
        return;
    }
    HideModal();
}

function HideModal() {
    modalContent.style.animationName = "animate_fade_out";
    setTimeout( () => {
        modalContent.style.display = "none";
        modalContent.style.animationName = "animate_fade_in";
        modal.style.animationName = "animate_fade_out";
    }, 400 );
    setTimeout( () => {
        modalContent.style.display = "block";
        modal.style.display = "none";
        modal.style.animationName = "none";
    }, 700 );
}