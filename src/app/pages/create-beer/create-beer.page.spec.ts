import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBeerPage } from './create-beer.page';

describe('BeersPage', () => {
  let component: CreateBeerPage;
  let fixture: ComponentFixture<CreateBeerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
