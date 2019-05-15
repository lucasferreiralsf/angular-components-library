import { Directive, HostListener, Input, ElementRef, Renderer2, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ValidationErrors, NgControl } from '@angular/forms';

@Directive({
  selector: '[sbaMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SbaMaskDirective,
      multi: true
    }
  ]
})
export class SbaMaskDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;
  control: NgControl;
  @Input() sbaMask: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private injector: Injector) {}

  ngOnInit() {
    this.control = this.injector.get(NgControl);
    //console.log('ngControl: ', this.control);
  }
  writeValue(value: any): void {
    if (value) {
      this.renderer.setProperty(this.el.nativeElement, 'value', this.aplicarMascara(value));
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.control.control.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    });
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor = $event.target.value.replace(/\D/g, '');

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }

    const pad = this.sbaMask.replace(/\D/g, '').replace(/9/g, '_');
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }

    $event.target.value = this.aplicarMascara(valor);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.sbaMask.length) {
      this.control.control.updateValueAndValidity({
        onlySelf: true,
        emitEvent: false
      });
      return;
    }
    this.control.control.updateValueAndValidity({
      onlySelf: true,
      emitEvent: false
    });
    /* this.onChange("");
    $event.target.value = ""; */
  }

  /**
   * Aplica a máscara a determinado valor.
   *
   * @param string valor
   * @return string
   */
  aplicarMascara(valor: string): string {
    valor = valor.replace(/\D/g, '');
    const pad = this.sbaMask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;

    valor = '';
    for (let i = 0; i < this.sbaMask.length; i++) {
      // tslint:disable-next-line: radix
      if (isNaN(parseInt(this.sbaMask.charAt(i)))) {
        valor += this.sbaMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    return valor;
  }
}
