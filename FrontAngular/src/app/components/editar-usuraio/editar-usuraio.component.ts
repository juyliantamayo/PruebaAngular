import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/models/usuarios';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';

@Component({
  selector: 'app-editar-usuraio',
  templateUrl: './editar-usuraio.component.html',
  styleUrls: ['./editar-usuraio.component.css']
})
export class EditarUsuraioComponent implements OnInit {
  usuario: Usuarios;
  constructor(private UsuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'))
    console.log(this.usuario)
    this.nombresFormControl.setValue(this.usuario.nombres)
    this.apellidosFormControl.setValue(this.usuario.apellidos)
    this.cedulaFormControl.setValue(this.usuario.cedula)
    this.correoFormControl.setValue(this.usuario.correo)
    this.celularFormControl.setValue(this.usuario.telefono)
  }
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
  editarUsuario() {
    if (this.validarUsuario()) {
      try {
        this.UsuariosService.updateUsuarios({
          "nombres": this.nombresFormControl.value,
          "apellidos": this.apellidosFormControl.value,
          "cedula": this.cedulaFormControl.value,
          "correo": this.correoFormControl.value,
          "telefono": this.celularFormControl.value
        },this.usuario.id).toPromise().then((respuesta)=>{
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
