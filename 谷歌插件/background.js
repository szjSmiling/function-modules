
chrome.runtime.onInstalled.addListener(() => {
  // 存储变量
  chrome.storage.sync.set({ color: '#3aa757', name: 'Jelly', description: '学习使用google插件' })
  // 获取所有存储的变量
  chrome.storage.sync.get(null, function(storage) {
    console.log('default background color set to %cgreen', `color: ${storage.color}`)
  })
  // 监听 storage 里面数据变化，实时同步 sync
  chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(`Storage key "${key}" in namespace "${namespace}" changed. Old value was "${oldValue}", new value is "${newValue}".`)
    }
    if (namespace === 'sync' && changes.options?.newValue) {
      const debugMode = Boolean(changes.options.newValue.debug);
      console.log('enable debug mode?', debugMode);
    }
  })
  const storageCache = {}

  function getAllStorageSyncData() {
    return new Promise((resolve, reject) => {
      // Asynchronously fetch all data from storage.sync.
      chrome.storage.sync.get(null, (items) => {
        // Pass any observed errors down the promise chain.
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        resolve(items)
      })
    })
  }

  // The action.onClicked event will not be dispatched
  // if the extension action has specified a popup to show on click on the current tab.
  chrome.action.onClicked.addListener((tab) => {
    console.log('Tab: ', tab)
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['js/content-script.js']
    })
    try {
      getAllStorageSyncData().then(items => {
        console.log('storage: ', items)
        Object.assign(storageCache, items)
      })
    } catch (e) {}
  })

})
