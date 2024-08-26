import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostoComponent } from './hosto.component';

describe('HostoComponent', () => {
  let component: HostoComponent;
  let fixture: ComponentFixture<HostoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
