import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportUserComponent } from './export-user.component';

describe('ExportUserComponent', () => {
  let component: ExportUserComponent;
  let fixture: ComponentFixture<ExportUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
