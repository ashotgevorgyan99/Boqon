document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
    });

    let galleryGrid = document.querySelector('.gallery-grid');
    let startTouchY;
    let currentTransform = 0;

    galleryGrid.addEventListener('touchstart', function(event) {
        startTouchY = event.touches[0].clientY;
    });

    galleryGrid.addEventListener('touchmove', function(event) {
        let touchY = event.touches[0].clientY;
        let deltaY = touchY - startTouchY;

        if (Math.abs(deltaY) > 50) { // Adjust sensitivity as needed
            if (deltaY < 0 && currentTransform > -((galleryGrid.children.length - 2) * galleryGrid.children[0].offsetHeight)) {
                currentTransform -= galleryGrid.children[0].offsetHeight;
            } else if (deltaY > 0 && currentTransform < 0) {
                currentTransform += galleryGrid.children[0].offsetHeight;
            }
            galleryGrid.style.transform = `translateY(${currentTransform}px)`;
            startTouchY = touchY;
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const albums = document.querySelectorAll('.album');

    albums.forEach(album => {
        const leftArrow = album.querySelector('.left-arrow');
        const rightArrow = album.querySelector('.right-arrow');
        const imagesContainer = album.querySelector('.album-images');
        const images = imagesContainer.querySelectorAll('img');
        let currentImageIndex = 0;

        function updateImagePosition() {
            const offset = -currentImageIndex * imagesContainer.clientWidth;
            imagesContainer.style.transform = `translateX(${offset}px)`;
        }

        rightArrow.addEventListener('click', function() {
            if (currentImageIndex < images.length - 1) {
                currentImageIndex++;
                updateImagePosition();
            }
        });

        leftArrow.addEventListener('click', function() {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateImagePosition();
            }
        });

        // Add image enlargement on click
        images.forEach(img => {
            img.addEventListener('click', function() {
                const enlargedImg = document.createElement('img');
                enlargedImg.src = img.src;
                enlargedImg.classList.add('enlarged-image');
                document.body.appendChild(enlargedImg);

                enlargedImg.addEventListener('click', function() {
                    enlargedImg.remove();
                });
            });
        });
    });
});