import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-dialog-upload-img',
  templateUrl: '../views/dialog-upload-img.component.html',
  styleUrl: '../styles/dialog-upload-img.component.scss'
})
export class DialogUploadImgComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogUploadImgComponent>,
    @Inject(MAT_DIALOG_DATA) public output: NgxCroppedEvent,
    private servicePhotoEditor: NgxPhotoEditorService,
    private toastr: ToastrService,
  ) {}

  private trigger: Subject<void> = new Subject();

  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<void> = new Subject();

  captureImage  = '';

  onNoClick(): void {
    this.dialogRef.close();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
      this.webcamImage = webcamImage;
      this.captureImage = webcamImage!.imageAsDataUrl;
      const base64Image = this.captureImage;
      const byteCharacters = atob(base64Image.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const sizeInBytes = byteArray.length;
      this.fileChangeHandler(this.captureImage, sizeInBytes);
  }

  public get triggerObservable(): Observable<void> {
      return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<void> {
      return this.nextWebcam.asObservable();
  }

  fileChangeHandler($event: any, size: number) {
    if (size < 5000000) {
      this.servicePhotoEditor.open($event, {
        aspectRatio: 1 / 1,
        autoCropArea: 1,
        resizeToHeight: 200,
        resizeToWidth: 200,
      }).subscribe(data => {
        this.output = data;
        this.dialogRef.close(this.output);
      }); 
    } else {
      this.toastr.error("La foto no puede ser mayor a 5 MB", "Error de Peso de Foto", {
        progressBar: true
      })
    }
  }
}
