const sliderinp = document.querySelector(".slider");
const passlen = document.querySelector("#plen");
const disp = document.querySelector("[data-pass]");
const cpbut = document.querySelector("[data-but]");
const cpmsg = document.querySelector("[data-copyM]");
const upper =document.querySelector("#ch1");
const lower =document.querySelector("#ch2");
const num =document.querySelector("#ch3");
const symb =document.querySelector("#ch4");
const genbut = document.querySelector("#gen");
const ind = document.querySelector("#passstrength");
const allchb = document.querySelectorAll("input[type=checkbox]");

let pass = "";
let plen = 10;
let ccount = 1;

// set stren circle to grey
ind.style.backgroundColor = "#DAD9D9";
//set pass len
function handleslider( ){
  sliderinp.value = plen;
  passlen.innerText = plen;

  const min = sliderinp.min;
  const max = sliderinp.max;

  sliderinp.style.backgroundSize=((plen - min)*100/(max-min))+"% 100%";
}
handleslider();

function getrandomint( min , max){
    return Math.floor( Math.random()*(max-min))+min;
}


function shuffle(array){
 for(let i=array.length-1 ; i>0 ; i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>{str+=el});
    return str;
}
 
function getrannum(){
  return getrandomint(0,10);
}
function gelow()
{
    return String.fromCharCode (getrandomint(97,123));
}
function geup()
{
    return String.fromCharCode (getrandomint(65,91));
}
function gesymb()
{
    let s = "!@#$%^&*()_-+=''{[}]:;<,>.?/~`";
    return s.charAt(getrandomint(0,s.length));
}
console.log(ind);
function strength(){
let  c=0;
    if(upper.checked){c++;}
    if(lower.checked){c++;}
    if(num.checked){c++;}
    if(symb.checked){c++;}

    if(c==4 ||(c==3 && plen>=10)){ind.style.backgroundColor = "#48FF00"; ind.style.color = "#48FF00";}
    else if(c==3 || (c==2 && plen>=8) ){ind.style.backgroundColor = "#B5D415";ind.style.color = "#B5D415";}
    else if(c==2){ind.style.backgroundColor = "#FFC300";ind.style.color = "#FFC300";}
    else{
        ind.style.backgroundColor = "#FB0707";ind.style.color = "#FB0707";
    }

}

function handlechange(){
     ccount =0;
    allchb.forEach((chb)=>{if(chb.checked){ccount++;} })
        if(plen<ccount){plen=ccount; handleslider();}
}
upper.addEventListener('change',handlechange);
lower.addEventListener('change',handlechange);
num.addEventListener('change',handlechange);
symb.addEventListener('change',handlechange);
async function copyclip(){
    try{await navigator.clipboard.writeText(disp.value);
        cpmsg.innerText="copied";
    }
    catch(e){
        cpmsg.innerText="failed";
    }
    cpmsg.classList.add("active");
    setTimeout(()=>{cpmsg.classList.remove("active");},2000);
}


sliderinp.addEventListener('input',(e)=>{
    plen=sliderinp.value;
    if(plen<ccount){plen=ccount;}
    handleslider();
    
})
cpbut.addEventListener('click',()=>{
    if(disp.value){copyclip();}
});

genbut.addEventListener('click',()=>{
  
    if(ccount<=0) return;
    pass="";
    let farr = [];
    if(upper.checked){farr.push(geup)};
    if(lower.checked){farr.push(gelow)};
    if(num.checked){farr.push(getrannum)};
    if(symb.checked){farr.push(gesymb)};
    

    for(let i = 0 ; i<farr.length ; i++ )
        {
            pass+=farr[i]();
        }
  
        for(let x = 0 ; x<plen-farr.length ; x++)
            {   
                pass+= farr[getrandomint(0,farr.length)]();
              
            }
       
    pass = shuffle(Array.from(pass));
    disp.value=pass;
    strength();
});