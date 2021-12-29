import { Component } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ConceptLatticeFromServer } from './models/concept-lattices.model';
import { ConceptLatticesService } from './services/concept-lattices.service';

@Component({
  selector: 'fca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public data$: Observable<ConceptLatticeFromServer> = this.conceptLaticesService
    .getConceptLattice({id: 1}).pipe(delay(1500));

  // .pipe(map(orderNodesByLevel));

  constructor(private readonly conceptLaticesService: ConceptLatticesService) {
  }

  contextChanged(id: number): void {
    this.data$ = this.conceptLaticesService
      .getConceptLattice({id});
  }
}
