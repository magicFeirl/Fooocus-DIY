onUiLoaded(() => {
    const title = document.title;

    const progressBar = document.querySelector("#progress-bar");
    const observe = new MutationObserver((record) => {
        if (progressBar.classList.contains('hidden')) {
            document.title = title
            return
        }
        
        const progressEl = progressBar.querySelector("progress");
        const currentProgress = progressEl.value;
        const progressText = document.querySelector(
            ".loader-container span"
        ).textContent;
        const match = progressText.match(/image (\d+)\/(\d+)/);

        if (match) {
            const [_, current, total] = match;
            document.title = ` ${currentProgress}% | sampling ${current} / ${total}`;
        }
    });

    observe.observe(progressBar, {
        subtree: true,
        childList: true,
        attributes: true,
    });
});
