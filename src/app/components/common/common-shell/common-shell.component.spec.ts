import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonShellComponent } from './common-shell.component';

describe('CommonShellComponent', () => {
  let component: CommonShellComponent;
  let fixture: ComponentFixture<CommonShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
