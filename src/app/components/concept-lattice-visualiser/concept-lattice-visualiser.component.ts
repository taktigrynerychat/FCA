import { Component, Input, OnInit } from '@angular/core';
import { ConceptLatticeFromServer } from '../../models/concept-lattices.model';

@Component({
  selector: 'fca-concept-lattice-visualiser',
  templateUrl: './concept-lattice-visualiser.component.html',
  styleUrls: ['./concept-lattice-visualiser.component.scss'],
})
export class ConceptLatticeVisualiserComponent implements OnInit {

  @Input()
  data: ConceptLatticeFromServer;

  constructor() {
  }

  ngOnInit(): void {
  }

}
