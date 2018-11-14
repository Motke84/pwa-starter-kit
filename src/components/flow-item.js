/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the elements needed by this element.

// These are the actions needed by this element.
import { getAllFlowItems } from '../actions/flowActions';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

class FlowItem extends connect(store)(LitElement) {


    constructor() {
        super();
        //update
        this.rect = new joint.shapes.standard.Rectangle();

    }
    // updated(_changedProperties: PropertyValues)
    update(_changedProperties) {

        console.log(_changedProperties);
                     
        if (_changedProperties.graph) {
            var graph = this.graph;

            console.log(graph);


            var rect = this.rect;
            rect.position(400, 30);
            rect.resize(100, 40);
            rect.attr({
                body: {
                    fill: this.color
                },
                label: {
                    text: this.name,
                    fill: 'white'
                }
            });

            rect.addTo(graph);
        }
        /*
              // rect.addTo(graph);
       */
    }

    render() {

        console.log(this.graph);

        return html`
            <h2>FlowItem ${this.graph} ${this.name} ${this.color}</h2>
    `;
    }

    static get properties() {
        return {
            color: { type: String },
            name: { type: String },
            graph: { type: Object }
        }
    }


    _addButtonClicked(e) {

    }

    // This is called every time something is updated in the store.
    stateChanged(state) {


    }
}

window.customElements.define('flow-item', FlowItem);
