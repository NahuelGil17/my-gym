export interface Panel {
  name: string;
  lastName: string;
  routine: string[];
}

export interface PanelPayload {
  startTime: string;
  endTime: string;
  day: string;
}
