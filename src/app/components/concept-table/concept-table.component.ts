import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { cloneDeep } from 'lodash';
import { ConceptLatticeFromServer } from '../../models/concept-lattices.model';
import { orderNodesByLevel } from '../concept-lattice-visualiser/concept-lattice-visualiser.constants';

export interface ConceptTableRow {
  id: number;
  number: number;
  formalConcept: string;
  level: number;
}

@Component({
  selector: 'fca-concept-table',
  templateUrl: './concept-table.component.html',
  styleUrls: ['./concept-table.component.scss'],
})
export class ConceptTableComponent implements OnChanges{
  orderByLevel = orderNodesByLevel;
  public tableData: ConceptTableRow[];

  @Input()
  selectedRowId: number;

  @Input()
  public set data(value: ConceptLatticeFromServer) {
    this._data = value;
  }

  public get data(): ConceptLatticeFromServer {
    return this._data;
  }

  private _data: ConceptLatticeFromServer;

  displayedColumns: string[] = ['number', 'formalConcept', 'level'];

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']?.currentValue){
      this.tableData = cloneDeep(orderNodesByLevel(this.data)).nodes.map((i, idx) => {
        return {
          id: i.id,
          number: idx + 1,
          level: i.level,
          formalConcept: `(${i.objects.length ? '{ ' + i.objects.join(', ') + ' }' : '∅'}, ${i.attributes.length ? '{ ' +  i.attributes.join(', ') + ' }' : '∅'})`
        }
      });
    }
  }

}
