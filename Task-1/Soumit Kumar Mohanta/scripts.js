(() => {
  const form = document.getElementById('memberForm');
  const cardsContainer = document.getElementById('cardsContainer');
  const STORAGE_KEY = 'idCardMembers';

  const DEFAULT_PHOTO = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  // Load members from localStorage
  function loadMembers() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      return parsed;
    } catch (error) {
      console.error('Failed to parse members from storage:', error);
      return [];
    }
  }

  // Save members array to localStorage
  function saveMembers(members) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }

  // Create ID card element with delete and download buttons
  function createIdCard({ name, email, designation, photoDataUrl }, index) {
    const card = document.createElement('article');
    card.className = 'id-card';
    card.tabIndex = 0;
    card.setAttribute('aria-label', `ID card of ${name}`);

    // Photo div
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo';
    photoDiv.style.backgroundImage = `url('${photoDataUrl || DEFAULT_PHOTO}')`;
    photoDiv.setAttribute('role', 'img');
    photoDiv.setAttribute('aria-label', `Photo of ${name}`);

    // Details container
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';

    const nameEl = document.createElement('h2');
    nameEl.className = 'name';
    nameEl.textContent = name;

    const desigEl = document.createElement('p');
    desigEl.className = 'designation';
    desigEl.textContent = designation;

    const idEl = document.createElement('p');
    idEl.className = 'id-number';
    idEl.textContent = `ID: ${email}`;

    detailsDiv.appendChild(nameEl);
    detailsDiv.appendChild(desigEl);
    detailsDiv.appendChild(idEl);

    // Buttons container
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.setAttribute('aria-label', `Delete ID card of ${name}`);
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteMember(index);
    });

    // Download button
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.type = 'button';
    downloadBtn.setAttribute('aria-label', `Download ID card of ${name}`);
    downloadBtn.textContent = 'Download';
    downloadBtn.addEventListener('click', () => {
      downloadCard(card, name);
    });

    buttonsDiv.appendChild(deleteBtn);
    buttonsDiv.appendChild(downloadBtn);

    card.appendChild(photoDiv);
    card.appendChild(detailsDiv);
    card.appendChild(buttonsDiv);

    return card;
  }
  // Render all members on page
  function renderMembers() {
    cardsContainer.innerHTML = '';
    const members = loadMembers();
    if (members.length === 0) {
      const emptyMsg = document.createElement('p');
      emptyMsg.style.textAlign = 'center';
      emptyMsg.style.color = '#fafafa';
      emptyMsg.style.fontStyle = 'italic';
      emptyMsg.textContent = 'No members added yet.';
      cardsContainer.appendChild(emptyMsg);
      return;
    }

    members.forEach((member, index) => {
      cardsContainer.appendChild(createIdCard(member, index));
    });
  }

  // Delete member and update UI and storage
  function deleteMember(index) {
    const members = loadMembers();
    if (index >= 0 && index < members.length) {
      members.splice(index, 1);
      saveMembers(members);
      renderMembers();
    }
  }

  // Convert image file to DataURL
  function readImageFile(file, onSuccess, onError) {
    if (!file.type.startsWith('image/')) {
      onError('Selected file is not an image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onSuccess(reader.result);
    };
    reader.onerror = () => {
      onError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  }
  // Move focus to the next input field on Enter key
  const formElements = Array.from(form.querySelectorAll('input, select, textarea'));
  formElements.forEach((element, index) => {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const nextElement = formElements[index + 1];
        if (nextElement) {
          nextElement.focus();
        } else {
          // If it's the last element, optionally submit the form or do nothing
          form.querySelector('button[type="submit"]').focus();
        }
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const designation = formData.get('designation').trim();
    const photoFile = formData.get('photoFile');

    if (name.length < 3) {
      alert('Please enter a valid name with at least 3 characters.');
      return;
    }
    if (!/@/.test(email)) {
      alert('Please enter a valid email id.');
      return;
    }
    if (designation.length < 2) {
      alert('Please enter a valid designation.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    if (photoFile && photoFile.size > 0) {
      readImageFile(
        photoFile,
        (dataUrl) => {
          saveNewMember({
            name,
            email,
            designation,
            photoDataUrl: dataUrl,
          });
          submitBtn.disabled = false;
          submitBtn.textContent = 'Generate ID Card';
        },
        (error) => {
          alert(error);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Generate ID Card';
        }
      );
    } else {
      saveNewMember({
        name,
        email,
        designation,
        photoDataUrl: null,
      });
      submitBtn.disabled = false;
      submitBtn.textContent = 'Generate ID Card';
    }
  });
  function saveNewMember(member) {
    const members = loadMembers();
    members.push(member);
    saveMembers(members);
    renderMembers();
    form.reset();
    form.querySelector('input[name="name"]').focus();
  }
  // Download the card as a JPG image using html2canvas
  function downloadCard(card, name) {
    const buttons = card.querySelector(".buttons");
    if (buttons) buttons.style.display = "none";

    html2canvas(card, { backgroundColor: null, scale: 2 })
      .then((canvas) => {
        if (buttons) buttons.style.display = "";

        canvas.toBlob((blob) => {
          if (!blob) {
            alert("Failed to create image for download.");
            return;
          }
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          const safeName = name.replace(/\s+/g, "_").replace(/[^\w_-]/g, "");
          a.download = `IDCard_${safeName}.jpg`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }, "image/jpg");
      })
      .catch((e) => {
        alert("Error generating image: " + e.message);
        if (buttons) buttons.style.display = "";
      });
  }

  // Initial render
  renderMembers();
})();
