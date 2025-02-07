function header(){
    let header = document.createElement('header');
    header.className = "header";

   let logo = document.createElement('img');
   logo.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxbtRx38YooBcnlvor9Q3ffBxkcFjfHicTw&s";
   logo.alt = "";
   header.appendChild(logo);


   let h1 = document.createElement('h1');
   h1.innerText = "Hola mundo";
   h1.className = "h1";
   header.appendChild(h1);

    return header;
}

export {header}