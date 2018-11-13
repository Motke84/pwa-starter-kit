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

class Graph extends connect(store)(LitElement) {


  constructor() {
    super();
    //update


  }

  firstUpdated() {
    store.dispatch(getAllFlowItems());

    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
      el: this.shadowRoot.getElementById('myholder'),
      model: graph,
      width: 1000,
      height: 1000,
      gridSize: 50,
      drawGrid: true
    });

    //paper.drawGrid({ name: 'mesh', args: { color: 'black', thickness: 1  }});

    paper.setGrid(
      {
        name: 'mesh',
        args:
          {
            color: 'black',
            thickness: 10
          }
      }
    );

    paper.drawGrid();

    var rect = new joint.shapes.standard.Rectangle();
    rect.position(100, 30);
    rect.resize(100, 40);
    rect.attr({
      body: {
        fill: 'blue'
      },
      label: {
        text: 'Hello',
        fill: 'white'
      }
    });
    rect.addTo(graph);

    var rect2 = rect.clone();
    rect2.translate(300, 0);
    rect2.attr('label/text', 'World!');
    rect2.addTo(graph);

    var link = new joint.shapes.standard.Link();
    link.source(rect);
    link.target(rect2);
    link.addTo(graph);
  }

  render() {

    console.log("render",this._flowItems);
    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      <div id="myholder"></div>

    `;
  }

  static get properties() {
    return {
      _flowItems: { type: Object }
    }
  }


  _addButtonClicked(e) {
    store.dispatch(addToCart(e.currentTarget.dataset['index']));
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    console.log("state",state.flowReducer.flowItems);
    this._flowItems = state.flowReducer.flowItems;
  }
}

window.customElements.define('flow-graph', Graph);
