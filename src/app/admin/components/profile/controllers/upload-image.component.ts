import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { DialogUploadImgComponent } from './dialog-upload-img.component';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/auth/components/models';

@Component({
  selector: 'app-upload-image',
  templateUrl: '../views/upload-image.component.html',
  styleUrl: '../styles/upload-image.component.scss'
})
export class UploadImageComponent implements OnInit {
  @Input() img: any = null;
  @Output() imagenSubida = new EventEmitter<User | null>();

  constructor(
    private servicePhotoEditor: NgxPhotoEditorService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) {}
  output?: NgxCroppedEvent | null;

  ngOnInit(): void {
    this.output = {
      base64: this.img? `data:image/png;base64,${this.img}` : ''
    };
  }

  onDragOver($event: any) {
    $event.preventDefault();
  }

  onDrop($event: any) {
    $event.preventDefault();
    $event.target.files = $event.dataTransfer.files;
    this.fileChangeHandler($event);
  }

  fileChangeHandler($event: any) {
    if ($event.target.files[0].size < 5000000) {
      this.servicePhotoEditor.open($event, {
        aspectRatio: 1 / 1,
        autoCropArea: 1,
        resizeToHeight: 500,
        resizeToWidth: 500,
      }).subscribe(data => {
        this.output = data;
        this.imagenSubida.emit({ img: this.output?.base64? this.output?.base64 : ''});
      });
    } else {
      this.toastr.error("El archivo no puede ser mayor a 5 MB", "Error de Peso de Imágen", {
        progressBar: true
      })
    }
  }

  openUploadImgDialog() {
    const dialogRef = this.dialog.open(DialogUploadImgComponent, {
      data: { output: this.output},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.output = result;
      this.imagenSubida.emit({ img: this.output?.base64? this.output?.base64 : ''});
    });
  }
}
