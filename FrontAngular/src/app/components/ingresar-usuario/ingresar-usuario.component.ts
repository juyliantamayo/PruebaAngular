import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-ingresar-usuario',
  templateUrl: './ingresar-usuario.component.html',
  styleUrls: ['./ingresar-usuario.component.css']
})
export class IngresarUsuarioComponent implements OnInit {
  usuario: Usuarios = new Usuarios();
  constructor(private UsuariosService: UsuariosService) { }
  correoFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nombresFormControl = new FormControl('', [
    Validators.required,

  ]);
  apellidosFormControl = new FormControl('', [
    Validators.required,

  ]);
  cedulaFormControl = new FormControl('', [
    Validators.required,

  ]);
  celularFormControl = new FormControl('', [
    Validators.required,

  ]);
  ngOnInit(): void {
  }
  guardarUsuario() {
    if (this.validarUsuario()) {
      try {
        this.UsuariosService.postUsuarios({
          "nombres": this.nombresFormControl.value,
          "apellidos": this.apellidosFormControl.value,
          "cedula": this.cedulaFormControl.value,
          "correo": this.correoFormControl.value,
          "telefono": this.celularFormControl.value
        }).toPromise().then((respuesta)=>{
          window.location.reload();
        }).catch((error)=>{
          var errroString:String=error['error']['error']
          alert(errroString) 
        })
      } catch (error) {
       
      }
      
    }
  }
  validarUsuario(): boolean {
    return this.correoFormControl.valid && this.cedulaFormControl.valid && this.apellidosFormControl.valid && this.celularFormControl.valid && this.nombresFormControl.valid
  }
}


