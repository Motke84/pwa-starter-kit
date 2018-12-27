import { LitElement, html } from '@polymer/lit-element';
import { SharedStyleSuAll } from './styles/shared-styles-su-all';
import { PropertiesMixin } from '@polymer/polymer/lib/mixins/properties-mixin.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker-light';

class DatePicker extends LitElement {


    firstUpdated() {

        // let today = new Date().toISOString().slice(0, 10)
        let today = "2018-02-14";

        this.date = today;
    }

    render() {

        return html`
        ${SharedStyleSuAll}
        <vaadin-date-picker-light  @click="${this._onClick}" id="dater" @value-changed="${this._onDateChange}"
            ?disabled="${this.disabled}">
            <div class="ui labeled small input ${this.color}">
                <div class="ui label ${this.color}">
                    <i class="${this.color} icon"></i>
                    ${this.name}
                </div>
                <input ?readonly="${this.readonly}" type="text" placeholder="Date" value="${this.date ? this.date.toString() : ""}">
            </div>
        </vaadin-date-picker-light>
    `;
    }


    _onClick(event) {
        console.log("click");
    }

    activateIconLoader(isLoading, originalStyle) {
        if (isLoading)
            return 'inverted notched circle loading icon';
        else
            return originalStyle;
    }

    _onDateChange(e) {
        this.date = e.detail.value;
        this.dispatchEvent(new CustomEvent('onDateChanged', { detail: { date: this.date } }));
    }

    static get properties() {
        return {
            name: { type: String },
            color: { type: String },
            icon: { type: String },
            disabled: { type: Boolean },
            loading: { type: Boolean },
            readonly: { type: Boolean },
            date: { type: String }
        }
    }



}

window.customElements.define('date-picker', DatePicker);
