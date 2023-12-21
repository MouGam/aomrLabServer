var changedY = 100;

//상단바 색 변화 구현, 맨 위로 
window.addEventListener('scroll',()=>{
    let changed_color_navbar = document.querySelector('.upperbox');

    let cssText = null;
    let changing_text_color = null;
    let each_rgb = 255 * ( 1 - window.scrollY/changedY )* ( 1 - window.scrollY/changedY )* ( 1 - window.scrollY/changedY );
  if(window.scrollY < changedY){
      changing_text_color = "color:rgb("+each_rgb+","+each_rgb+","+each_rgb+");"
      cssText = "background-color:rgba(255,255,255," + (window.scrollY/changedY)*(window.scrollY/changedY) + ");" + changing_text_color;
      changed_color_navbar.style.cssText = cssText;
  }else{
    changed_color_navbar.style.cssText = "background-color:rgba(255,255,255,1);color:black";
    }

    let up = document.querySelector('.up');
    if(window.scrollY > (window.screenY)*50/100){
        up.style.cssText = "color:rgba(0,0,0,1);";
    }else{
        up.style.cssText = "color:rgba(0,0,0,0);";
    }
});

//상단바 링크 색 변화, 링크 연결

//eventListener 이용
var menuitems = document.querySelectorAll('.menuitem');

for(var i=0;i<menuitems.length;i++){
    let item = menuitems[i];
    item.addEventListener('mouseover',()=>{
        item.style.cssText = "color:gray";
    });
    item.addEventListener('mouseout',()=>{
        let each_rgb = 255 * ( 1 - window.scrollY/changedY )* ( 1 - window.scrollY/changedY )* ( 1 - window.scrollY/changedY );
        let changing_text_color = "color:rgb("+each_rgb+","+each_rgb+","+each_rgb+");";
        item.style.cssText = "color:"+changing_text_color;
    });

    // item.onclick=`location.href='./${item.innerHTML}.html'`;
    // item.href=`./${item.innerHTML}.html`;
    item.addEventListener('click',()=>{
        location.href=`./${item.innerHTML}`;
    });
}


//로고 클릭하면 다시 페이지
var logo = document.querySelector('.logo');
logo.addEventListener('click',()=>{
    location.href='./index.html';
})

//이메일에 마우스 올리면 색 변화
var emails = document.querySelectorAll('.e-mail');

for(var i=0;i<emails.length;i++){
    let item = emails[i];
    item.addEventListener('mouseover',()=>{
        item.style.cssText = "color:gray";
    });
    item.addEventListener('mouseout',()=>{
        item.style.cssText = "color:black";
    });
}