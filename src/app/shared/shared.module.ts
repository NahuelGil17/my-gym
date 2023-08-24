import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { enUS } from 'date-fns/locale';
import { CustomPaginatorIntlService } from '../core/services/custom-paginator-intl.service';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BadgeComponent } from './components/badge/badge.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FileCardComponent } from './components/file-card/file-card.component';
import { FiltersBarComponent } from './components/filters-bar/filters-bar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { SwitchInputComponent } from './components/switch-input/switch-input.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { WidgetContainerComponent } from './components/widget-container/widget-container.component';
import { BtnDirective } from './directives/btn/btn.directive';
import { DndDirective } from './directives/drag-n-drop-upload-file/drag-n-drop-upload-file.directive';
import { InputDirective } from './directives/input/input.directive';
import { JumpPagesDirective } from './directives/jump-pages.directive';
import { TextareaDirective } from './directives/textarea/textarea.directive';
import { ByteToSizePipe } from './pipes/byte-to-size.pipe';
import { ConcatStringPipe } from './pipes/concat-string.pipe';
import { ConditionalTextPipe } from './pipes/conditional-text.pipe';
import { NoDataPipe } from './pipes/no-data.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';

@NgModule({
  declarations: [
    BtnDirective,
    TextareaDirective,
    InputDirective,
    BadgeComponent,
    NoDataPipe,
    ConditionalTextPipe,
    JumpPagesDirective,
    BaseLayoutComponent,
    WidgetContainerComponent,
    PageHeaderComponent,
    SwitchInputComponent,
    AvatarComponent,
    SnackBarComponent,
    UploadFileComponent,
    DndDirective,
    ByteToSizePipe,
    ErrorMessageComponent,
    ConcatStringPipe,
    PluralizePipe,
    FileCardComponent,
    BreadcrumbsComponent,
    LoaderComponent,
    FiltersBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDatepickerModule,
    DialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    CdkStepperModule,
    MatSelectModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatDateFnsModule,
    OverlayModule,
    MatRadioModule,
    CdkTableModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NoDataPipe,
    ConditionalTextPipe,
    JumpPagesDirective,
    BtnDirective,
    TextareaDirective,
    InputDirective,
    BadgeComponent,
    MatDatepickerModule,
    DialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    BaseLayoutComponent,
    WidgetContainerComponent,
    PageHeaderComponent,
    SwitchInputComponent,
    SnackBarComponent,
    MatSnackBarModule,
    UploadFileComponent,
    DndDirective,
    ByteToSizePipe,
    ErrorMessageComponent,
    ConcatStringPipe,
    MatDateFnsModule,
    OverlayModule,
    MatRadioModule,
    PluralizePipe,
    FileCardComponent,
    BreadcrumbsComponent,
    CdkTableModule,
    LoaderComponent,
    FiltersBarComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntlService },
    {
      provide: MAT_DATE_LOCALE,
      useValue: enUS
    }
  ]
})
export class SharedModule {}
