import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit, AfterViewInit {
  @ViewChild('video', { static: false }) video: ElementRef = {} as ElementRef;
  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  canvasElement: any;
  videoElement: any; // = {} as HTMLVideoElement;
  canvasContext: any;
  scanActive: boolean = false;
  scanResult: string = null;
  stream: any = null;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video.nativeElement;
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  async startScan() {
    // Not working on iOS standalone mode!
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });

    this.videoElement.srcObject = this.stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);

    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
    this.scanActive = true;
  }

  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }
  reset() {
    this.scanResult = null;
    this.scanActive = true;
    this.startScan();
  }

  stopScan() {
    this.scanActive = false;
    this.videoElement.srcObject = null;
    this.videoElement = null;
    this.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
}
