let optionsButtons =document.querySelectorAll(".option-button");
let advanceOptionButton =document.querySelectorAll("adv-option-button");
let fontName =document.getElementById("fontName");
let fontSizeRef =document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton =document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons =document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll("format");
let scriptButtons =document.querySelectorAll(".script");
// list of fontList
let fontList=["Arial",
"Verdana",
"Times New Roman",
"Garamond",
"Georgia",
"Courier New",
"cursive"
];
// Initial settings
const initializer =() =>{
    // function calls for highlighting buttons
    // no highlights for link , unlink ,lists ,undo ,redo since they are one time operations
    highlighter(alignButtons,true);
    highlighter(spacingButtons,true);
    highlighter(formatButtons,false);
    highlighter(scriptButtons,true);

    // create options for font names
    fontList.map((value) =>{
        let option =document.createElement("options");
        option.value =value;
        option.innerHTML =value;
         fontName.appendChild(option);
    });

    // fontSize allows only till?
    for(let i=1;i<=7;i++){
        let option = document.createElement("option");
        option.value =i;
        option.innerHTML =i;
        fontSizeRef.appendChild(option);
    }
    // default size
    fontSizeRef.value =3;


};
// main logic
const modifyText =(command ,defaultUi ,value)=>{
    // execCommand executes command on selected text
    document.execCommand(command ,defaultUi ,value);
};
// for basic operation which don't need value parameter
optionsButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        modifyText(button.id ,false,null);
    });
});
// optiond that require value parameter (eg.colors,fonts)
advanceOptionButton.forEach((button)=>{
    button.addEventListener("change",()=>{
        modifyText(button.id,false,button.value);
    });
});
// link
linkButton.addEventListener("click",()=>{
    let userLink =propmpt("Enter");
    // if link has http then pass directly else add http
    if(/http/i.test(userLink)){
        modifyText(linkButton.id,false,userLink);
    }
    else{
        userLink ="http://" + userLink;
        modifyText(linkButton.id,false,userLink);
    }
});

// Highlight  clicked button
const highlighter =(className , needsRemoval) =>{
    className.forEach((button) =>{
       button.addEventListener("click",()=>{
// needsRemoval =true means only one button should be highlight and other would be normal
if(needsRemoval){
    let alreadyActive =false;
    // if currently clicked button is already active
    if(button.classList.contains("active")){
        alreadyActive=true;
    }
    // remove higlight from other buttons
    highlighterRemover(className);
    if(!alreadyActive){
        // highlight clicked button
        button.classList.add("active");
    }
}
else{
    // if other buttons can be highlighted
    button.classList.toggle("active");
}
       });
    });
};

const highlighterRemover=(className) =>{
    className.forEach((button)=>{
button.classList.remove("active");
    });
};