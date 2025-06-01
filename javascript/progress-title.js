onUiLoaded(() => {
    const title = document.title;
    let startTime = 0

    const hidden = () => {
        document.title = title
        startTime = 0
    }

    const progressBar = document.querySelector("#progress-bar");
    const observe = new MutationObserver((record) => {
        if (progressBar.classList.contains('hidden')) {
            return hidden()
        }

        if (!startTime) {
            startTime = Date.now()
        }

        const progressEl = progressBar.querySelector("progress");
        const currentProgress = progressEl.value;
        const progressText = document.querySelector(
            ".loader-container span"
        ).textContent;

        const match = progressText.match(/image (\d+)\/(\d+)/);

        if (match) {
            const [_, current, total] = match;
            const time = ((Date.now() - startTime) / 1000).toFixed(2)
            document.title = ` ${currentProgress}% ${time}s | Sampling ${current} / ${total}`;
        }
    });

    observe.observe(progressBar, {
        subtree: true,
        childList: true,
        attributes: true,
    });
});
