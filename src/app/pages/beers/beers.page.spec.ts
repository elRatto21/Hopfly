import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeersPage } from './beers.page';

describe('BeersPage', () => {
  let component: BeersPage;
  let fixture: ComponentFixture<BeersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BeersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
