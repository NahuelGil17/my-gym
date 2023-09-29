import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from '@core/services/utils.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { PanelService } from '../services/panel.service';

import { PanelStateModel } from './panel.model';
import { AddPanel, GetPanels, RemovePanel } from './panel.actions';
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

    const currentDay = new Date();
    const dayNumber = currentDay.getDay();
    const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const day = weekDays[dayNumber];

    return this.panelService.getPanels(action.payload).pipe(
      tap((response: any) => {
        const { data } = response;
        let _panels = [];
        if (data.length) {
          _panels = data.map((p: any, i: number) => {
            const routine = p.attributes.routines.data.filter(function (r: any) {
              return r.attributes.day == day;
            });

            return {
              id: i.toString(),
              name: p.attributes.name,
              lastName: p.attributes.lastName,
              routine: routine[0].attributes.exercises
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

  @Action(AddPanel, { cancelUncompleted: true })
  addPanel(ctx: StateContext<PanelStateModel>, action: AddPanel): void {
    const state = ctx.getState();
    if (state.panels && Array.isArray(state.panels)) {
      action.payload.id = state.panels.length;
      ctx.patchState({
        panels: [...state.panels, action.payload]
      });
    }
  }

  @Action(RemovePanel, { cancelUncompleted: true })
  removePanel(ctx: StateContext<PanelStateModel>, action: RemovePanel): void {
    const state = ctx.getState();
    if (state.panels && Array.isArray(state.panels)) {
      ctx.patchState({
        panels: state.panels.filter((panel) => panel.id != action.payload)
      });
    }
  }
}
