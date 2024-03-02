import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUploadImgComponent } from '../controllers/dialog-upload-img.component';

describe('DialogUploadImgComponent', () => {
  let component: DialogUploadImgComponent;
  let fixture: ComponentFixture<DialogUploadImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUploadImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUploadImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
