import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card/user-card.component';
import { ClockComponent } from './clock/clock.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  declarations: [UserCardComponent, ClockComponent, PanelComponent],
  imports: [CommonModule]
})
export class PanelModule {}
