import { Component, Input, OnInit } from '@angular/core';
import { ConceptLatticeFromServer, ConceptLatticeNode } from '../../models/concept-lattices.model';
import { conceptLattice, drawGraph, orderNodesByLevel } from './concept-lattice-visualiser.constants';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'fca-concept-lattice-visualiser',
  templateUrl: './concept-lattice-visualiser.component.html',
  styleUrls: ['./concept-lattice-visualiser.component.scss'],
})
export class ConceptLatticeVisualiserComponent implements OnInit {
  dataJson: ConceptLatticeFromServer;
  selectedNode: ConceptLatticeNode;

  @Input()
  public set data(value: ConceptLatticeFromServer) {
    this._data = value;
    this.dataJson = cloneDeep(value);
  }

  public get data(): ConceptLatticeFromServer {
    return this._data;
  }

  private _data: ConceptLatticeFromServer;

  constructor() {
  }

  ngOnInit(): void {
    if (this.data) {
      drawGraph(this.data, this.onNodeSelection.bind(this));
      console.log(conceptLattice);
    }
  }

  onNodeSelection(node: ConceptLatticeNode): void {
    this.selectedNode = cloneDeep(node);
  }

  log(e: MouseEvent): void {
    // @ts-ignore
    if (!e.target['__data__']) {
      this.selectedNode = null;
    }
  }

}
