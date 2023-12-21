
var galleryContainer = document.querySelector('.gallery-container');

var imageList = 13;

for(var i=1;i<=imageList;i++){
    galleryContainer.innerHTML += `

        <div class="divider out"><div class="divider in"></div></div>
        <div class='gallery-image-container'>
            <img src = './image/gallery/${i}.jpeg' class='gallery-image'>
        </div>
    `;
}