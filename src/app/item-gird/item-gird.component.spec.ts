import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGirdComponent } from './item-gird.component';

describe('ItemGirdComponent', () => {
  let component: ItemGirdComponent;
  let fixture: ComponentFixture<ItemGirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGirdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
