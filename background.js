chrome.runtime.onInstalled.addListener(() => {
    console.log('Service worker registered');
    chrome.alarms.create("workReminderAlarm", { periodInMinutes: 10 }); // Adjust period as needed
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "workReminderAlarm") {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Reminder',
            message: 'Time to get back to work!',
            priority: 1
        });

        // Play a notification sound
        const audio = new Audio('notification_sound.mp3');
        audio.play();
    }
});
