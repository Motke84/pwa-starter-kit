/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import './graph.js';

import flowReducer from '../reducers/flowReducer';
store.addReducers({
  flowReducer
});

class MyView1 extends  connect(store)(PageViewElement) {

  firstUpdated(_changedProperties) {

    
  }

  render() {

    
    return html`
      ${SharedStyles}
      <section>
        <flow-graph></flow-graph>
      </section>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
