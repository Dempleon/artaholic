export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// helper to promisify indexedDB
export function idbPromise(storeName, action, obj) {

  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('artaholic', 1);
    let db, tx, store;

    request.onupgradeneeded = function () {
      const database = request.result;
      database.createObjectStore('art', { keyPath: '_id' });
      database.createObjectStore('categories', { keyPath: '_id' });
      database.createObjectStore('cart', { keyPath: '_id' });
    };

    request.onerror = function (err) {
      console.log('An error was encountered inside idbPromise() inside client helpers');
      console.log(err)
    }

    request.onsuccess = function() {
      db = request.result;
      tx = db.transaction(storeName, 'readwrite');
      store = tx.objectStore(storeName);

      db.onerror = function(err) {
        console.log(err)
      }

      tx.oncomplete = function() {
        db.close();
      }

      switch(action) {
        case 'put':
          store.put(obj);
          resolve(obj);
          break;

        case 'get':
          const allData = store.getAll();
          allData.onsuccess = function() {
            resolve(allData.result)
          }
          break;

        case 'delete':
          store.delete(obj._id);
          break;

        default:
          console.log('invalid action for idbPromise');
          break;
      };
    };
  });
}