import { PanelPayload } from '../interfaces/panel.interface';

export class GetPanels {
  static readonly type = '[Panel] Get Panels';
  constructor(public readonly payload: PanelPayload) {}
}
