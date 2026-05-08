export function getById(id) {
    return document.getElementById(id);
}

export function smoothScrollToSection(sectionId, headerOffsetPx) {
    const element = getById(sectionId);
    if (!element) {
        return;
    }

    const elementPosition = element.getBoundingClientRect().top;
    const scrollTarget = elementPosition + window.pageYOffset - headerOffsetPx;

    window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
    });
}
