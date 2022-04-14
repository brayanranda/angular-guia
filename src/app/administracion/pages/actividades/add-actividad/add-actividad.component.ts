import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActividadesService } from 'src/app/administracion/services/actividades.service';
import { PaquetesService } from 'src/app/administracion/services/paquetes.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-add-actividad',
  templateUrl: './add-actividad.component.html',
  styleUrls: ['./add-actividad.component.css']
})
export class AddActividadComponent implements OnInit {

  public form !     : FormGroup;
  public actividades: any = [];
  public paquetes   : any = [];
  titulo = 'Agregar Actividad';
  boton = 'Agregar Actividad';
  id: string | null;

  constructor(
    private actividadService: ActividadesService,
    private paqueteService: PaquetesService,
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private tokenS: TokenService
    
  ) {
    this.id = aRouter.snapshot.paramMap.get('idActividad');

  }

  ngOnInit(): void {
    this.cargarToken();
    this.esEditarAct();
    this.agregarPaquete();
    if(this.id != null){
      this.form = this.formBuilder.group({
        idActividad: ['', Validators.required],
        nombre: ['', Validators.required],
        descripcion: [''],
        urlImg: [''],
        estado: [''],
        paquete: ['', Validators.required]
      });
    } else{
      this.form = this.formBuilder.group({
        idActividad: [''],
        nombre: ['', Validators.required],
        descripcion: [''],
        urlImg: [''],
        estado: ['', Validators.required],
        paquete: ['', Validators.required]
      });
    }
  }


  public agregarPaquete() {
    this.paqueteService.listarPaquete().subscribe(paquetes => {
      this.paquetes = paquetes;
    })
  }

  public enviarData() {
  if(!this.form.valid){
    this.toastr.error("¡Datos incorrectos!", "Error", {
      positionClass: 'toast-bottom-right'
    });
      return 
  }
    //edita alojamiento
    if (this.id !== null) {
      this.actividadService
        .editarActividad(this.id, this.form.value)
        .subscribe((data) => { 
          this.toastr.success("Actividad editada Con Exito!", "Actividad Editada", {
            positionClass: 'toast-bottom-right'
          })
          this.router.navigate(["/administracion/actividades"]); 
        });

      //agrega alojamiento
    } else {
      this.actividadService.post(this.form.value).subscribe((data) => { 
        this.toastr.success("Actividad Agregada Con Exito!", "Actividad Registrada", {
          positionClass: 'toast-bottom-right'
        })
        this.router.navigate(["/administracion/actividades"]); });
    }
  }

  esEditarAct() {
    if (this.id !== null) {
      this.titulo = 'Editar actividad';
      this.boton = 'Editar actividad';
      this.actividadService.obtenerActividad(this.id).subscribe((data) => {
        this.form.setValue({
          idActividad: data.idActividad,
          nombre: data.nombre,
          descripcion: data.descripcion,
          urlImg: data.urlImg,
          estado: data.estado,
          paquete: data.paquete.idPaq
        });
      });
    }
  }

  public cargarToken() {
    if (this.tokenS.getToken()) {
      if(this.tokenS.getAuthorities().length < 2){
      this.router.navigateByUrl("/inicio");
      }
    } else {
      this.router.navigateByUrl("/inicio");
    }
  }

}
