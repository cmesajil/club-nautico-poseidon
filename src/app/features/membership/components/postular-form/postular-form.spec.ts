import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostularForm } from './postular-form';

describe('PostularForm', () => {
  let component: PostularForm;
  let fixture: ComponentFixture<PostularForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostularForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PostularForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
