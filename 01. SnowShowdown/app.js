window.addEventListener("load", solve);

function solve() {
    const snowmanNameInput = document.getElementById('snowman-name');
    const snowmanHeightInput = document.getElementById('snowman-height');
    const locationInput = document.getElementById('location');
    const creatorNameInput = document.getElementById('creator-name');
    const specialAttributeSelect = document.getElementById('special-attribute');
    const addBtn = document.querySelector('.add-btn');
    const snowmanPreviewUl = document.querySelector('.snowman-preview');
    const snowListUl = document.querySelector('.snow-list');
    const mainElement = document.getElementById('hero');
    const backImg = document.getElementById('back-img');

    function createSnowmanArticle(name, height, location, creator, attribute) {
        const article = document.createElement('article');
        article.innerHTML = `
      <p>Name: ${name}</p>
      <p>Height: ${height}</p>
      <p>Location: ${location}</p>
      <p>Creator: ${creator}</p>
      <p>Attribute: ${attribute}</p>
    `;
        return article;
    }

    function clearInputs() {
        snowmanNameInput.value = '';
        snowmanHeightInput.value = '';
        locationInput.value = '';
        creatorNameInput.value = '';
        specialAttributeSelect.selectedIndex = 0;
    }

    addBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission

        if (!snowmanNameInput.value || !snowmanHeightInput.value || !locationInput.value || !creatorNameInput.value || !specialAttributeSelect.value) {
            return;
        }

        const li = document.createElement('li');
        li.className = 'snowman-info';
        const article = createSnowmanArticle(
            snowmanNameInput.value,
            snowmanHeightInput.value + 'cm',
            locationInput.value,
            creatorNameInput.value,
            specialAttributeSelect.options[specialAttributeSelect.selectedIndex].text
        );

        const btnContainer = document.createElement('div');
        btnContainer.className = 'btn-container';
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'Next';

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(nextBtn);

        li.appendChild(article);
        li.appendChild(btnContainer);
        snowmanPreviewUl.appendChild(li);

        clearInputs();
        addBtn.disabled = true;

        editBtn.addEventListener('click', () => {
            const pElements = li.querySelectorAll('p');
            snowmanNameInput.value = pElements[0].textContent;
            snowmanHeightInput.value = pElements[1].textContent.replace('Height: ', '').replace('cm', '');
            locationInput.value = pElements[2].textContent.replace('Location: ', '');
            creatorNameInput.value = pElements[3].textContent.replace('Creator: ', '');
            specialAttributeSelect.value = pElements[4].textContent.replace('Attribute: ', '');

            li.remove();
            addBtn.disabled = false;
        });

        nextBtn.addEventListener('click', () => {
            snowListUl.appendChild(li);
            btnContainer.remove();

            const sendBtn = document.createElement('button');
            sendBtn.className = 'send-btn';
            sendBtn.textContent = 'Send';
            li.appendChild(sendBtn);

            sendBtn.addEventListener('click', () => {
                mainElement.remove();
                backImg.hidden = false;

                const backBtn = document.createElement('button');
                backBtn.className = 'back-btn';
                backBtn.textContent = 'Back';
                document.body.appendChild(backBtn);

                backBtn.addEventListener('click', () => {
                    location.reload();
                });
            });
        });
    });
}

