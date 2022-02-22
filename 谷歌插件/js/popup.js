const changeColor = document.getElementById('changeColor')

changeColor.addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor
  })
})
function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color
  })
}
/**无效
const clearColor = document.getElementById('clearColor')
clearColor.addEventListener('click', () => {
  document.body.style.backgroundColor = '#fff'
})
 */
const lunchBox = document.getElementById('lunchBox')
const lunchTime = document.getElementById('lunchTime')
lunchTime.innerText = new Date().toLocaleString()
