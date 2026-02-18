import { cn } from "@/lib/utils";

export function getAriaExpanded(isOpen: boolean): string {
  return isOpen ? "true" : "false";
}

export function getAriaHasPopup(hasSubmenu: boolean): "true" | undefined {
  return hasSubmenu ? "true" : undefined;
}

export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  options: {
    onEnter?: () => void;
    onEscape?: () => void;
    onArrowUp?: () => void;
    onArrowDown?: () => void;
    onArrowLeft?: () => void;
    onArrowRight?: () => void;
  }
) {
  switch (event.key) {
    case "Enter":
    case " ":
      event.preventDefault();
      options.onEnter?.();
      break;
    case "Escape":
      event.preventDefault();
      options.onEscape?.();
      break;
    case "ArrowUp":
      event.preventDefault();
      options.onArrowUp?.();
      break;
    case "ArrowDown":
      event.preventDefault();
      options.onArrowDown?.();
      break;
    case "ArrowLeft":
      event.preventDefault();
      options.onArrowLeft?.();
      break;
    case "ArrowRight":
      event.preventDefault();
      options.onArrowRight?.();
      break;
  }
}

export function preventBodyScroll(prevent: boolean) {
  if (prevent) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

export function focusFirstFocusableElement(container: HTMLElement) {
  const focusableElements = container.querySelectorAll(
    'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  firstElement?.focus();
}

export function getNavLinkClass(isActive: boolean, isScrolled: boolean): string {
  return cn(
    "relative text-sm font-medium tracking-wide transition-colors duration-200",
    isActive
      ? "text-primary"
      : isScrolled
        ? "text-text-secondary hover:text-primary"
        : "text-text-secondary hover:text-primary"
  );
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
