import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryList = document.querySelector('.gallery');

const makeImageMarkup = ({ original, preview, description }) => {
    return `<div class="gallery__item">
  <a class="gallery__item" href="${original}">
  <img class="gallery__image lazyload" data-src="${preview}" title="${description}" alt="${description}" loading="lazy" />
</a>
</div>`
};

const makeImage = galleryItems.map(makeImageMarkup).join('');
galleryList.innerHTML = makeImage;

galleryList.addEventListener('click', onModalOpenClick);

function onModalOpenClick(e) {
    const imgTarget = e.target.classList.contains('gallery__image');
    if (!imgTarget) {
        return;
    }
    
    e.preventDefault();
};

const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250, captionClass: 'caption--bg' });

if ('loading' in HTMLImageElement.prototype) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(image => {
        image.src = image.dataset.src;
    });
} else {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
    script.integrity = "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    script.crossorigin = "anonymous";
    script.referrerpolicy = "no-referrer";
    document.body.appendChild(script);
}