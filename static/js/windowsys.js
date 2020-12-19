function changewindow(window) {
    try {
        //var shownapp = document.getElementsByClassName("app-shown")[0];
        //shownapp.classList.add("app-hidden");
        //shownapp.classList.remove("app-shown");
        const windowloop1 = document.getElementsByClassName("app-shown");
        for (let e of windowloop1) {
            //e.style.opacity = 0;
            //e.classList.add("app-hidden");
            e.classList.remove("app-shown")
            e.classList.add("app-hidden")
        }
    }
    catch {
        console.log("No windows active");
    }

    //document.getElementById(window).style.opacity = 1;
    document.getElementById(window).classList.add("app-shown")
    document.getElementById(window).classList.remove("app-hidden")
    //document.getElementById(window).classList.remove("app-hidden");
}