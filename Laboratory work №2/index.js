'use strict';

const getDate = () => new Date().toLocaleDateString('ukr') + ' ' + new Date().toLocaleTimeString('ukr');

class Note {
  constructor() {
    this.name = 'New' + ' ' + getDate();
    this.text = '';
    this.id = Date.now();
    this.selected = false;
  }
  getName() {
    return this.name;
  }
  getText() {
    return this.text;
  }
  getId() {
    return this.id;
  }
  setText(text) {
    if (!text) {
      this.name = 'New';
      this.text = text;
    }
    else {
      this.name = text.slice(0, 30);
      this.text = text;
    }
  }
  getSelected() {
    return this.selected;
  }
  setSelected(selected) {
    this.selected = selected;
  }
  changeText(text) {
    this.text = text;
  }
}

const add_button = document.getElementById('add_button');

const listOfNotes = document.getElementById('listOfNotes');

const rm_button = document.getElementById('rm_button');

const allNotes = [];

const nameOfNote = (note, text) => {
  if (text.substr(0, 15).includes('\n')) {
    const i = text.substr(0, 15).indexOf('\n');
    document.getElementById(note.id).innerText = text.substr(0, i) + ' ' + getDate();
  }
  else document.getElementById(note.id).innerText = text.substr(0, 15) + ' ' + getDate();
  return document.getElementById(note.id).innerText;
};

let previous;
let textOfPrevious = '';

const addClick = LI => {
  LI.addEventListener('click', () => {
    allNotes.forEach(note => {
      if (note.id == LI.id) note.setSelected(true);
      else note.setSelected(false);
    });
    LI.style.backgroundColor = "red";
    const textOfCurrent = document.getElementById('textg').innerHTML;
    if (textOfPrevious !== textOfCurrent) {
      const notes = JSON.parse(localStorage.notes);
      for (const value of notes) {
        if (value.id == previous.id) {
          const index = notes.indexOf(value);
          notes.splice(index, 1);
          value.text = textOfCurrent;
          value.name = nameOfNote(value, textOfCurrent);
          notes.push(value);
          localStorage.removeItem('notes');
          localStorage.setItem('notes', JSON.stringify(notes));
          allNotes.forEach(note => {
            if (note.id == value.id) {
              const text = textOfCurrent;
              note.changeText(text);
              note.name = nameOfNote(note, text);
            }
          });
          listOfNotes.insertBefore(previous, listOfNotes.firstChild);
        }
      }
    }
    const notes = JSON.parse(localStorage.notes);
    for (const value of notes) {
      if (value.id == LI.id) {
        document.getElementById('text').value = value.text;
        textOfPrevious = textOfCurrent;
      }
    }
    for (const el of JSON.parse(localStorage.notes)) {
      if (el.id != LI.id) {
        document.getElementById(el.id).style.backgroundColor = "gray";
      }
    }
    previous = LI;
  })
};

add_button.addEventListener('click', () => {
  document.getElementById('text').value = '';

  const note = new Note();
  allNotes.push(note);
  localStorage.setItem('notes', JSON.stringify(allNotes));
  const noteLi = document.createElement('li');
  noteLi.appendChild(document.createTextNode(note.getName()));
  noteLi.setAttribute('id', note.getId());
  listOfNotes.insertBefore(noteLi, listOfNotes.firstChild);
  const LI = document.getElementById(allNotes[allNotes.length - 1].getId());
  previous = LI;
  LI.style.backgroundColor = "red";
  note.setSelected(true);
  allNotes.forEach(value => {
    if (value.id != note.id) value.setSelected(false);
  })
  for (const el of JSON.parse(localStorage.notes)) {
    if (el.id != LI.id) {
      document.getElementById(el.id).style.backgroundColor = "gray";
    }
  }
  addClick(LI);
});

const saveNotes = () => {
  const listOfNotes = document.getElementById('listOfNotes');
  const notes = JSON.parse(localStorage.getItem('notes')).reverse();
  for (const note of notes) {
    const noteLi = document.createElement('li')
    noteLi.appendChild(document.createTextNode(note.name));
    noteLi.setAttribute('id', note.id);
    listOfNotes.appendChild(noteLi);
    Object.setPrototypeOf(note, Note.prototype);
    allNotes.push(note);
  }
  for (const note of allNotes) {
    const LI = document.getElementById(note.id);
    addClick(LI);
  }
};

rm_button.addEventListener('click', () => {
  for (const note of allNotes) {
    if (note.getSelected()) {
      const index = allNotes.indexOf(note);
      allNotes.splice(index, 1);
      for (let i = 0; i < listOfNotes.childElementCount; i++) {
        const li = listOfNotes.childNodes[i];
        if (li.id == note.id) listOfNotes.removeChild(li);
      }
      const notes = JSON.parse(localStorage.notes);
      for (const value of notes) {
        if (value.id == note.id) {
          const index = notes.indexOf(value);
          notes.splice(index, 1);
          localStorage.removeItem('notes');
          localStorage.setItem('notes', JSON.stringify(notes));
          document.getElementById('text').value = '';
        }
      }
    }
  }
});

function myFunction() {
  document.getElementById('textg').innerHTML = document.getElementById('text').value;
};

window.onload = () => {
  if (localStorage.getItem('notes')) {
    saveNotes();
  }
};
