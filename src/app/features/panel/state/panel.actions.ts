import { PanelPayload } from '../interfaces/panel.interface';

export class GetPanels {
  static readonly type = '[Panel] Get Panels';
  constructor(public readonly payload: PanelPayload) {}
}

export class AddPanel {
  static readonly type = '[Panel] Add Panel';
  constructor(public readonly payload: any) {}
}

export class RemovePanel {
  static readonly type = '[Panel] Remove Panel';
  constructor(public readonly payload: any) {}
}
