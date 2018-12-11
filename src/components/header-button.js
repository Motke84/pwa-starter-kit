import { LitElement, html } from '@polymer/lit-element';
import { SharedStyleSuAll } from './styles/shared-styles-su-all';
import { PropertiesMixin } from '@polymer/polymer/lib/mixins/properties-mixin.js';
// This element is *not* connected to the Redux store.
class HeaderButton extends LitElement {


    render() {


        return html`
    ${SharedStyleSuAll}
    <button class="ui labeled icon button ${this.color}" @click="${this._onClick}" ?disabled="${this.disabled}">
        <i class="${this.activateIconLoader(this.loading, this.icon + " icon")}"></i>${this.name}
    </button>
    `;
    }


    _onClick() {
        this.dispatchEvent(new CustomEvent('onClick'));
    }

    activateIconLoader(isLoading, originalStyle) {

        console.log(originalStyle);

        if (isLoading)
            return 'inverted notched circle loading icon';
        else
            return originalStyle;
    }

    static get properties() {
        return {
            name: { type: String },
            color: { type: String },
            icon: { type: String },
            disabled: { type: Boolean },
            loading: { type: Boolean }
        }
    }



}

window.customElements.define('header-button', HeaderButton);
