import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostularPage } from './postular-page';

describe('PostularPage', () => {
  let component: PostularPage;
  let fixture: ComponentFixture<PostularPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostularPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PostularPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
