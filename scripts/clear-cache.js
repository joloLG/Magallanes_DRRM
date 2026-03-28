// Clear Service Worker Cache Script
// Run this in browser console to clear cached heatmap data

console.log('🧹 Clearing Service Worker Cache...');

// Clear all caches
if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
            if (cacheName.startsWith('mdrrmo-')) {
                console.log('Deleting cache:', cacheName);
                caches.delete(cacheName);
            }
        });
    }).then(function() {
        console.log('✅ All MDRRMO caches cleared!');
        console.log('🔄 Please refresh the page to see updated heatmap data.');
    });
}

// Also clear any IndexedDB data
if ('indexedDB' in window) {
    const deleteDB = (dbName) => {
        return new Promise((resolve, reject) => {
            const deleteReq = indexedDB.deleteDatabase(dbName);
            deleteReq.onsuccess = () => {
                console.log('✅ Deleted IndexedDB:', dbName);
                resolve();
            };
            deleteReq.onerror = () => {
                console.log('❌ Failed to delete IndexedDB:', dbName);
                reject();
            };
        });
    };

    // Delete the service worker database
    deleteDB('mdrrmo-sw').then(() => {
        console.log('✅ Service worker IndexedDB cleared');
    });
}

// Clear localStorage
if ('localStorage' in window) {
    // Remove any heatmap-related localStorage items
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes('heatmap') || key.includes('incident') || key.includes('cache'))) {
            keysToRemove.push(key);
        }
    }
    
    keysToRemove.forEach(key => {
        console.log('Removing localStorage key:', key);
        localStorage.removeItem(key);
    });
    
    if (keysToRemove.length > 0) {
        console.log('✅ Cleared', keysToRemove.length, 'localStorage items');
    }
}

// Unregister service worker to force refresh
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        registrations.forEach(function(registration) {
            console.log('Unregistering service worker:', registration.scope);
            registration.unregister();
        });
    }).then(function() {
        console.log('✅ Service workers unregistered');
        console.log('🔄 Please refresh the page to see updated heatmap.');
    });
}

console.log('🎯 Cache clearing complete! Refresh the page.');
