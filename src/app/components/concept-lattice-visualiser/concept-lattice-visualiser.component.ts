import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { take } from 'rxjs';
import { ConceptLatticeFromServer, ConceptLatticeNode } from '../../models/concept-lattices.model';
import { ConceptLatticesService } from '../../services/concept-lattices.service';
import { conceptLattice, drawGraph, GraphModes, orderNodesByLevel } from './concept-lattice-visualiser.constants';
import { cloneDeep } from 'lodash';

declare var d3: any;

@Component({
  selector: 'fca-concept-lattice-visualiser',
  templateUrl: './concept-lattice-visualiser.component.html',
  styleUrls: ['./concept-lattice-visualiser.component.scss'],
})
export class ConceptLatticeVisualiserComponent {
  dataJson: ConceptLatticeFromServer;
  selectedNode: ConceptLatticeNode;
  GraphModes = GraphModes;
  selectedContext: number = 1;

  @Input()
  public set data(value: ConceptLatticeFromServer) {
    this._data = value;
    this.dataJson = cloneDeep(value);

    if (this._data) {
      drawGraph(this._data, this.onNodeSelection.bind(this));
    }
  }

  public get data(): ConceptLatticeFromServer {
    return this._data;
  }

  private _data: ConceptLatticeFromServer;

  constructor(private readonly service: ConceptLatticesService) {
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

  contextChange(id: number): void {
    this.service.getConceptLattice({id}).pipe(take(1)).subscribe(data => {
      this.data = data;
      this.selectedNode = null;
    });
  }

  modeChange(e: MatButtonToggleChange): void {
    switch (e.value) {
      case GraphModes.collapsed:
        conceptLattice.topLabels.style('visibility', 'visible');
        conceptLattice.bottomLabels.style('visibility', 'visible');

        conceptLattice.settings.showTopLabels = true;
        conceptLattice.settings.showBottomLabels = true;

        conceptLattice.bottomLabels.text(function(d) {
          return d.ownedAttributes.join(' | ');
        });

        conceptLattice.topLabels.text(function(d) {
          return d.ownedObjects.join(' | ');
        });
        break;
      case GraphModes.full:
        conceptLattice.topLabels.style('visibility', 'visible');
        conceptLattice.bottomLabels.style('visibility', 'visible');

        conceptLattice.settings.showTopLabels = true;
        conceptLattice.settings.showBottomLabels = true;

        conceptLattice.bottomLabels.text(function(d) {
          return d.attributes.join(', ');
        });

        conceptLattice.topLabels.text(function(d) {
          return d.objects.join(', ');
        });
        break;
      case GraphModes.hidden:
        conceptLattice.topLabels.style('visibility', 'hidden');
        conceptLattice.bottomLabels.style('visibility', 'hidden');

        conceptLattice.settings.showTopLabels = false;
        conceptLattice.settings.showBottomLabels = false;
        break;
    }

  }

}
