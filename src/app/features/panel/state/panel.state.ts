import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { PanelService } from '../services/panel.service';

import { PanelStateModel } from './panel.model';
import { GetPanels } from './panel.actions';
import { Panel } from '../interfaces/panel.interface';

@State<PanelStateModel>({
  name: 'panel',
  defaults: {
    loading: false,
    panels: []
  }
})
@Injectable({ providedIn: 'root' })
export class PanelState {
  @Selector()
  static panelLoading(state: PanelStateModel): boolean | undefined {
    return state.loading;
  }

  @Selector()
  static panels(state: PanelStateModel): Panel[] {
    return state.panels ?? [];
  }

  constructor(private panelService: PanelService, private utilsService: UtilsService) {}

  @Action(GetPanels, { cancelUncompleted: true })
  getPanels(ctx: StateContext<PanelStateModel>, action: GetPanels): Observable<any> {
    ctx.patchState({ loading: true });

    return this.panelService.getPanels(action.payload).pipe(
      tap((response: any) => {
        const { data } = response;
        let _panels = [];
        if (data.length) {
          _panels = data.map((p: any) => {
            return {
              name: p.attributes.name,
              lastName: p.attributes.lastName,
              routine: p.attributes.routines.data.map((r: any) => {
                return r.attributes.excersises.split(';');
              })
            };
          });
        }
        ctx.patchState({ panels: _panels, loading: false });
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }
}
