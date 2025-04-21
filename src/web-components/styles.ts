import styles from '../index.css?inline';

export const injectStyles = (shadowRoot: ShadowRoot) => {
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    shadowRoot.adoptedStyleSheets = [styleSheet];
}; 