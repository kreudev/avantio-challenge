import { createRoot } from 'react-dom/client';
import AccommodationForm from '../components/AccommodationForm';
import { injectStyles } from './styles';

export class AccommodationFormWebComponent extends HTMLElement {
  private root: HTMLDivElement;
  public shadowRoot: ShadowRoot;
  private reactRoot: ReturnType<typeof createRoot>;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    this.root = document.createElement('div');
    this.shadowRoot.appendChild(this.root);
    this.reactRoot = createRoot(this.root);
  }

  connectedCallback() {
    injectStyles(this.shadowRoot);
    
    window.addEventListener('formSubmit', this.handleFormSubmit);
    
    this.reactRoot.render(
      <AccommodationForm />
    );
  }

  disconnectedCallback() {
    window.removeEventListener('formSubmit', this.handleFormSubmit);
    this.reactRoot.unmount();
  }

  private handleFormSubmit = (event: Event) => {
    const customEvent = event as CustomEvent;
    const detail = customEvent.detail;
    
    this.dispatchEvent(new CustomEvent('submit', {
      detail: detail,
      bubbles: true,
      composed: true
    }));
  };
}

// Register the web component
customElements.define('accommodation-form', AccommodationFormWebComponent);

// Export for usage in other projects
export default AccommodationFormWebComponent; 