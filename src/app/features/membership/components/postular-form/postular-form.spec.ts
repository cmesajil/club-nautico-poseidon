import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostularForm } from './postular-form';

describe('PostularForm', () => {
  let component: PostularForm;
  let fixture: ComponentFixture<PostularForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Al ser un componente Standalone, se importa en 'imports', no en 'declarations'
      imports: [PostularForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PostularForm);
    component = fixture.componentInstance;

    // Agregamos detectChanges para que Angular procese el componente antes de los tests
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ========================================================
  // NUEVA PRUEBA: Validación de datos correctos
  // ========================================================
  it('debe ser válido con datos correctos', () => {
    component.form.patchValue({
      tipoDocumento: 'DNI',
      numeroDocumento: '45678912', // 8 números exactos como pide tu regex
      nombres: 'CARLOS ALBERTO',
      apellidos: 'MENDOZA ROJAS',
      correo: 'carlos.mendoza@gmail.com',
      telefono: '987654321', // 9 números exactos si se provee
      clasificacionExterna: 'PAGADOR',
    });

    // Evaluamos si el formulario pasa todas tus validaciones y Regex
    expect(component.form.valid).toBe(true);
  });

  it('debe ser inválido cuando el nombre contiene solo consonantes', () => {
    const nombres = component.form.get('nombres');

    nombres?.setValue('BCDFGHJKLMNPQRST');

    expect(nombres?.valid).toBe(false);
  });

  it('debe ser inválido cuando el apellido contiene solo consonantes', () => {
    const apellidos = component.form.get('apellidos');

    apellidos?.setValue('BCDFGHJKLMNPQRST');

    expect(apellidos?.valid).toBe(false);
  });

  it('debe ser inválido cuando el nombre supera la longitud máxima', () => {
    const nombres = component.form.get('nombres');

    nombres?.setValue('A'.repeat(51));

    expect(nombres?.hasError('maxlength')).toBe(true);
  });

  it('debe ser inválido cuando el apellido supera la longitud máxima', () => {
    const apellidos = component.form.get('apellidos');

    apellidos?.setValue('A'.repeat(51));

    expect(apellidos?.hasError('maxlength')).toBe(true);
  });
});
