const wrapper = document.querySelector('.wrapper');
        const popupBox = document.getElementById('popupBox');
        const titleInput = document.getElementById('title');
        const descInput = document.getElementById('description');
        let notes = JSON.parse(localStorage.getItem('notes')) || [];

        function openPopup() {
            popupBox.classList.add('show');
        }

        function closePopup() {
            popupBox.classList.remove('show');
        }

        function addNote(e) {
            e.preventDefault();
            const title = titleInput.value;
            const desc = descInput.value;
            if (title && desc) {
                const date = new Date();
                const note = {
                    title,
                    description: desc,
                    date: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                };
                notes.push(note);
                localStorage.setItem('notes', JSON.stringify(notes));
                renderNotes();
                closePopup();
                titleInput.value = '';
                descInput.value = '';
            }
        }
        function renderNotes() {
            wrapper.innerHTML = '<div class="add-box tooltip" onclick="openPopup()"><div class="icon"><i class="uil uil-plus"></i></div><p>Add Note</p><span class="tooltiptext">Click to add a new note</span></div>';
            notes.forEach((note, index) => {
                const noteEl = document.createElement('div');
                noteEl.className = 'note';
                noteEl.innerHTML = `
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                    <div class="bottom-content">
                        <div class="settings">
                             <span>${note.date}</span>
                            <i class="uil uil-edit"  onclick="editNote(${index})"></i>
                            <i class="uil uil-trash"  onclick="deleteNote(${index})"></i>
                        </div>
                    </div>`
                    ;
                wrapper.appendChild(noteEl);
            });
        }

        function deleteNote(index) {
            if (confirm('Are you sure you want to delete this note?')) {
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
                renderNotes();
            }
        }

        function editNote(index) {
            const note = notes[index];
            titleInput.value = note.title;
            descInput.value = note.description;
            notes.splice(index, 1);
            openPopup();
        }

        renderNotes();