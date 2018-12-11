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
import { getAllFlowItems, saveFlowItems } from '../actions/flowActions';

// These are the elements needed by this element.
import { addToCartIcon } from './my-icons.js';

// These are the shared styles needed by this element.
import { ButtonSharedStyles, HeaderRed } from './button-shared-styles.js';

import { SharedStyleSuAll } from './styles/shared-styles-su-all';

import './header-button';

import './header-toggle-button';

class Graph extends connect(store)(LitElement) {


  constructor() {
    super();

  }


  firstUpdated() {

    this.isEditMode = false;
    const graph = new joint.dia.Graph;
    this.graph = graph;

    const paper = new joint.dia.Paper({
      el: this.shadowRoot.getElementById('myholder'),
      model: graph,
      width: 5000,
      height: 1000,
      gridSize: 50,
      drawGrid: {
        name: 'mesh',
        args:
          { color: 'white', thickness: 1 } // settings for the primary mesh
      }
    });


    this.paper = paper;

    this.paper.setInteractivity({ elementMove: false });
    paper.drawGrid(false);


    paper.on('cell:pointerdown',
      (cellView, evt, x, y) => {

        var shape = this.graph.getCell(cellView.model.id);
      //  shape.attr('body/fill', '#BE2828');
        console.log(shape);
      }
    );

    store.dispatch(getAllFlowItems());
  }



  render() {


    return html`
    ${SharedStyleSuAll}
    
    
    <div class="ui stackable grid">
    
      <div class="row">
        <div class="eight wide column">
    
          <div class="ui stackable segment ">
    
            <header-button name="Refresh" color='blue' icon='refresh' ?disabled="${this.isEditMode || this.isRefreshLoading}"
              ?loading="${this.isRefreshLoading}" @onClick="${this._onRefresh}">
            </header-button>
    
            <header-button name="Save" color='blue' icon='save' ?disabled="${!this.isEditMode || this.isRefreshLoading}"
              ?loading="${this.isSaveLoading}" @onClick="${this._onSave}">
            </header-button>
    
            <header-toggle-button on_name='Edit Mode' off_name='View Mode' color='blue' ?disabled="${this.isSaveLoading || this.isRefreshLoading}"
              icon='arrows alternate' @onChange="${this._onChange}" ?on="${this.isEditMode}">
            </header-toggle-button>
    
          </div>
        </div>
    
        <div class="row" style="overflow: overlay;">
    
          <div class="sixteen wide column">
    
            <div class="ui stackable segment ${this.activateLoader(this.isGraphLoading())}">
              <div id="myholder"></div>
            </div>
    
          </div>
    
        </div>
    
      </div>
    `;
  }



  activateLoader(isLoading) {

    if (isLoading)
      return 'loading disabled';
    else
      return '';
  }

  activateIconLoader(isLoading, originalStyle) {

    if (isLoading)
      return 'inverted notched circle loading icon';
    else
      return originalStyle;
  }



  static get properties() {
    return {
      flowItems: { type: Object },
      graph: { type: Object },
      paper: { type: Object },
      isRefreshLoading: { type: Boolean },
      isSaveLoading: { type: Boolean },
      isEditMode: { type: Boolean }
    }
  }


  _onRefresh() {
    this.graph.clear();
    this.flowItems = undefined;
    this.isRefreshLoading = true;
    store.dispatch(getAllFlowItems());
  }

  _onChange(e) {
    console.log(e);

    this.isEditMode = e.detail.checked;

    if (this.isEditMode) {
      this.paper.drawGrid({ color: 'gray' });
      this.paper.setInteractivity({ elementMove: true })
    }
    else {
      this.paper.drawGrid({ color: 'white' });
      this.paper.setInteractivity({ elementMove: false });
    }


    //  this.paper.options.interactive.labelMove = this.isEditMode;
  }

  _onSave() {
    this.isSaveLoading = true;
    var elem = this.graph.getElements().map((e) => {
      return {
        title: e.attributes.attrs.label.text,
        type: e.attributes.type == 'standard.Rectangle' ? 'action' : 'event',
        posX: e.attributes.position.x,
        posY: e.attributes.position.y,
        id: +e.attributes.id
      };
    });


    var lnks = this.graph.getLinks().map((e) => {
      return {
        source: +e.attributes.source.id,
        destination: +e.attributes.target.id
      };
    });


    var newFlowItems = {
      num: 3,
      nodes: elem,
      connections: lnks
    };

    //var json = JSON.stringify(newFlowItems);

    //console.log(json);

    this.graph.clear();
    this.flowItems = undefined;

    store.dispatch(saveFlowItems(newFlowItems));
  }


  isGraphLoading() {
    return !this.graph ||
      !this.flowItems ||
      !this.flowItems.nodes ||
      !this.flowItems.connections;
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {

    this.flowItems = state.flowReducer.flowItems;
    this.isRefreshLoading = state.flowReducer.isRefreshLoading;
    this.isSaveLoading = state.flowReducer.isSaveLoading;

    if (this.isGraphLoading())
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
      new joint.shapes.standard.Path() :
      new joint.shapes.standard.Rectangle()


    const size = elem.title.length;


    shape.tagName =  'rect' 

    shape.attributes.id = elem.id.toString();
    shape.position(+elem.posX, +elem.posY);

    shape.resize(280, 40);
    shape.attr({
      body: {
        fill: this.getColor(elem.status), //elem.type == 'event' ? '#218545' : '#2185d0',
        refD: 'M 150 150 Q 50 150 50 250 Q 50 350 150 350 L 300 350 Q 375 350 450 350 Q 550 350 550 250 Q 550 150 450 150 L 300 150 Z'
      },
      label: {
        text: elem.title,
        fill: 'white'
      }
    });

    shape.exception = elem.exception;

    return shape;
  }
/*
  New = 1,
  InProgess = 2,
  Success = 3,
  Failed = 4,
  Waiting/Cancel = 5,
  SuccessWithErrors = 6,*/


  getColor(status){

      console.log(status);
      
      switch(status)
      {
        case 0:          
          return '#2185d0'; //blue
        case 1:          
          return '#247172'; //turquoise
        case 2:          
          return '#27A579'; //light green
        case 3:          
          return '#218545'; //green
        case 4:          
          return '#BE2828'; //red
        case 5:          
          return '#44001A'; //dark scarlet
        case 6:          
          return '#E05323'; //orange
      }

  }

  createLink(con, elems) {

    const link = new joint.shapes.standard.Link()
    link.smooth = true;
    const rect1 = elems.find(e => e.attributes.id == con.source.toString());
    const rect2 = elems.find(e => e.attributes.id == con.destination.toString());

    link.source(rect1);
    link.target(rect2);

    return link;
  }

}



window.customElements.define('flow-graph', Graph);
