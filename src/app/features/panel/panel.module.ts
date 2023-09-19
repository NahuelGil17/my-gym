import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '@features/panel/components/user-card/user-card.component';
import { ClockComponent } from '@features/panel/components/clock/clock.component';
import { PanelHomeComponent } from '@features/panel/components/panel-home/panel-home.component';
import { PanelRoutingModule } from '@features/panel/panel-routing.module';
import { AddPanelModalComponent } from './components/add-panel-modal/add-panel-modal.component';

@NgModule({
  declarations: [UserCardComponent, ClockComponent, PanelHomeComponent, AddPanelModalComponent],
  imports: [CommonModule, PanelRoutingModule]
})
export class PanelModule {}
