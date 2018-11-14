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
import './flow-item.js';

class Graph extends connect(store)(LitElement) {


  constructor() {
    super();

  }

  /*
   updated(_changedProperties){
    console.log(_changedProperties);
  }*/

  firstUpdated() {

    const graph = new joint.dia.Graph;
    this.graph = graph;

    const paper = new joint.dia.Paper({
      el: this.shadowRoot.getElementById('myholder'),
      model: graph,
      width: 1000,
      height: 500,
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

    paper.on('cell:pointerdown',
      (cellView, evt, x, y) => {
        //console.log('cell view ' + cellView.model.id + ' was clicked');

        // var t1 = this.graph.getElements().find(e => e.id === cellView.model.id);
        //   var t1 = this.graph.getCell(cellView.model.id);
        // t1.attr('body/fill', 'red');
      }
    );

    paper.drawGrid();

    store.dispatch(getAllFlowItems());
  }



  render() {

    return html`
      ${ButtonSharedStyles}
      <style>
        :host { display: block; }
      </style>
      <div id="myholder"></div>
    `;
  }

  /*
    <dom-if if="${this.graph}">
            <flow-item graph="${this.graph}" color="green" name="Test"></flow-item>
        </dom-if>*/

  static get properties() {
    return {
      flowItems: { type: Object },
      graph: { type: Object }
    }
  }


  _addButtonClicked(e) {
    store.dispatch(addToCart(e.currentTarget.dataset['index']));
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    //  console.log("state", state.flowReducer.flowItems);
    //  console.log("graph", this.graph);
    this.flowItems = state.flowReducer.flowItems;

    if (!this.graph ||
      !this.flowItems.nodes ||
      !this.flowItems.connections)
      return;


    state.flowReducer.flowItems.nodes.forEach((elem) => {
      const rect = this.createNode(elem);
      rect.addTo(this.graph);
    });

    const elems = this.graph.getElements();

    state.flowReducer.flowItems.connections.forEach((con) => {
      const link = this.createLink(con, elems);
      link.addTo(this.graph);
    });
  }


  createNode(elem) {
    const shape = elem.type == 'event' ?
      new joint.shapes.standard.Ellipse() :
      new joint.shapes.standard.Rectangle()

    shape.position(+elem.posX, +elem.posY);
    shape.resize(100, 40);
    shape.attr({
      body: {
        fill: 'blue'
      },
      label: {
        text: elem.title,
        fill: 'white'
      }
    });

    return shape;
  }


  createLink(con, elems) {
    const link = new joint.shapes.standard.Link()
    const rect1 = elems.find(e => e.attributes.attrs.label.text == con.source);
    const rect2 = elems.find(e => e.attributes.attrs.label.text == con.destination);

    link.source(rect1);
    link.target(rect2);

    return link;
  }

}



window.customElements.define('flow-graph', Graph);
