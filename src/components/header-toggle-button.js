import { LitElement, html } from '@polymer/lit-element';
import { SharedStyleSuAll } from './styles/shared-styles-su-all';
import { PropertiesMixin } from '@polymer/polymer/lib/mixins/properties-mixin.js';
// This element is *not* connected to the Redux store.
class HeaderToggleButton extends LitElement {


    render() {

        return html`
            ${SharedStyleSuAll}
            <label class="ui ${this.color} label" >
                <div class="ui toggle checkbox">
                    <input type="checkbox" @click="${this._onChange}" ?disabled="${this.disabled}">
                    <label>
                        <i class="inverted icon ${this.icon} "></i>
                    </label>
                </div>
                ${this.on ? this.on_name : this.off_name}
            </label>
            `;
    }

    _onChange() {
        this.on = !this.on;

        this.dispatchEvent(new CustomEvent('onChange', { detail: { checked: this.on } }));
    }

    static get properties() {
        return {
            on_name: { type: String },
            off_name: { type: String },
            color: { type: String },
            icon: { type: String },
            on: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true
            },
            disabled: { type: Boolean }
        }

    }
}

window.customElements.define('header-toggle-button', HeaderToggleButton);
