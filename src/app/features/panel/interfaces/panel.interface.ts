export interface Panel {
  id?: string;
  name: string;
  lastName: string;
  routine: any;
}

export interface PanelPayload {
  startTime: string;
  endTime: string;
  day: string;
}
