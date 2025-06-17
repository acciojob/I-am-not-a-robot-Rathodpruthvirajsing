const imageGrid = document.getElementById('imageGrid');
const message = document.getElementById('message');

// Sample image URLs (you can use your own or free URLs)
const imageSources = [
  'https://via.placeholder.com/150/0000FF', // blue
  'https://via.placeholder.com/150/FF0000', // red
  'https://via.placeholder.com/150/00FF00', // green
];

// Randomly duplicate one image
let correctImage;
let images = [];

function generateImages() {
  // Pick one image to duplicate
  correctImage = imageSources[Math.floor(Math.random() * imageSources.length)];
  
  images = [
    correctImage,
    correctImage,
    ...imageSources.filter(src => src !== correctImage)
  ];

  // Shuffle array
  images = images.sort(() => Math.random() - 0.5);

  // Render
  imageGrid.innerHTML = '';
  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.dataset.index = index;
    img.onclick = () => toggleSelect(img);
    imageGrid.appendChild(img);
  });
}

function toggleSelect(img) {
  img.classList.toggle('selected');
}

function verifySelection() {
  const selected = document.querySelectorAll('.image-grid img.selected');
  const selectedSrcs = Array.from(selected).map(img => img.src);

  const isValid =
    selected.length === 2 &&
    selectedSrcs[0] === selectedSrcs[1] &&
    selectedSrcs[0].includes(correctImage);

  if (isValid) {
    message.textContent = '✅ Verification passed! You are human.';
    message.style.color = 'green';
  } else {
    message.textContent = '❌ Try again. Select the identical images.';
    message.style.color = 'red';
    generateImages(); // reload challenge
  }
}

// Initial setup
generateImages();
