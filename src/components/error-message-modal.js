import { LitElement, html } from '@polymer/lit-element';
import { SharedStyleSuAll } from './styles/shared-styles-su-all';
import { PropertiesMixin } from '@polymer/polymer/lib/mixins/properties-mixin.js';
import '@polymer/paper-dialog/paper-dialog.js';

class ErrorMessageModal extends LitElement {


    firstUpdated() {

    }

    render() {

        return html`
        ${SharedStyleSuAll}
        
        
        <paper-dialog style="border-radius: 5px !important" @click="${this.onclick}" ?opened="${this.opened}"
            ?modal="${true}">
            <div class="ui inverted placeholder segment">
                <div class="ui icon header">
                    <i class="${this.icon} icon"></i>
                    Error ocurred in action:
                    <p>${this.data ? this.data.name : ""}</p>
                    <p>Splunk Trace Id:</p>
                </div>
                <div class="inline">
                    <div class="ui action inverted input">
                        <input readonly id="textarea" type="text" value='${this.data ? this.data.exception : ""}'>
                        <div class="ui inverted ${this.color} vertical animated button" tabindex="0" @click="${() => { this.copyStringToClipboard(); }}">
                            <div class="hidden content">Copy</div>
                            <div class="visible content">
                                <i class="copy icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </paper-dialog>
    `;
    }

    onclick(){
        this.dispatchEvent(new CustomEvent('onModalClick'));
    }

    copyStringToClipboard() {

        var el = this.shadowRoot.getElementById('textarea');
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
    }


    static get properties() {
        return {
            color: { type: String },
            icon: { type: String },
            opened: { type: Boolean },
            data: { type: Object }
        }
    }



}

window.customElements.define('error-message-modal', ErrorMessageModal);
