export function scrollToElement(elem: HTMLElement | null) {
  elem && elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
