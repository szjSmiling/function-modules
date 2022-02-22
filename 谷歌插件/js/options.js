
const page = document.getElementById('divBtn')
let selectedClassName = 'current'
const presetBtnColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']
function handleBtnClick (event) {
  let current = event.target.parentElement.querySelector(`.${selectedClassName}`)
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName)
  }

  const color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}

function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor
      button.style.backgroundColor = buttonColor
      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      button.addEventListener("click", handleBtnClick);
      page.appendChild(button);
    }
  })
}

constructOptions(presetBtnColors)

const options = {}
const optionsForm = document.getElementById('optionsForm')

chrome.storage.sync.get('options', data => {
  // Initialize the form with the user's option settings
  Object.assign(options, data.options)
  optionsForm.debug.checked = Boolean(options.debug)
})

optionsForm.debug.addEventListener('change', event => {
  // Immediately persist options changes
  options.debug = event.target.checked
  chrome.storage.sync.set({ options })
})

