document.addEventListener('DOMContentLoaded', function() {
    const image = document.getElementById('image');            
    const image_frame = document.getElementById('image-frame');
    const loading_txt = document.getElementById('loading-txt');
    
    image.style.display = 'none';
    loading_txt.textContent = 'Describe the picture you want below';
    image_frame.appendChild(loading_txt);
  

document.getElementById('generate-btn').addEventListener('click', function(e) {
    e.preventDefault();
    var description = document.getElementById('description').value;
    var generate_btn = document.getElementById('generate-btn');   
    if (!description) {
    alert('Please enter a description');
    return;
    }
    generate_btn.textContent = 'Generating...';
    image.style.display = 'none';
    image.src = '';
    loading_txt.style.display = 'block';
    loading_txt.textContent = 'Loading...';
    loading_txt.style.textAlign = 'center';
    generate_btn.classList.add('loading');

    fetch('https://quiet-poetry-1563.amanueltesfaye55.workers.dev/' + encodeURIComponent(description)).then(function(response) {
        if (!response.ok) {
            throw new Error('Failed to generate image');
        }
        loading_txt.textContent = 'Image generated successfully, please wait a moment while it loads';
        loading_txt.style.display = 'block';
        setTimeout(() => {
            console.log(response);
            image.style.display = 'block';
            image.src = URL.createObjectURL(response.blob());
            
            generate_btn.textContent = 'Generate';
            loading_txt.style.display = 'none';
            generate_btn.classList.remove('loading');
        }, 5000);
       
        
    }).catch(function(error) {
        console.error(error);
        alert(error)
        generate_btn.textContent = 'Generate';
        loading_txt.textContent = 'Failed to generate image';
    });
    
});
});