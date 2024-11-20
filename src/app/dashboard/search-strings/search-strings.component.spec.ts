import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStringsComponent } from './search-strings.component';

describe('SearchStringsComponent', () => {
  let component: SearchStringsComponent;
  let fixture: ComponentFixture<SearchStringsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchStringsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
