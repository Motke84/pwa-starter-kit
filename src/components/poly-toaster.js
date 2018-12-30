import { LitElement, html } from '@polymer/lit-element';
import { SharedStyleSuAll } from './styles/shared-styles-su-all';
import { PropertiesMixin } from '@polymer/polymer/lib/mixins/properties-mixin.js';
import '@polymer/paper-toast/paper-toast.js';
// This element is *not* connected to the Redux store.
class PolyToaster extends LitElement {


    render() {

        return html`
             <style>
                @import '../../../public/Semantic-UI-CSS-master/semantic.min.css';
                @import '../../../public/joint.min.css';

                .toast{
                --paper-toast-color: white;
                position:fixed;
                right: 0;
                left:unset!important;
                border-radius: 3px;
                }

                .error {
                    --paper-toast-background-color: #bd362f;
                }

                .success {
                    --paper-toast-background-color: #51a351;
                }

            </style>
            <paper-toast duration="0" class="${this.getMessageStyle()}" ?opened="${this.opened}"  >
                <i class="${this.getIcon()}"></i>
                ${this.message}
            </paper-toast>
            `;
    }

    getIcon(){
       return `${this.isError ? 'x icon': 'check'} icon large`;
    }

    getMessageStyle(){
        return `toast ${this.isError ? 'error': 'success'}`;
     }

    static get properties() {
        return {
            message: { type: String },
            color: { type: String },
            icon: { type: String },
            opened: {type: Boolean},
            isError: {type: Boolean}          
        }

    }
}

window.customElements.define('poly-toaster', PolyToaster);
