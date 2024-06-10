window.addEventListener('scroll', function() {
    let header = document.querySelector("#header")
    header.classList.toggle("newheader",window.scrollY > 100)
})