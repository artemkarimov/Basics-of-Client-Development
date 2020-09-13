'use strict';

document.getElementById('button').addEventListener('click', () => {
  const input = document.getElementById('input');
  document.getElementsByTagName('p')[0].innerHTML = input.value;
});
