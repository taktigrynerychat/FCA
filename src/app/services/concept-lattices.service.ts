import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { ConceptLatticeFromServer, ConceptLatticeMetadata } from '../models/concept-lattices.model';

@Injectable({
  providedIn: 'root',
})
export class ConceptLatticesService {
  constructor(public http: HttpClient) {
  }

  public getConceptLattice({id, full}: ConceptLatticeMetadata): Observable<ConceptLatticeFromServer> {
    const dataUrl: string = `assets/data/concept-${ id }${ full ? '-full' : '' }.json`;
    return this.http.get(dataUrl)
      .pipe(
        delay(1500),
        map(data => data as ConceptLatticeFromServer),
      );
  }
}
