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
import { getAllFlowItems ,saveFlowItems  } from '../actions/flowActions';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles } from './button-shared-styles.js';

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
      width: 5500,
      height: 5500,
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

      //  var shape = this.graph.getCell(cellView.model.id);
       // shape.attr('body/fill', 'red');
      }
    );

    store.dispatch(getAllFlowItems());
  }



  render() {

    return html`
      <style>
        :host { display: block; }
      </style>
       <button @click="${this._onRefresh}" title="Refresh">Refresh</button>
       <button @click="${this._onSave}" title="Save">Save</button>
       <div id="myholder"></div>
    `;
  }

  static get properties() {
    return {
      flowItems: { type: Object },
      graph: { type: Object }
    }
  }


  _onRefresh() {
    this.graph.clear();
    store.dispatch(getAllFlowItems());
  }

  _onSave() {

    var elem = this.graph.getElements().map((e) => { return {
      title: e.attributes.attrs.label.text,
      type: e.attributes.type == 'standard.Rectangle' ? 'action' :'event' ,
      posX: e.attributes.position.x,
      posY: e.attributes.position.y
    };
    });


    console.log(elem);

    var lnks = this.graph.getLinks().map((e) => { return {
      source:  this.graph.getCell(e.attributes.source.id).attributes.attrs.label.text,
      destination:  this.graph.getCell(e.attributes.target.id).attributes.attrs.label.text
    };
    });

    console.log(this.graph.getLinks());
    console.log(lnks);

    var newFlowItems = {
      nodes: elem,
      connections: lnks
    };

    var json = JSON.stringify(newFlowItems);

    console.log(json);
    
    store.dispatch(saveFlowItems(newFlowItems));
  }


  // This is called every time something is updated in the store.
  stateChanged(state) {
    //  console.log("state", state.flowReducer.flowItems);
    //  console.log("graph", this.graph);
    this.flowItems = state.flowReducer.flowItems;

    if (!this.graph ||
      !this.flowItems ||
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
    shape.resize(300, 40);
    shape.attr({
      body: {
        fill: elem.type == 'event' ? 'green' : 'blue'
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
